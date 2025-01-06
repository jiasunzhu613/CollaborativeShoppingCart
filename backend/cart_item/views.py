from flask import Flask, request, Blueprint, jsonify
from sqlalchemy import insert, select
from backend import db
from ..cart_item.model import Cart_Item


# Create blueprint for endpoints
bp = Blueprint("cart_item", __name__)


@bp.route("/", methods=["POST"])
def create_cart_item():
    query = insert(Cart_Item).\
            values([request.get_json()]).\
            returning(Cart_Item.id)

    created = db.session.scalar(query)
    return jsonify(created)


@bp.route("/", methods=["GET"])
def get_all_cart_items():
    items = db.session.scalars(select(Cart_Item)).all()
    return jsonify(items)


@bp.route("/<cart_item_id>", methods=["GET"])
def get_cart_item_by_id(cart_item_id):
    # https://stackoverflow.com/questions/55662957/what-is-the-difference-between-one-and-scalar
    user = db.session.scalars(select(Cart_Item).where(Cart_Item.id == cart_item_id)).one()
    return jsonify(user)



