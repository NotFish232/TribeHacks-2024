from flask import Flask, render_template, request
import os

template_dir = os.path.abspath("./templates")
app = Flask(__name__, template_folder="./templates/", static_url_path="/static/")


@app.route("/", methods=["GET"])
def main_page() -> str:
    return render_template("index.html")


if __name__ == "__main__":
    app.run("127.0.0.1", 8080)
