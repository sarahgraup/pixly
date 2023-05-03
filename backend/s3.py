import os.path
# from PIL import Image as pil_image
import boto3
import os
from dotenv import load_dotenv
load_dotenv()


class S3:
    """class for s3 bucket"""

    s3 = boto3.client(
        "s3",
        "us-west-1",
        aws_access_key_id=os.getenv('KEY'),
        aws_secret_access_key=os.getenv('SECRET')
    )

    def __init__(self, s3):
        self.s3 = s3

    @classmethod
    def get_bucket_name(self):
        """get bucket name"""
        client = self.s3
        bucket_resp = client.list_buckets()
        # print(f"bucket response{bucket_resp}")
        bucket = bucket_resp['Buckets'][0]
        bucket_name = bucket['Name']
        # print(f"bucketname {bucket_name}")
        return bucket_name

    @classmethod
    def get_preassigned_url(self, obj_key):
        bucket = self.get_bucket_name()
        url = self.s3.generate_presigned_url(
            ClientMethod='get_object',
            Params={'Bucket': bucket, 'Key': obj_key},
            ExpiresIn=259000) ## expires in about three days
        return url

    @classmethod
    def upload_file(self, file_name, save_as_name):
        """uploads file to s3 bucket"""
        bucket = self.get_bucket_name()

        self.s3.upload_file(file_name, bucket, save_as_name)

    @classmethod
    def download_file(self, file_name, save_as_name):
        """downloads file from s3 bucket"""
        bucket = self.get_bucket_name()

        self.s3.download_file(bucket, file_name, save_as_name)


# path = "/Users/sarahgraup/rithm/exercises/pixly/PIXLY-TEST.jpg"
# # valid_images = [".jpg",".gif",".png",".tga"]

# image = pil_image.open(path)
# print(image)

# S3.upload_file(path )


# def upload_image(inp_file_name, inp_file_key, content_type ):
#     """function to upload image to pixly"""
#     bucket_name = get_bucket_name()
#     s3_upload_small_files(inp_file_name, bucket_name, inp_file_key, content_type)


# bucket response [{'Name': 'sarahgraup-pixly', 'CreationDate': datetime.datetime(2023, 5, 2, 20, 44, 10, tzinfo=tzutc())}]

# my_config = Config(
#     region_name = 'us-west-2',
#     signature_version = 'v4',
#     retries = {
#         'max_attempts': 10,
#         'mode': 'standard'
#     }
# )

# client = boto3.client('kinesis', config=my_config)
