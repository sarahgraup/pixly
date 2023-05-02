import boto3
import os
from dotenv import load_dotenv
load_dotenv()
# from wh import Config

s3 = boto3.client(
    "s3",
    "us-west-1",
    aws_access_key_id=os.getenv('KEY'),
    aws_secret_access_key=os.getenv('SECRET')
)

def get_bucket():
    client = s3
    bucket_resp = client.list_buckets()
    print(f"bucket response {bucket_resp['Buckets']}")


get_bucket()



# my_config = Config(
#     region_name = 'us-west-2',
#     signature_version = 'v4',
#     retries = {
#         'max_attempts': 10,
#         'mode': 'standard'
#     }
# )

# client = boto3.client('kinesis', config=my_config)