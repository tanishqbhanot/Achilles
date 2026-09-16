from fastapi import FastAPI
from pydantic import BaseModel
from pipelines.PDFIngestionPipeline import download_file_aws
from fastapi.middleware.cors import CORSMiddleware
from pipelines.GraphIngestionPipeline import GraphPipeline
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # use your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class S3Document(BaseModel):
    s3_key: str


@app.post("/{user_id}/docs")
def upload_document(user_id: str, document: S3Document):

    # bucket_name = document.bucket_name
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