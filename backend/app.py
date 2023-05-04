import os

from flask import Flask, request, redirect, render_template, jsonify
from werkzeug.utils import secure_filename
from flask_debugtoolbar import DebugToolbarExtension
import PIL.Image


from models import db, connect_db, Image
from s3 import S3

# if using api key
from dotenv import load_dotenv
load_dotenv()
AWS_BUCKET_URL = "https://sarahgraup-pixly.s3.us-west-1.amazonaws.com"

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///pixly')  # must link to db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True  # always true to see sql in terminal

connect_db(app)

debug = DebugToolbarExtension(app)


@app.get("/")
def get_images():
    """get request to access aws images and returns images,
    optional search term
    """

    search = request.args.get('search_term')
    if not search:
        images = Image.get_images_optional_search()
    else:
        images = Image.get_images_optional_search(search_term=search)

    urls = []
    for image in images:
        print(f"image path {image.path}")
        url = S3.get_preassigned_url(image.path)
        print(f"url {url}")
        urls.append(url)

    return jsonify(urls=urls)


@app.post("/upload")
def handle_image_upload():
    """Adds new photo to db and aws"""
    print("inside /upload")

    if 'file' not in request.files:
        return redirect(request.url)

    file = request.files['file']
    print(f"handle_image_upload file= {file}")
    caption = request.form['caption']

    if file.filename == '':
        return redirect(request.url)

    if file:
        file_name = secure_filename(file.filename)
        image = Image.add_image_data(file=file, path=file_name, caption=caption)
        # print(image)
        S3.upload_file(file_name=file, save_as_name=file_name)

    return "haha" #IMAGE OBJECT

    # # add to db
    # # use id from db as filename
    # # add to aws
    # file_name = secure_filename(file.filename)
    # save_as_name = f"{id}.jpeg"
    # S3.upload_file(file_name=file_name, save_as_name=save_as_name)
