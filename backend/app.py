import os

from flask import Flask, request, redirect, jsonify, flash
from werkzeug.utils import secure_filename
from flask_debugtoolbar import DebugToolbarExtension
import PIL.Image
from werkzeug.exceptions import NotFound, BadRequest
from flask_cors import CORS, cross_origin

from models import db, connect_db, Image
from s3 import S3

# if using api key
from dotenv import load_dotenv
load_dotenv()
AWS_BUCKET_URL = "https://sarahgraup-pixly.s3.us-west-1.amazonaws.com"

app = Flask(__name__)
cors = CORS(app)

app.config['SECRET_KEY'] = "secret"

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///pixly')  # must link to db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True  # always true to see sql in terminal
app.config['CORS_HEADERS'] = 'Content-Type'

connect_db(app)

debug = DebugToolbarExtension(app)

#TODO: add examples to doctsrings

@app.get("/images")
def get_images():
    """get request to access aws images and returns images,
    optional search term
    returns array of images with url: {images: [{img_data, url},...]}
    """

    search = request.args.get('search_term')
    if not search:
        images = Image.get_images_optional_search()
    else:
        images = Image.get_images_optional_search(search_term=search)

    images_with_urls = []
    for image in images:
        print(f"image path {image.path}")
        url = S3.get_preassigned_url(image.path)
        print(f"url {url}")
        serialize = image.serialize()

        images_with_urls.append({"image_data":serialize, "url":url})
    return jsonify(images=images_with_urls)

#TODO: have errors return something with actual error message
@app.post("/images/upload")
def handle_image_upload():
    """
    Adds new photo to db and aws
    returns images with url {images: [{img_data, url}]}
    """
    print("inside /upload")
    print(f"request= {request.files}")

    if 'file' not in request.files:
        error_msg = "No 'file' found"
        return jsonify(error=error_msg)

    file = request.files['file']
    print(f"handle_image_upload file= {file}")
    caption = request.form['caption']

    if file.filename == '':
        error_msg = "No 'filename' found"
        return jsonify(error=error_msg)

    if file:
        file_name = secure_filename(file.filename)
        image = None
        try:
            image = Image.add_image_data(file=file, path=file_name, caption=caption)
        except( NotFound, BadRequest):
            error_msg = "Could not upload."
            return jsonify(error=error_msg)

        # print(image)
        try:
            S3.upload_file(file_name=file, save_as_name=file_name)
        except( NotFound, BadRequest):
            error_msg = "Could not upload to aws."
            return jsonify(error=error_msg)

        url = S3.get_preassigned_url(image.path)
        serialize = image.serialize()

        #returns database entry record
        return jsonify(images=[{"image_data": serialize, "url":url}])

@app.get("/images/<int:id>")
def get_image_by_id(id):
    """
    get request to access aws image by id and returns image w url
    output: {images: [{img_data, url}]}
    """
    print("inside get image by id")
    try:
        image = Image.get_image_data(id=id)
    except( NotFound, BadRequest):
        error_msg = "Could not find image."
        return jsonify(error=error_msg)

    url = S3.get_preassigned_url(image.path)
    serialize = image.serialize()

    return jsonify(images=[{"image_data":serialize, "url":url}])

    # # add to db
    # # use id from db as filename
    # # add to aws
    # file_name = secure_filename(file.filename)
    # save_as_name = f"{id}.jpeg"
    # S3.upload_file(file_name=file_name, save_as_name=save_as_name)
