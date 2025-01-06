from flask import Flask, request, Blueprint

from backend import db
from ..cart.model import Cart


# Create blueprint for endpoints
bp = Blueprint("cart", __name__)

"""
TODO: 
- get, post, update, delete
"""

@bp.route("/<id>", methods=["GET"])
def get_cart(id):
    return id


