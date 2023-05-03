from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()


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
        db.DateTime,
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

    @classmethod
    def upload_image_data(cls,
                     path,
                     caption,
                     date_time_uploaded=None,
                     date_time_created=None,
                     gps_latitude=None,
                     gps_longitude=None,
                     make=None,
                     model=None):
        """uploads image properties to db"""
        # date_time_uploaded= datetime.datetime.utcnow()

        image = Image(path=path,
                    caption=caption,
                    date_time_created=date_time_created,
                    gps_latitude=gps_latitude,
                    gps_longitude=gps_longitude,
                    make=make,
                    model=model)
        db.session.add(image)
        db.session.commit()
        return image

    @classmethod
    def download_image_data(cls, id):
        """downloads image properties from db"""
        print("download_image ran")

        image = cls.query.get(id)
        return image

    @classmethod
    def get_images_optional_search(cls, search_term=None):
        """downloads images matching search_term from db"""
        print("inside get_images_by_search")
        if not search_term:
            print("inside NOT search")
            images = cls.query.all()
            return images
        else:
            print("inside searchterm")
            images = cls.query.filter(cls.caption.ilike(f"%{search_term}%")).order_by(cls.date_time_uploaded).all()
        print(images)
        return images