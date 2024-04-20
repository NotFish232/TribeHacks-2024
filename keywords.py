from openai import OpenAI
import json
# Load the API key from an environment variable
from dotenv import load_dotenv
import os

load_dotenv() 


client = OpenAI()


def text_to_keywords(text: str) -> dict[str, str]:
    
    prompt = "Turn this transcript below surrounded by {} into only a JSON dictionary with no other words, containing pairs with the keyword and the definition of that keyword in the format of {term1: definition1, term2: definition2} with the terms and definitions being strings " +"{"+text+"}"
    response = client.chat.completions.create(
    model="gpt-4-turbo",
    response_format={ "type": "json_object" },
    messages=[
        {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
        {"role": "user", "content": prompt}
        ]
    )
    print(response.choices[0].message.content)#this should be our response
    pass

thing = input("put ur prompt here\n")
text_to_keywords(thing)