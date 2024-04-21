from flask import Flask, render_template, request
import json
import os
from .generator import text_to_keywords
from .transcription import audio_to_text
import fleep

template_dir = os.path.abspath("./templates")
app = Flask(__name__, template_folder="../templates/", static_folder="../static/")


@app.route("/", methods=["GET"])
def main_page() -> str:
    return render_template("index.html")


@app.route("/loading", methods=["POST"])
def loading_page() -> str:
    if "file" in request.files:  # File option
        file = request.files["file_input"]
        print("test2")
        # Check the file type (content type)
        # content_type = magic.from_buffer(file.read(2048), mime=True)
        file.save("../static/assets/" + file.filename)
        with open("filename.txt", "w") as txt_file:
            txt_file.write(file.filename)
    else:  # Text option
        print("test")
        user_text = request.form["text_input"]
        with open("user_text.txt", "w") as txt_file:
            txt_file.write(user_text)
        with open("filename.txt", "w") as txt_file:
            txt_file.write("user_text.txt")
    return render_template("loading.html")


@app.route("/parse_text")
def parse_text() -> str:
    print("test3")
    with open("filename.txt", "r") as txt_file:
        filename = txt_file.read()
    with open(filename, "rb") as file:
        text = ""
        if "audio" in fleep.get(file.read(128)).type:  # audio file
            text = audio_to_text(filename)
        else:
            with open(filename, "r") as file2:
                text = file2.read()
    keyword_pairs = text_to_keywords(text)
    # with open('data.json', 'w') as f:
    #     json.dump(keyword_pairs, f)
    return keyword_pairs


@app.route("/game", methods=["GET"])
def game_page() -> str:
    return render_template("game.html", data=json.dumps(request.args))
