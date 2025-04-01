from datetime import datetime
from flask import Flask, request, Blueprint, jsonify, make_response, render_template
from sqlalchemy import insert, select, delete

from backend import db, BACKEND_URL
from ..user.model import User
from ..sessionID.model import SessionID
from ..utils import hash, compare_hashes
import requests
import json
import datetime

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

# Query by email
@bp.route("/", methods=["GET"])
def get_user_by_email():
    data = request.json
    email = data.get("email", "")
    user = db.session.scalars(select(User).where(User.email == email)).one()
    # Eventually, also return Carts, etc.
    return jsonify(
        {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "dob": user.dob,
            # "password_hash": user.password_hash,
        }
    )

# Query by email
@bp.route("/verify", methods=["POST"])
def verify_user():
    data = request.json
    email = data.get("email", "")
    password = data.get("password", "")
    user = db.session.scalars(select(User).where(User.email == email)).one()
    if compare_hashes(password, user.password_hash):
        # headers = {
        #     "Content-Type": "application/json"
        # }
        # # resp = requests.post(f"{BACKEND_URL}/session/new-session", headers=headers, data=json.dumps({"email": email}))
        # return jsonify("success"), 200
        user_id = {"email": user.email}
        query = insert(SessionID).\
                values(user_id = user.id,  
                expires_after = datetime.datetime.now() + datetime.timedelta(days=14)).\
                returning(SessionID)

        new_session = db.session.execute(query)
        db.session.commit()
        new_session = new_session.fetchone()[0]
        print(new_session.session_id)
        resp = make_response(jsonify({
            "session_id": new_session.session_id,
            "user_id": user.id
        }))
        expire_date = datetime.datetime.now()
        expire_date = expire_date + datetime.timedelta(days=14) 
        resp.set_cookie("session_id", value=str(new_session.session_id), domain="localhost", httponly=True, samesite="Lax", expires=expire_date) #secure=True
        resp.set_cookie("user_id", value=str(user.id), domain='localhost', httponly=True, samesite="Lax", expires=expire_date) # secure=True
        resp.headers["Access-Control-Allow-Credentials"] = "true"
        resp.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
        return resp, 200
    # Eventually, also return Carts, etc.
    # return jsonify(
    #     {
    #         "id": user.id,
    #         "first_name": user.first_name,
    #         "last_name": user.last_name,
    #         "dob": user.dob,
    #         # "password_hash": user.password_hash,
    #     }
    # )
    return jsonify("failed"), 400 # TODO: check status codes


# TODO: make email unique
@bp.route("/", methods=["POST"])
def create_user():
    data = request.json
    query = (
        insert(User)
        .values(
            email=data.get("email", ""),
            first_name=data.get("first_name", ""),
            last_name=data.get("last_name", ""),
            dob=datetime.datetime.fromtimestamp(
                data.get("dob", 0), 
            ).strftime("%Y %m %d"),
            # dob=0,
            password_hash=hash(data.get("password", "")),
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
            "password_hash": new_user.password_hash.decode("utf-8"),
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
