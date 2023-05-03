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

def get_bucket_name():
    """get bucket name"""
    client = s3
    bucket_resp = client.list_buckets()
    return bucket_resp[0].Name


def upload_file(file_name):
    bucket = get_bucket_name()

    s3.upload_file(file_name, bucket)
 

# def download_file(file_name, save_as_name):
#     bucket=get_bucket_name()
    
#     s3.download_file(bucket, file_name, save_as_name)


# def upload_image(inp_file_name, inp_file_key, content_type ):
#     """function to upload image to pixly"""
#     bucket_name = get_bucket_name()
#     s3_upload_small_files(inp_file_name, bucket_name, inp_file_key, content_type)




#bucket response [{'Name': 'sarahgraup-pixly', 'CreationDate': datetime.datetime(2023, 5, 2, 20, 44, 10, tzinfo=tzutc())}]

# my_config = Config(
#     region_name = 'us-west-2',
#     signature_version = 'v4',
#     retries = {
#         'max_attempts': 10,
#         'mode': 'standard'
#     }
# )

# client = boto3.client('kinesis', config=my_config)