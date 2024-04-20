from flask import Flask, render_template, request
import json
import os

template_dir = os.path.abspath("./templates")
app = Flask(__name__, template_folder="../templates/", static_folder="../static/")


@app.route("/", methods=["GET"])
def main_page() -> str:
    return render_template("index.html")

@app.route("/game", methods=["GET"])
def game_page() -> str:
    j = json.load(open("demo.json"))
    return render_template("game.html", data=j)


if __name__ == "__main__":
    app.run("127.0.0.1", 8080)
