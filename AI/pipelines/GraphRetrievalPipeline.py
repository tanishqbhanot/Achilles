from typing import List, Optional
from pydantic import BaseModel, Field
from rapidfuzz import process, fuzz

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from db.GraphDB import graph
from Models.LLMs import llm


schema = """
Node properties:
Person {id: STRING}
Company {name: STRING}
Role {company: STRING, title: STRING}
Institution {name: STRING}
Degree {name: STRING, field: STRING}
Skill {name: STRING}
Achievement {description: STRING, title: STRING, issuer: STRING}
Project {name: STRING, description: STRING}
OtherSection {heading: STRING, person_id: STRING, content: STRING}

Relationship properties:
STUDIED_AT {start_date: STRING, end_date: STRING}
WORKED_AT {role: STRING}

Relationships:
(:Person)-[:STUDIED_AT]->(:Institution)
(:Person)-[:EARNED]->(:Degree)
(:Person)-[:WORKED_ON]->(:Project)
(:Person)-[:HAS_SECTION]->(:OtherSection)
(:Person)-[:ACHIEVED]->(:Achievement)
(:Person)-[:HAS_SKILL]->(:Skill)
(:Person)-[:WORKED_AT]->(:Company)
(:Person)-[:HELD_ROLE]->(:Role)
(:Role)-[:USED_SKILL]->(:Skill)
(:Project)-[:USED_SKILL]->(:Skill)
"""



SEARCHABLE_LABELS = {
    "Project": "name",
    "Skill": "name",
    "Company": "name",
    "Institution": "name",
    "Degree": "name",
    "Achievement": "title",
    "Role": "title",
}



class EntityMention(BaseModel):
    text: str = Field(description="The exact phrase from the question referring to a specific named entity, e.g. a project, skill, company, or institution name.")
    label: str = Field(description=f"The most likely node label this refers to. Must be one of: {list(SEARCHABLE_LABELS.keys())}")

class ExtractedMentions(BaseModel):
    mentions: List[EntityMention] = Field(default_factory=list)


mention_prompt = ChatPromptTemplate.from_template("""
Identify any specific named entities in this question that refer to a project,
skill, company, institution, degree, achievement, or role name.

Do NOT extract generic words like "skills", "projects", "experience" -- only
extract specific proper nouns / named things the user is asking about
(e.g. a specific project name, a specific technology, a specific company name).

If there are no specific named entities, return an empty list.

Question:
{question}
""")

mention_llm = llm.with_structured_output(ExtractedMentions, method="json_schema")
mention_chain = mention_prompt | mention_llm


# ---------------------------------------------------------------------------
# Step 2: fuzzy-resolve each mention against the live graph, scoped to person
# ---------------------------------------------------------------------------
def get_candidate_names(person_id: str, label: str, name_prop: str) -> List[str]:
    """Pull all values of name_prop for nodes of this label connected to this person."""
    result = graph.query(f"""
        MATCH (p:Person {{id: $person_id}})-[*1..2]-(n:{label})
        RETURN DISTINCT n.{name_prop} AS name
    """, params={"person_id": person_id})
    return [r["name"] for r in result if r["name"]]


def resolve_mention(mention: str, candidates: List[str], threshold: int = 70) -> Optional[str]:
    if not candidates:
        return None
    match = process.extractOne(mention, candidates, scorer=fuzz.WRatio)
    if match is None:
        return None
    matched_value, score, _ = match
    return matched_value if score >= threshold else None


def resolve_all_mentions(person_id: str, question: str) -> dict:
    """Returns {original_mention_text: resolved_exact_graph_value}."""
    extracted = mention_chain.invoke({"question": question})
    resolved = {}

    for m in extracted.mentions:
        label = m.label if m.label in SEARCHABLE_LABELS else None
        if label is None:
            continue
        name_prop = SEARCHABLE_LABELS[label]
        candidates = get_candidate_names(person_id, label, name_prop)
        match = resolve_mention(m.text, candidates)
        if match:
            resolved[m.text] = {"label": label, "resolved_value": match}

    return resolved


cypher_prompt = ChatPromptTemplate.from_template("""
You are a Neo4j Cypher expert.

Generate a READ-ONLY Cypher query to answer the user's question.

Graph Schema:
{schema}

Person ID:
{person_id}

Resolved Entities (use these EXACT values for any property match -- these are
the confirmed exact strings as stored in the database, resolved via fuzzy
matching from the user's original phrasing):
{resolved_entities}

Question:
{question}

Rules:
- Use only labels and relationships in the schema.
- Always filter by person_id through the Person node, using $person_id as a parameter.
- If a Resolved Entity is provided for something mentioned in the question,
  use its exact resolved_value as a literal string match (=) on the
  appropriate property -- do NOT use the user's original phrasing, and do NOT
  use CONTAINS if an exact resolved value is available.
- If NO resolved entity is available for a named thing the question refers to,
  fall back to case-insensitive partial matching:
    WHERE toLower(node.property) CONTAINS toLower("value")
- Do not use CREATE, MERGE, DELETE, SET, or DROP.
- Return relevant properties and relationships.
- Return only the Cypher query, no markdown fences, no explanation.

Cypher:
""")

cypher_llm_chain = cypher_prompt | llm | StrOutputParser()


class Retriever:
    def __init__(self):
        self.cypher_chain = cypher_llm_chain

    def retrieve(self, id: str = "person_123", query: str = "What skillset the person has?"):
        resolved_entities = resolve_all_mentions(id, query)
        print("Resolved entities:", resolved_entities)

        cypher = self.cypher_chain.invoke({
            "schema": schema,
            "person_id": id,
            "resolved_entities": resolved_entities if resolved_entities else "None",
            "question": query
        })

        cypher = cypher.replace("```cypher", "").replace("```", "").strip()
        print("Clean Cypher:")
        print(cypher)

        results = graph.query(cypher, params={"person_id": id})
        return results


r = Retriever()
result = r.retrieve(id="person_234", query="What skills the user used in project desIGNnest?")
print(result)