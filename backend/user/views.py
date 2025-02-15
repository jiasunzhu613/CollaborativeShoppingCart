from flask import Flask, request, Blueprint, jsonify
from sqlalchemy import insert, select, delete

from backend import db
from ..user.model import User


# Create blueprint for endpoints
bp = Blueprint("user", __name__)


@bp.route("/<user_id>", methods=["GET"])
def get_user_by_id(user_id):
    user = db.session.scalars(select(User).where(User.id == user_id)).one()
    return jsonify(user)


@bp.route("/", methods=["POST"])
def create_user():
    query = insert(User).values([request.get_json()]).returning(User.id)

    created = db.session.scalar(query)
    # Handle failure to create
    return jsonify(created)


@bp.route("/", methods=["UPDATE"])
def update_user():
    query = insert(User).values([request.get_json()]).returning(User.id)

    created = db.session.scalar(query)
    # Handle failure to create
    return jsonify(created)


@bp.route("/<user_id>", methods=["DELETE"])
def delete_user_by_id(user_id):
    delete(User).where(User.id == user_id)

    return True
