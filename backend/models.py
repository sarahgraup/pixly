from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    app.app_context().push()
    db.app = app
    db.init_app(app)

class Image (db.Model):
    """Creates an image instance"""

    __tablename__= "images"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
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



