import os

from flask import Flask, request, redirect, render_template, jsonify
from flask_debugtoolbar import DebugToolbarExtension


from models import db, connect_db, Image
from s3 import S3 

#if using api key
from dotenv import load_dotenv
load_dotenv()
AWS_BUCKET_URL = "https://sarahgraup-pixly.s3.us-west-1.amazonaws.com"

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///pixly') #must link to db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True #always true to see sql in terminal

connect_db(app)

debug = DebugToolbarExtension(app)

@app.get("/")
def get_images():
    """get request to access aws images and returns images"""

    search = request.args.get('search_term')
    if not search:
        images = Image.get_images_optional_search()
    else:
        images = Image.get_images_optional_search(search_term=search)
    
    bucket = S3.get_bucket_name()
    urls = []
    for image in images:     
        print(f"image path {image.path}")
        url = S3.get_preassigned_url(image.path)
        print(f"url {url}")
        urls.append(url)

   
    
    
    return jsonify(urls=urls)


