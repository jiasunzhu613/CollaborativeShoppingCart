from flask import Flask, request, Blueprint, jsonify, Response
from sqlalchemy import insert, select, update, delete
from backend import db
from ..cart.model import Cart
from datetime import datetime, timezone


# Create blueprint for endpoints
bp = Blueprint("cart", __name__)

"""
TODO: 
- update, delete
"""

def get_time_now():
    return datetime.now(timezone.utc)

# TODO: fix/add all the new fields 
@bp.route("/", methods=["POST"])
def create_cart():
    data = request.json
    creator = request.cookies.get("user_id")
    print("the creator is:", creator)

    cart = db.session.execute(insert(Cart).values(
        title=data.get("title", None),
        description=data.get("description", None),
        date_created=get_time_now(),
        creator=creator,
        users=""
        ).\
        returning(Cart))
    db.session.commit()
    # fetchone() returns one row from the returning statement we have above, index 0 contains our desired cart return object
    cart_returned = cart.fetchone()[0] 
    return jsonify({
        "id": cart_returned.id,
        "title": cart_returned.title,
        "description": cart_returned.description,
        "date_created": cart_returned.date_created,
        # "cart_items": c.cart_items, # if you want to see the cart items, currently only way is to query again by id
        "creator": cart_returned.creator,
        "users": cart_returned.users
    })

@bp.route("/", methods=["GET"])
def get_all_carts():
    user_id = request.cookies.get("user_id")
    carts = db.session.scalars(select(Cart).where(Cart.creator == user_id).order_by(Cart.date_created.desc())).all() # returns all carts sorted by descending date created
    print(len(carts))
    return jsonify(
        {"count": len(carts),
            "data" : [{
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "date_created": c.date_created,
            # "cart_items": c.cart_items, # if you want to see the cart items, currently only way is to query again by id
            "creator": c.creator,
            "users": c.users
        } for c in carts]})

@bp.route("/<cart_id>", methods=["GET"])
def get_cart_by_id(cart_id):
    cart = db.session.scalars(select(Cart).where(Cart.id == cart_id)).one()
    items = cart.cart_items
    cart_items = [{
        "id": item.id,
        "item_name": item.item_name,
        "quantity": item.quantity,
        "category": item.category
    } for item in items]
    return jsonify({"data" : {
                "id": cart.id,
                "title": cart.title,
                "description": cart.description,
                "date_created": cart.date_created,
                "cart_items": cart_items,
                "creator": cart.creator,
                "users": cart.users
           }})

@bp.route("/<cart_id>", methods=["PUT"])
def update_cart_by_id(cart_id):
    data = request.json

    cart = db.session.scalars(select(Cart).where(Cart.id == cart_id)).one()
    query = update(Cart).\
            where(Cart.id == cart_id).\
            values(
                title=data.get("title", cart.title),
                description=data.get("description", cart.description)
            ).\
            returning(Cart.id)
    cart = db.session.execute(query)
    db.session.commit()
    return jsonify({"id": cart.fetchone()[0]})

@bp.route("/<cart_id>", methods=["DELETE"])
def delete_cart_by_id(cart_id):
    query = delete(Cart).where(Cart.id == cart_id)
    db.session.execute(query)
    db.session.commit()
    return f"Deleted {cart_id}"
    # items = cart.cart_items
    # cart_items = [{
    #     "id": item.id,
    #     "item_name": item.item_name,
    #     "quantity": item.quantity
    # } for item in items]
    # return jsonify({
    #             "id": cart.id,
    #             "title": cart.title,
    #             "description": cart.description,
    #             "date_created": cart.date_created,
    #             "cart_items": cart_items,
    #             "creator": cart.creator,
    #             "users": cart.users
    #        })

@bp.route("/", methods=["DELETE"])
def delete_all_carts():
    query = delete(Cart)
    db.session.execute(query)
    db.session.commit()
    return "Deleted all carts"
    # return jsonify([{"count": len(carts)}] + [{
    #             "id": c.id,
    #             "title": c.title,
    #             "description": c.description,
    #             "date_created": c.date_created,
    #             # "cart_items": c.cart_items, # if you want to see the cart items, currently only way is to query again by id
    #             "creator": c.creator,
    #             "users": c.users
    #     } for c in carts])








