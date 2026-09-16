from typing import Dict
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate
from Models.LLMs import llm
from langchain_community.document_loaders import PyMuPDFLoader
import os
from pathlib import Path


cwd = Path(os.getcwd())
DOCS = Path(cwd.parent, "AI", "docs")

class Extractor(BaseModel):
    sections: Dict[str, str] = Field(
        description="Each key is a resume section name and each value is the complete original text belonging to that section."
    )

class ExtractDocuments:
    def __init__(self, file_name="GS"):
        self.file_name = file_name

        self.loader = PyMuPDFLoader(file_path=Path(DOCS, self.file_name))
        self.text = self.loader.load()
        self.resume = self.text[0].page_content

    def extract_sections(self):

        new_llm = llm.with_structured_output(
            Extractor,
            method="json_mode",
        )

        prompt = ChatPromptTemplate.from_template("""
        Read the resume and divide it into its different sections.

        Return ONLY a valid JSON object in this exact format:

        {{
            "sections": {{
                "Section Name": "Complete original text of that section"
            }}
        }}

        Rules:
        - Use the section's actual name as the key.
        - Put the COMPLETE ORIGINAL TEXT belonging to that section as the value.
        - Do NOT summarize.
        - Do NOT paraphrase.
        - Do NOT extract individual entities.
        - Preserve every project, experience entry, certification, education entry,
        bullet point, technology, date, and other information belonging to that section.
        - Determine where a section starts and ends from the resume structure.
        - Do not move content between sections.
        - If there are multiple projects, include ALL projects in the "Projects" value.
        - Do not include markdown fences such as ```json.
        - Return valid JSON only.

        Resume:
        {resume}
        """)

        chain = prompt | new_llm

        result = chain.invoke({
            "resume": self.resume
        })

        return result