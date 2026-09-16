import os
from pathlib import Path
import boto3

cwd = Path(os.getcwd())
temp = cwd.parent
DOCS = Path(temp, "docs")


def download_file_aws():
    

    s3 = boto3.client("s3")

    bucket_name = "my-bucket"
    s3_key = "documents/resume.pdf"
    local_path = "resume.pdf"

    s3.download_file(bucket_name, s3_key, local_path)

    print("Downloaded successfully!")

    

