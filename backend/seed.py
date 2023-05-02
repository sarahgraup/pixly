"""Seed file to make sample data for pets db."""

from models import Image, db
from app import app
import datetime

now = datetime.datetime.now()

# Create all tables
db.drop_all()
db.create_all()

image1 = Image(date_time_created=now,
               gps_latitude="40.76",
               gps_longitude="40.76",
               make="EASTMAN KODAK COMPANY",
               model="KODAK CX7530 ZOOM DIGITAL CAMERA")

image2 = Image(date_time_created=now,
               gps_latitude="40.76",
               gps_longitude="40.76",
               make="FUJIFILM",
               model="FinePix6900ZOOM")

db.session.add_all([image1, image2])
db.session.commit()