from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import PIL.Image
from PIL.ExifTags import TAGS

db = SQLAlchemy()

IMG_EXIF_TAGS = ["GPSLatitude",
                 "GPSLongitude",
                 "DateTimeOriginal",
                 "Make",
                 "Model"]


def connect_db(app):
    """Connect to database."""

    app.app_context().push()
    db.app = app
    db.init_app(app)


class Image (db.Model):
    """Creates an image instance"""

    __tablename__ = "images"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    date_time_uploaded = db.Column(
        db.DateTime,
    )
    date_time_created = db.Column(
        db.String,
    )

    gps_latitude = db.Column(
        db.String,
    )

    gps_longitude = db.Column(
        db.String,
    )

    make = db.Column(
        db.String,
    )

    model = db.Column(
        db.String,
    )

    path = db.Column(
        db.String,
        nullable=False
    )

    caption = db.Column(
        db.String,
        nullable=False
    )

    # @classmethod
    # def add_image_data(cls,
    #                       path,
    #                       caption,
    #                       date_time_uploaded=None,
    #                       date_time_created=None,
    #                       gps_latitude=None,
    #                       gps_longitude=None,
    #                       make=None,
    #                       model=None):
    #     """uploads image properties to db"""
    #     # change to add or save image data
    #     date_time_uploaded= datetime.datetime.utcnow()

    #     image = Image(path=path,
    #                   caption=caption,
    #                   date_time_uploaded=date_time_uploaded,
    #                   date_time_created=date_time_created,
    #                   gps_latitude=gps_latitude,
    #                   gps_longitude=gps_longitude,
    #                   make=make,
    #                   model=model)
    #     db.session.add(image)
    #     db.session.commit()
    #     return image

    @classmethod
    def add_image_data(
            cls,
            path,
            file,
            caption):
        """uploads image properties to db"""
        # change to add or save image data

        print(f"add_img_data file {file}")
        exif_data = cls.get_img_exif_data(file=file)
        gps_latitude = gps_longitude = date_time_created = make = model = None
        if "GPSLatitude" in exif_data:
            gps_latitude = exif_data["GPSLatitude"]
        if "GPSLongitude" in exif_data:
            gps_longitude = exif_data["GPSLongitude"]
        if "DateTimeOriginal" in exif_data:
            date_time_created = exif_data["DateTimeOriginal"]
        if "Make" in exif_data:
            make = exif_data["Make"]
        if "Model" in exif_data:
            model = exif_data["Model"]

        date_time_uploaded = datetime.utcnow()
        print(f"utc now {date_time_uploaded}")

        image = Image(path=path,
                      caption=caption,
                      date_time_uploaded=date_time_uploaded,
                      date_time_created=date_time_created,
                      gps_latitude=gps_latitude,
                      gps_longitude=gps_longitude,
                      make=make,
                      model=model)
        db.session.add(image)
        db.session.commit()
        return image

    @classmethod
    def download_image_data(cls, id):  # fetch
        """downloads image properties from db"""
        print("download_image ran")

        image = cls.query.get(id)
        return image

    @classmethod
    def get_images_optional_search(cls, search_term=None):
        """downloads images matching search_term from db"""
        # print("inside get_images_by_search")
        if not search_term:
            # print("inside NOT search")
            images = cls.query.all()
            return images
        else:
            # BUG: sql injections?
            # flicker for exif data
            print("inside searchterm")
            images = (cls.query
                      .filter(cls.caption.ilike(f"%{search_term}%"))
                      .order_by(cls.date_time_uploaded)
                      .all())
        # print(images)
        return images

    @classmethod
    def get_img_exif_data(cls, file):
        """Get exif data from img"""
        # open image
        img = PIL.Image.open(file)
        exif_data = img._getexif()
        # print(f"exif_data={exif_data}")
        print(f"IMGGGGGGG {img.tell()}")
        
        # img.close()

        img_tag_exif_data = {}
        for key_tag in exif_data:
            tag = TAGS[key_tag]
            if tag in IMG_EXIF_TAGS:
                img_tag_exif_data[tag] = exif_data[key_tag]
        return img_tag_exif_data
