import os

from flask import Flask, request, redirect, render_template, jsonify
from flask_debugtoolbar import DebugToolbarExtension


from models import db, connect_db

#if using api key 
from dotenv import load_dotenv
load_dotenv()
# API_SECRET_KEY = os.environ['api-variable-name']

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"

# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
#     "DATABASE_URL", 'postgresql:///sqla_intro') #must link to db 
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_ECHO'] = True #always true to see sql in terminal

# connect_db(app)

debug = DebugToolbarExtension(app)

@app.get("/")
def test():
    

