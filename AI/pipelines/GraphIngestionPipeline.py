from Models.GraphModels import *
from db.GraphDB import graph
from langchain_neo4j import Neo4jGraph
from Models.LLMs import llm
from pipelines.DocumentLoaderPipeline import ExtractDocuments
import os


class GraphPipeline:
    def __init__(self, file_name="GS.pdf", user_id="person_123"):
        self.extractor = ExtractDocuments(file_name=file_name)
        self.result = self.extractor.extract_sections()
        self.llm = llm
        self.user_id = user_id


    def route_section(self, name: str):
        key = name.strip().lower()
        for k, schema in SECTION_SCHEMA_MAP.items():
            if k in key:
                return schema
        return OtherExtractor


    def extract_all_sections(self, result, llm) -> dict:
        extracted = {}
        for section_name, section_text in result.sections.items():
            schema = route_section(section_name)

            if schema is OtherExtractor:
                extracted.setdefault("Other", OtherExtractor(entries=[])).entries.append(
                    OtherEntry(heading=section_name, content=section_text)
                )
                continue

            section_llm = llm.with_structured_output(schema, method="json_schema")
            parsed = section_llm.invoke(
                f"Extract structured entries from this resume section:\n\n{section_text}"
            )
            canonical_key = CANONICAL_KEY[schema]


            if canonical_key in extracted:
                if hasattr(parsed, "entries"):
                    extracted[canonical_key].entries.extend(parsed.entries)
                elif hasattr(parsed, "skills"):
                    extracted[canonical_key].skills.extend(parsed.skills)
            else:
                extracted[canonical_key] = parsed

        return extracted


    def write_person_graph(self, graph: Neo4jGraph, person_id: str, extracted: dict):
        graph.query("MERGE (p:Person {id: $person_id})", params={"person_id": person_id})

        for entry in extracted.get("Experience", ExperienceExtractor(entries=[])).entries:
            graph.query("""
                MATCH (p:Person {id: $person_id})
                MERGE (c:Company {name: $company})
                MERGE (r:Role {title: $role, company: $company})
                MERGE (p)-[rel:WORKED_AT]->(c)
                SET rel.role = $role, rel.start_date = $start, rel.end_date = $end
                MERGE (p)-[:HELD_ROLE]->(r)
                WITH p, r
                UNWIND $skills AS skill_name
                MERGE (s:Skill {name: toLower(skill_name)})
                MERGE (r)-[:USED_SKILL]->(s)
            """, params={
                "person_id": person_id, "company": entry.company, "role": entry.role,
                "start": entry.start_date, "end": entry.end_date, "skills": entry.skills_used
            })

        for entry in extracted.get("Education", EducationExtractor(entries=[])).entries:
            graph.query("""
                MATCH (p:Person {id: $person_id})
                MERGE (i:Institution {name: $institution})
                MERGE (d:Degree {name: $degree})
                SET d.field = $field
                MERGE (p)-[rel:STUDIED_AT]->(i)
                SET rel.start_date = $start, rel.end_date = $end
                MERGE (p)-[:EARNED]->(d)
            """, params={
                "person_id": person_id, "institution": entry.institution, "degree": entry.degree,
                "field": entry.field_of_study, "start": entry.start_date, "end": entry.end_date
            })

        for entry in extracted.get("Projects", ProjectExtractor(entries=[])).entries:
            graph.query("""
                MATCH (p:Person {id: $person_id})
                MERGE (proj:Project {name: $name})
                SET proj.description = $description
                MERGE (p)-[:WORKED_ON]->(proj)
                WITH proj
                UNWIND $skills AS skill_name
                MERGE (s:Skill {name: toLower(skill_name)})
                MERGE (proj)-[:USED_SKILL]->(s)
            """, params={
                "person_id": person_id, "name": entry.name,
                "description": entry.description, "skills": entry.skills_used
            })

        for skill_name in extracted.get("Skills", SkillsExtractor(skills=[])).skills:
            graph.query("""
                MATCH (p:Person {id: $person_id})
                MERGE (s:Skill {name: toLower($skill_name)})
                MERGE (p)-[:HAS_SKILL]->(s)
            """, params={"person_id": person_id, "skill_name": skill_name})

        for entry in extracted.get("Achievements", AchievementExtractor(entries=[])).entries:
            graph.query("""
                MATCH (p:Person {id: $person_id})
                MERGE (a:Achievement {title: $title})
                SET a.description = $description,
                    a.date = $date,
                    a.issuer = $issuer
                MERGE (p)-[:ACHIEVED]->(a)
            """, params={
                "person_id": person_id, "title": entry.title, "description": entry.description,
                "date": entry.date, "issuer": entry.issuer
            })

        for entry in extracted.get("Other", OtherExtractor(entries=[])).entries:
            graph.query("""
                MATCH (p:Person {id: $person_id})
                MERGE (o:OtherSection {heading: $heading, person_id: $person_id})
                SET o.content = $content
                MERGE (p)-[:HAS_SECTION]->(o)
            """, params={
                "person_id": person_id, "heading": entry.heading, "content": entry.content
            })


    def execute(self):

        extracted = self.extract_all_sections(self.result, self.llm)
        print(extracted.keys())   # sanity check before writing

        self.write_person_graph(graph, self.user_id, extracted)

        print(graph.query("MATCH (n) RETURN labels(n) AS labels, count(*) AS c"))

