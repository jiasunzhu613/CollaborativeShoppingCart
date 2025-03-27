from flask import Flask, request, Blueprint, jsonify
from backend import client
from .prompt import create_prompt
import json 
import requests
from requests import HTTPError
from backend import BACKEND_URL

bp = Blueprint("chatbot", __name__)

"""
TODO:
- use user data to create the prompt 

"""
@bp.route("/", methods=["POST"])
def post_chatbot_response():
    # get json request data from user
    data = request.json # has cart_id, recipe that user wants to create
    cart_id = data.get("cart_id", "")

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=create_prompt(data.get("recipe", "")),
    ) # returns a json object

    res_json = response.text.strip("```json\n").strip("```\n")

    ingredients = json.loads(res_json)

    headers = {
        "Content-Type": "application/json"
    }
    for ingredient in ingredients:
        quantity = ingredients[ingredient]
        # TODO: probably also plug existing categories into gemini but currently testing with no type
        cart_item_post_data = {
            "item_name": ingredient,
            "quantity": 1,
            "category": ""
        }
        # surround with try except
        try:
            requests.post(f"{BACKEND_URL}/cart_item/{cart_id}", headers=headers, data=json.dumps(cart_item_post_data))
        except HTTPError as err:
            return jsonify(err)
        
    return jsonify(ingredients)
        





    

