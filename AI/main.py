from fastapi import FastAPI
from pydantic import BaseModel
from pipelines.PDFIngestionPipeline import download_file_aws
from fastapi.middleware.cors import CORSMiddleware
from pipelines.GraphIngestionPipeline import GraphPipeline
from pipelines.RepoExtractorPipeline import DigRepo
from db.GraphDB import graph
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data = {}

class S3Document(BaseModel):
    s3_key: str

class RepoLinks(BaseModel):
    links: list[str]

class AnswerResponse(BaseModel):
    answers: list[str]

@app.post("/{user_id}/docs")
def upload_document(user_id: str, document: S3Document):

    s3_key = document.s3_key

    print("User:", user_id)
    # print("Bucket:", bucket_name)
    print("S3 Key:", s3_key)

    file_path = download_file_aws(user_id=user_id, s3_key=s3_key)

    gip = GraphPipeline(file_name=file_path, user_id=user_id)
    gip.execute()

    
    return {
        "response":"done"
    }


@app.post("/{user_id}/questions")
def get_questions(user_id:str, rp:RepoLinks):
    links = rp.links
    data = DigRepo(user_id, links)
    questions = data['questions']
    source_paths = data['source_paths']
    data[user_id] = {'questions':questions, 'source_paths':source_paths}

    return {
        'questions':questions
    }


@app.post("/{user_id}/answers")
def get_answers(user_id:str, ap:AnswerResponse):
    answers = ap.answers

    