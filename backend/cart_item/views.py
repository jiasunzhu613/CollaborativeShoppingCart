from flask import Flask, request, Blueprint, jsonify
from sqlalchemy import insert, select, update, delete
from backend import db
from ..cart_item.model import Cart_Item


# Create blueprint for endpoints
bp = Blueprint("cart_item", __name__)

"""
TODO: 
- update, delete
"""

@bp.route("/<incoming_cart_id>", methods=["POST"])
def create_cart_item(incoming_cart_id):
    data = request.json

    query = insert(Cart_Item).\
            values(
                cart_id=incoming_cart_id,
                item_name=data.get("item_name", ""),
                quantity=data.get("quantity", 0),
                category=data.get("category", "")
            ).\
            returning(Cart_Item)

    cart_item = db.session.execute(query)
    db.session.commit()
    item_returned = cart_item.fetchone()[0] 
    # NOTE: fetchone() fetches one object returned from the RETURNING (sqlalchemy equivalent is .returning()) keyword
    return jsonify({
        "id": item_returned.id,
        "item_name": item_returned.item_name,
        "quantity": item_returned.quantity,
        "category": item_returned.category,
        "cart_id": item_returned.cart_id
        }) # https://docs.sqlalchemy.org/en/20/core/dml.html#sqlalchemy.sql.expression.Insert.returning


@bp.route("/", methods=["GET"])
def get_all_cart_items():
    items = db.session.scalars(select(Cart_Item)).all()
    return jsonify([{"count": len(items)}] + [{
                "id": item.id,
                "cart_id": item.cart_id,
                "item_name": item.item_name,
                "quantity": item.quantity,
                "category": item.category
    } for item in items])


@bp.route("/<cart_item_id>", methods=["GET"])
def get_cart_item_by_id(cart_item_id):
    # https://stackoverflow.com/questions/55662957/what-is-the-difference-between-one-and-scalar
    item = db.session.scalars(select(Cart_Item).where(Cart_Item.id == cart_item_id)).one()
    return jsonify({
                "id": item.id,
                "cart_id": item.cart_id,
                "item_name": item.item_name,
                "quantity": item.quantity,
                "category": item.category
    })

@bp.route("/<cart_item_id>", methods=["PUT"])
def update_cart_item_by_id(cart_item_id):
    data = request.json
    
    cart_item = db.session.scalars(select(Cart_Item).where(Cart_Item.id == cart_item_id)).one()
    query = update(Cart_Item).\
            where(Cart_Item.id == cart_item_id).\
            values(
                item_name=data.get("item_name", cart_item.item_name),
                quantity=data.get("quantity", cart_item.quantity),
                category=data.get("category", cart_item.category)
            ).\
            returning(Cart_Item.id)
    cart_item = db.session.execute(query)
    db.session.commit()
    return jsonify({"id": cart_item.fetchone()[0]})

@bp.route("/<cart_item_id>", methods=["DELETE"])
def delete_cart_item_by_id(cart_item_id):
    query = delete(Cart_Item).\
            where(Cart_Item.id == cart_item_id)
    db.session.execute(query)
    db.session.commit()
    return f"Delete cart item id={cart_item_id}"


