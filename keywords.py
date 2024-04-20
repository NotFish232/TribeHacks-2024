import openai
import json
# Load the API key from an environment variable
from dotenv import load_dotenv
import os

load_dotenv()  # This method loads variables from a .env file into the environment
api_key = os.getenv('OPENAI_API_KEY')

openai.api_key = apiKey

client = OpenAI()

def text_to_keywords(text: str) -> dict[str, str]:
    
    prompt = "Turn this transcript below surrounded by {} into only a JSON dictionary with no other words, containing pairs with the keyword and the definition of that keyword in the format of {term1: definition1, term2: definition2} with the terms and definitions being strings " +"{"+text+"}"
    response = client.ChatCompletion.create(
    model="gpt-4-turbo",
    max_tokens=120,
    response_format={ "type": "json_object" },
    messages=[
        {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
        {"role": "user", "content": prompt}
        ]
    )
    json.loads(response['choices'][0]['message']['content'])#this should be our response
    pass