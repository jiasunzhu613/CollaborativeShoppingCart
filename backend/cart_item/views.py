from flask import Flask, request, Blueprint

from backend import db
from ..cart_item.model import Cart_Item


# Create blueprint for endpoints
bp = Blueprint("cart_item", __name__)