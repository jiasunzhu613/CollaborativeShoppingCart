from flask import Flask, request, Blueprint

from backend import db
from ..user.model import User


# Create blueprint for endpoints
bp = Blueprint("user", __name__)