from flask import Flask, request, Blueprint, jsonify, make_response
from sqlalchemy import insert, select, update, delete, text
from backend import db, BACKEND_URL
from ..sessionID.model import SessionID
import datetime
import requests
import json


# Create blueprint for endpoints
bp = Blueprint("session_id", __name__)
headers = {
    "Content-Type": "application/json"
}
# Returns to user a unique session id
# Should check if user is registered, and return a session id if user is registerd and pw is correct
# Generate new session id
# @bp.route("/new-session", methods=["POST"])
# def new_user_session():
#     data = request.json

#     resp = make_response("creating new session")

#     # make request to user routes
#     user_data = requests.get(f"{BACKEND_URL}/user/", data=json.dumps(data), headers=headers)
#     user_id = user_data.json()
#     query = insert(SessionID).\
#             values(user_id = user_id.get("id", ""), 
#             expires_after = datetime.datetime.now() + datetime.timedelta(days=14)).\
#             returning(SessionID)
    
#     new_session = db.session.execute(query)
#     db.session.commit()
#     new_session = new_session.fetchone()[0]
#     print(new_session.session_id)
#     resp.headers.add('Access-Control-Allow-Origin', '*')
#     expire_date = datetime.datetime.now()
#     expire_date = expire_date + datetime.timedelta(days=90) 
#     resp.set_cookie("user_id", value=str(user_id.get("id", "")), domain='localhost', httponly=True, expires=expire_date) # secure=True
#     resp.set_cookie("session_id", value=str(new_session.session_id), domain='localhost', httponly=True, expires=expire_date) # secure=True
#     # resp.headers["Access-Control-Allow-Credentials"] = True
#     return resp, 200

@bp.route("/delete-session", methods=["DELETE"])
def delete_user_session():
    # get request JSON
    data = request.json
    session_id = data.get("session_id", "")

    # Delete session 
    # TODO: do error checking and handle if the session didnt exist in db?
    query = delete(SessionID).\
            where(SessionID.session_id == session_id)
    db.session.execute(query)
    db.session.commit()

    # now delete httponly cookie on client side
    response = make_response(jsonify("success"))
    # expire_date = datetime.datetime.now() - datetime.timedelta(days=10)
    response.set_cookie("session_id", expires=0)
    response.set_cookie("user_id", expires=0)
    return response


@bp.route("/verify-session", methods=["GET"])
def verify_session():
    print(request.cookies)
    session_id = request.cookies.get("session_id")
    print(session_id)

    query = text("""
            select session_id, user_id
            from sessionid_table 
            where expires_after >= now();
            """)
    session_ids = db.session.execute(query).all()
    db.session.commit()
    # print(session_ids)
    session_ids = set(tuple(str(ID) for ID in sess_id) for sess_id in session_ids)
    user_id = None
    for sess_id in session_ids:
        if sess_id[0] == session_id:
            print("found", sess_id)
            user_id = sess_id[1]
            return jsonify({
            "session_id": session_id,
            "user_id": user_id
            }), 200
    return jsonify("failed"), 400