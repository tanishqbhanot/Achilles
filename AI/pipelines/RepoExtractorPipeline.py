import ast
import requests
from pipelines.GraphRetrievalPipeline import Retriever
from Models.LLMs import llm
from pydantic import BaseModel, Field
from langchain_core.prompts import PromptTemplate
from random import choice

class RelevantPaths(BaseModel):
    paths: list[str] = Field(
        description="Relevant repository paths"
    )

prompt = PromptTemplate.from_template("""
You are selecting relevant code paths from a GitHub repository.

User's skills:
{skills}


Available GitHub AST paths:
{paths}

Task:
Select only the paths relevant to the user's skills.

Rules:
- Only select paths from the provided list.
- Do not invent paths.
- Return an empty list if no paths are relevant.
- Return ONLY a valid JSON object.
- The JSON must follow this exact format:

{{
    "paths": ["path1.py", "path2.py"]
}}
""")


def extract_definitions(source_code, max_defs=5):
    """
    Extract top-level function/class definitions (with docstrings) from a
    Python source file instead of sending the whole file. Falls back to
    raw-text truncation if the file isn't valid/parseable Python.
    """
    try:
        tree = ast.parse(source_code)
    except (SyntaxError, ValueError):
        return None  # signal caller to use plain truncation instead

    chunks = []
    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
            chunk = ast.get_source_segment(source_code, node)
            if chunk:
                chunks.append(chunk)
        if len(chunks) >= max_defs:
            break

    if not chunks:
        return None

    return "\n\n".join(chunks)


def truncate_text(source_code, max_chars=4000):
    return source_code[:max_chars] + "\n\n# ... [truncated, file too large] ..."


class RepoExtractor:
    def __init__(self, url, user_id="person_123"):
        self.repo_url = url
        self.paths = []
        self.repo_name = None
        self.user_id = user_id
        self.initial_processing()

        self.structured_llm = llm.with_structured_output(
            RelevantPaths,
            method="json_mode"
        )


    def initial_processing(self):

        parts = self.repo_url.rstrip("/").split("/")
        owner = parts[-2]
        repo = parts[-1]

        self.owner = owner
        self.repo_name = repo

        readme_url = f"https://api.github.com/repos/{owner}/{repo}/readme"
        readme_response = requests.get(readme_url)
        readme_response.raise_for_status()
        readme_data = readme_response.json()

        self.readme = requests.get(readme_data["download_url"]).text ## here is readme file

        repo_meta_url = f"https://api.github.com/repos/{owner}/{repo}"
        repo_meta_response = requests.get(repo_meta_url)
        repo_meta_response.raise_for_status()
        default_branch = repo_meta_response.json()["default_branch"]

        self.default_branch = default_branch

        tree_url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{default_branch}?recursive=1"
        tree_response = requests.get(tree_url)
        tree_response.raise_for_status()
        tree_data = tree_response.json()

        self.tree = tree_data['tree']

        for item in self.tree:
            if item['type'] == 'blob':
                self.paths.append(item['path'])


        r = Retriever()
        skills = r.retrieve(self.user_id, query=f"Which skills did the user implement in the project: {self.repo_name}")

        self.skills = [x['skill'] for x in skills]


    def extract_paths(self):
        chain = prompt | self.structured_llm

        relevant_paths = chain.invoke({
            "skills": self.skills,
            "paths": self.paths
        })

        self.relevant_paths = relevant_paths.paths

    def choose_paths(self):

        if(len(self.relevant_paths)>3):
            p1 = choice(self.relevant_paths)
            self.relevant_paths.remove(p1)

            p2 = choice(self.relevant_paths)
            self.relevant_paths.remove(p2)

            p3 = choice(self.relevant_paths)
            self.relevant_paths.remove(p3)

            self.new_paths = [p1,p2,p3]

        else:
            self.new_paths = self.relevant_paths

    def fetch_file_contents(self, max_chars_per_file=4000):
        """
        Fetch raw file contents for the finally chosen paths.
        If a file is too large:
          - for .py files: extract just the function/class definitions (AST-based)
          - if that still isn't enough / not python: fall back to plain truncation
        """

        self.file_contents = {}

        for path in self.new_paths:
            raw_url = f"https://raw.githubusercontent.com/{self.owner}/{self.repo_name}/{self.default_branch}/{path}"
            response = requests.get(raw_url)

            if response.status_code != 200:
                continue

            content = response.text

            if len(content) > max_chars_per_file:
                if path.endswith(".py"):
                    reduced = extract_definitions(content)
                    if reduced and len(reduced) <= max_chars_per_file * 2:
                        content = reduced
                    elif reduced:
                        content = truncate_text(reduced, max_chars_per_file)
                    else:
                        content = truncate_text(content, max_chars_per_file)
                else:
                    content = truncate_text(content, max_chars_per_file)

            self.file_contents[path] = content

        return self.file_contents


class InterviewQuestion(BaseModel):
    question: str = Field(
        description="A subjective interview question asking the candidate to explain, in plain language or pseudocode, how they would implement a specific piece of functionality from their project — not to recall or write actual code"
    )
    source_path: str = Field(
        description="The file path this question is based on, chosen from the provided paths"
    )


question_prompt = PromptTemplate.from_template("""
You are an interviewer asking a candidate about their own project.

User's skills:
{skills}

Below are code files from the candidate's repository, each labeled with its path:

{code_context}

Task:
Look at ONE file/snippet above that best reflects the candidate's use of their listed skills.
Identify what functionality/logic it implements, then ask the candidate to explain
HOW they would implement that functionality — in plain language or pseudocode,
as if explaining their approach to a teammate on a whiteboard.

Rules:
- Do NOT quote, reference, or ask about the actual code/syntax directly.
- Do NOT ask the candidate to write real code.
- Frame it as "how would you approach/design/implement X" or "walk me through the logic of X",
  not "explain what this code does" or "why did you write this."
- The question should be answerable in plain language or pseudocode only — no real code required.
- Focus on the underlying concept/technique/flow, not implementation-specific details like variable names.
- Base the question only on the functionality shown in the provided code, do not assume anything not shown.
- source_path must exactly match one of the provided file paths.
- Return ONLY a valid JSON object in this exact format:

{{
    "question": "...",
    "source_path": "..."
}}
""")

class QuestionGenerator:
    def __init__(self, skills, file_contents):
        self.skills = skills
        self.file_contents = file_contents

        self.structured_llm = llm.with_structured_output(
            InterviewQuestion,
            method="json_mode"
        )

    def generate(self):
        code_context = "\n\n".join(
            f"### {path}\n{content}" for path, content in self.file_contents.items()
        )

        chain = question_prompt | self.structured_llm

        result = chain.invoke({
            "skills": self.skills,
            "code_context": code_context
        })

        self.question = result.question
        self.source_path = result.source_path
        self.source_code = self.file_contents.get(self.source_path, "")

        # stored for future reference when evaluating the candidate's answer
        self.record = {
            "question": self.question,
            "source_path": self.source_path,
            "source_code": self.source_code
        }

        return self.record






def DigRepo(user_id, repos:list)->dict:
    # repos = ["https://github.com/Tejasisnothere/Artemis", "https://github.com/Tejasisnothere/NeuralNote"]
    questions = []
    source_path = []
    for REPO_URL in repos:# <-- paste your repo here
        USER_ID = user_id                                       # <-- your knowledge-graph user id, if different
        print("Step 1: Extracting repo info...")
        extractor = RepoExtractor(url=REPO_URL, user_id=USER_ID)
        print("Repo:", extractor.repo_name)
        print("Skills found:", extractor.skills)
        print("Total files in repo:", len(extractor.paths))

        print("\nStep 2: Selecting relevant paths via LLM...")
        extractor.extract_paths()
        print("Relevant paths:", extractor.relevant_paths)

        print("\nStep 3: Narrowing down to final paths...")
        extractor.choose_paths()
        print("Chosen paths:", extractor.new_paths)

        print("\nStep 4: Fetching file contents (with chunking/truncation)...")
        file_contents = extractor.fetch_file_contents(max_chars_per_file=3000)
        for path, content in file_contents.items():
            print(f"  - {path}: {len(content)} chars")

        print("\nStep 5: Generating interview question...")
        qgen = QuestionGenerator(skills=extractor.skills, file_contents=file_contents)
        record = qgen.generate()

        print("\n================ GENERATED QUESTION ================")
        print("Question:", record["question"])
        print("Based on file:", record["source_path"])
        print("======================================================")

        questions.append(record['question'])
        source_path.append(record['source_path'])

    return {
        'questions':questions,
        'source_paths':source_path
    }

# DigRepo("6aab165845b99ec9c8e77bbf",["https://github.com/Tejasisnothere/Artemis", "https://github.com/Tejasisnothere/NeuralNote"])

# class EvaluationResult(BaseModel):
#     is_valid: bool = Field(
#         description="Whether the candidate's answer is technically correct and consistent with the code"
#     )
#     missing_concepts: list[str] = Field(
#         description="Important concepts from the code the candidate did not mention"
#     )
#     unsupported_claims: list[str] = Field(
#         description="Claims made by the candidate that are not backed by the actual code"
#     )
#     feedback: str = Field(
#         description="Short feedback explaining the verdict"
#     )


# evaluation_prompt = PromptTemplate.from_template("""
# You are evaluating a candidate's spoken/written answer to an interview question about their own code.

# Question asked:
# {question}

# Actual source code the question was based on:
# {source_code}

# Candidate's answer:
# {answer}

# Task:
# Compare the candidate's answer against the actual implementation shown above.

# Rules:
# - Check whether the explanation matches what the code actually does.
# - List any important concept present in the code that the candidate failed to mention.
# - List any claim the candidate made that is not supported by the code (possible hallucination).
# - Give a short, clear feedback summary.
# - Return ONLY a valid JSON object in this exact format:

# {{
#     "is_valid": true,
#     "missing_concepts": ["..."],
#     "unsupported_claims": ["..."],
#     "feedback": "..."
# }}
# """)


# class AnswerEvaluator:
#     def __init__(self, record):
#         self.question = record["question"]
#         self.source_code = record["source_code"]

#         self.structured_llm = llm.with_structured_output(
#             EvaluationResult,
#             method="json_mode"
#         )

#     def evaluate(self, answer):
#         chain = evaluation_prompt | self.structured_llm

#         result = chain.invoke({
#             "question": self.question,
#             "source_code": self.source_code,
#             "answer": answer
#         })

#         self.result = result
#         return result