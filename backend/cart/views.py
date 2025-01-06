from flask import Flask, request, Blueprint, jsonify, Response
from sqlalchemy import insert, select
from backend import db
from ..cart.model import Cart


# Create blueprint for endpoints
bp = Blueprint("cart", __name__)

"""
TODO: 
- get, post, update, delete
"""

@bp.route("/", methods=["POST"])
def create_cart():
    data = request.json
    cart = db.session.execute(insert(Cart).values(title=data["title"]))
    db.session.commit()
    return jsonify({"id": cart.inserted_primary_key[0]}) # https://docs.sqlalchemy.org/en/20/tutorial/data_insert.html#the-insert-sql-expression-construct

@bp.route("/", methods=["GET"])
def get_all_carts():
    carts = db.session.scalars(select(Cart)).all()
    return jsonify([{"id": c.id} for c in carts])

@bp.route("/<cart_id>", methods=["GET"])
def get_cart_by_id(cart_id):
    cart = db.session.scalars(select(Cart).where(Cart.id == cart_id)).one()
    return jsonify({
                "id": cart.id,
                "title": cart.title,
                "cart_items": cart.cart_items
           })








