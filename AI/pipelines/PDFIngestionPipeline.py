import os
from pathlib import Path
import boto3

cwd = Path(os.getcwd())
temp = cwd.parent
DOCS = Path(temp,"AI", "docs")


def download_file_aws(user_id, s3_key):
    

    s3 = boto3.client("s3")

    bucket_name = "tanishqbhanot-buildonomics"
    s3_key = s3_key
    local_path = Path(DOCS, f"{user_id}.pdf")

    s3.download_file(bucket_name, s3_key, local_path)

    print("Downloaded successfully!")
    return local_path


    
