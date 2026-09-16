import os
from typing import List, Optional
from dotenv import load_dotenv
from pydantic import BaseModel, Field


load_dotenv()


class ExperienceEntry(BaseModel):
    company: str
    role: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    skills_used: List[str] = Field(default_factory=list)
    description: str

class ExperienceExtractor(BaseModel):
    entries: List[ExperienceEntry]

class EducationEntry(BaseModel):
    institution: str
    degree: str
    field_of_study: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class EducationExtractor(BaseModel):
    entries: List[EducationEntry]

class ProjectEntry(BaseModel):
    name: str
    description: str
    skills_used: List[str] = Field(default_factory=list)

class ProjectExtractor(BaseModel):
    entries: List[ProjectEntry]

class SkillsExtractor(BaseModel):
    skills: List[str]

class AchievementEntry(BaseModel):
    title: str
    description: Optional[str] = None
    date: Optional[str] = None
    issuer: Optional[str] = None

class AchievementExtractor(BaseModel):
    entries: List[AchievementEntry]

class OtherEntry(BaseModel):
    heading: str
    content: str

class OtherExtractor(BaseModel):
    entries: List[OtherEntry]


SECTION_SCHEMA_MAP = {
    "experience": ExperienceExtractor,
    "work experience": ExperienceExtractor,
    "professional experience": ExperienceExtractor,
    "education": EducationExtractor,
    "projects": ProjectExtractor,
    "skills": SkillsExtractor,
    "technical skills": SkillsExtractor,
    "achievements": AchievementExtractor,
    "awards": AchievementExtractor,
    "honors": AchievementExtractor,
    "certifications": AchievementExtractor,
    "certificates": AchievementExtractor,
    "licenses": AchievementExtractor,
}

CANONICAL_KEY = {
    ExperienceExtractor: "Experience",
    EducationExtractor: "Education",
    ProjectExtractor: "Projects",
    SkillsExtractor: "Skills",
    AchievementExtractor: "Achievements",
}

def route_section(name: str):
    key = name.strip().lower()
    for k, schema in SECTION_SCHEMA_MAP.items():
        if k in key:
            return schema
    return OtherExtractor