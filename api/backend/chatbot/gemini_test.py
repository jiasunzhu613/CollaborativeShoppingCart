import os
from dotenv import load_dotenv

from google import genai
from prompt import create_prompt
import json

# load dotenv
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=create_prompt("chow mein"),
)

returned = response.text.strip("```json\n").strip("```\n")
print(returned)

response_json = json.loads(returned)
print(response_json)
print(type(response_json))

"""
TODO / what do i need:
- need gemini to create json and interact with API to add the elements into the cart

"""
