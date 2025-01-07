from flask import Flask, request, Blueprint, jsonify, Response
from sqlalchemy import insert, select
from backend import db
from ..cart.model import Cart
from datetime import datetime, timezone


# Create blueprint for endpoints
bp = Blueprint("cart", __name__)

"""
TODO: 
- get, post, update, delete
"""

def get_time_now():
    return datetime.now(timezone.utc)

# TODO: fix/add all the new fields 
@bp.route("/", methods=["POST"])
def create_cart():
    data = request.json
    cart = db.session.execute(insert(Cart).values(
        title=data.get("title", None),
        description=data.get("description", None),
        date_created=get_time_now(),
        creator=data.get("creator", None)
        ))
    db.session.commit()
    return jsonify({"id": cart.inserted_primary_key[0]}) # https://docs.sqlalchemy.org/en/20/tutorial/data_insert.html#the-insert-sql-expression-construct

@bp.route("/", methods=["GET"])
def get_all_carts():
    carts = db.session.scalars(select(Cart)).all()
    return jsonify([{"count": len(carts)}] + [{
                "id": c.id,
                "title": c.title,
                "description": c.description,
                "date_created": c.date_created,
                # "cart_items": c.cart_items, # if you want to see the cart items, currently only way is to query again by id
                "creator": c.creator
        } for c in carts])

@bp.route("/<cart_id>", methods=["GET"])
def get_cart_by_id(cart_id):
    cart = db.session.scalars(select(Cart).where(Cart.id == cart_id)).one()
    items = cart.cart_items
    cart_items = [{
        "id": item.id,
        "item_name": item.item_name,
        "quantity": item.quantity
    } for item in items]
    return jsonify({
                "id": cart.id,
                "title": cart.title,
                "description": cart.description,
                "date_created": cart.date_created,
                "cart_items": cart_items,
                "creator": cart.creator
           })








