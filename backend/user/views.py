from datetime import datetime
from flask import Flask, request, Blueprint, jsonify
from sqlalchemy import insert, select, delete

from backend import db
from ..user.model import User
from ..utils import hash

# Create blueprint for endpoints
bp = Blueprint("user", __name__)

"""
Notes:
- The frontend will always send RAW plain-text passwords over https,
it the backend's job to handle them - we take in a raw password and hash it
- To check if a user's login password is correct, we hash and compare to
the hash that we store
^ maximizes security, since the DB contains hashes only, and the passwd
is sent over HTTPS

- We expect UTC time from the frontend
"""


@bp.route("/<user_id>", methods=["GET"])
def get_user_by_id(user_id):
    user = db.session.scalars(select(User).where(User.id == user_id)).one()
    # Eventually, also return Carts, etc.
    return jsonify(
        {
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "dob": user.dob,
            # "password_hash": user.password_hash,
        }
    )


@bp.route("/", methods=["POST"])
def create_user():
    data = request.json
    query = (
        insert(User)
        .values(
            email=data.get("email"),
            first_name=data.get("first_name"),
            last_name=data.get("last_name"),
            dob=datetime.fromtimestamp(
                data.get("dob"),
            ).strftime("%Y %m %d"),
            password_hash=hash(data.get("password")),
        )
        .returning(User)
    )

    new_user = db.session.execute(query)
    db.session.commit()
    new_user = new_user.fetchone()[0]

    # TODO: eventually we only need to return 1 thing, but for rn keep this
    return jsonify(
        {
            "id": new_user.id,
            "email": new_user.email,
            "first_name": new_user.first_name,
            "last_name": new_user.last_name,
            "dob": new_user.dob,
            "password_hash": new_user.password_hash,
        }
    )


@bp.route("/", methods=["UPDATE"])
def update_user():
    query = insert(User).values([request.get_json()]).returning(User.id)

    created = db.session.scalar(query)
    # Handle failure to create
    return jsonify(created)


@bp.route("/<user_id>", methods=["DELETE"])
def delete_user_by_id(user_id):
    user = db.session.scalars(select(User).where(User.id == user_id)).one()

    print(user)
    if not user:
        return (
            jsonify({"message": "User not found"}),
            404,
        )

    db.session.delete(user)
    db.session.commit()
    return "", 204  # 204 == No Content

    # Add db.session.rollback in case the deletion goes wrong, to notify frontend
