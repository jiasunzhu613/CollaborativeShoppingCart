from flask import Flask, request, Blueprint, jsonify
from sqlalchemy import insert, select
from backend import db
from ..cart_item.model import Cart_Item


# Create blueprint for endpoints
bp = Blueprint("cart_item", __name__)


@bp.route("/<incoming_cart_id>", methods=["POST"]) # TODO: do you think its better for the route to be "/<cart_id>" then have no request field named cart_id?
def create_cart_item(incoming_cart_id):
    data = request.json

    query = insert(Cart_Item).\
            values(
                cart_id=incoming_cart_id,
                item_name=data.get("item_name", ""),
                quantity=data.get("quantity", 0)
            ).\
            returning(Cart_Item.id)

    cart_item = db.session.execute(query)
    db.session.commit()
    # print(cart_item)
    # NOTE: fetchone() fetches one object returned from the RETURNING (sqlalchemy equivalent is .returning()) keyword
    return jsonify({"id": cart_item.fetchone()[0]}) # https://docs.sqlalchemy.org/en/20/core/dml.html#sqlalchemy.sql.expression.Insert.returning


@bp.route("/", methods=["GET"])
def get_all_cart_items():
    items = db.session.scalars(select(Cart_Item)).all()
    return jsonify([{"count": len(items)}] + [{
                "id": item.id,
                "cart_id": item.cart_id,
                "item_name": item.item_name,
                "quantity": item.quantity
    } for item in items])


@bp.route("/<cart_item_id>", methods=["GET"])
def get_cart_item_by_id(cart_item_id):
    # https://stackoverflow.com/questions/55662957/what-is-the-difference-between-one-and-scalar
    item = db.session.scalars(select(Cart_Item).where(Cart_Item.id == cart_item_id)).one()
    return jsonify({
                "id": item.id,
                "cart_id": item.cart_id,
                "item_name": item.item_name,
                "quantity": item.quantity
    })



