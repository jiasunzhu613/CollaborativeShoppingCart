import os

import click
from flask import Flask
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from dotenv import load_dotenv
from flask_cors import CORS
from flask_migrate import Migrate
# from flask_bcrypt import Bcrypt

# from psycopg2 import

from google import genai


# Load .env file
load_dotenv()


# Create base model
class Base(DeclarativeBase):  # remember to define as class!
    pass


# Create SQL db model that will load a db engine
db = SQLAlchemy(model_class=Base)

# Initialize Gemini instance
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)
BACKEND_URL = os.getenv("BACKEND_URL")


# Function used to create the flask app, similar to if you used if __name__ == "__main__" then app.run() without the function
def create_app():
    app = Flask(__name__)

    # Initialize CORS
    CORS(app, origins=["https://cart.jonathanzhu.com"], supports_credentials=True) #origins=["https://cart.jonathanzhu.com"]

    db_uri = os.getenv("DATABASE_URI")

    # if db_url is None:
    #     # default to a sqlite database in the instance folder
    #     db_url = "sqlite:///backend.db"

    # Configure SQlalchemy db
    app.config.from_mapping(
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev"),
        SQLALCHEMY_DATABASE_URI=db_uri,  # remember to capitalize everything
    )

    # Set up migration
    migrate = Migrate(app, db)

    # TODO: add config file?

    # Initialize Flask-SQLalchemy and database
    db.init_app(app)
    app.cli.add_command(init_db_command)

    # Register blueprints

    from backend import cart, cart_item, user, chatbot, sessionID
    app.register_blueprint(cart.bp, url_prefix="/cart")
    app.register_blueprint(cart_item.bp, url_prefix="/cart_item")
    app.register_blueprint(user.bp, url_prefix="/user")
    app.register_blueprint(sessionID.bp, url_prefix="/session")
    app.register_blueprint(chatbot.bp, url_prefix="/chatbot")

    return app


def init_db():
    # db.drop_all()  # TODO: need to delete later
    db.create_all()

# def init_session_id():
#     db.create_all()

@click.command("init-db")
@with_appcontext
def init_db_command():
    """Clear existing data and create new tables."""
    init_db()
    click.echo("Initialized the database.")