from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request
from flask_restful import Api
from mongo_engine import db
from flask_cors import CORS
import os

app = Flask(__name__)
api = Api(app)
CORS(app)

app.config["MONGODB_HOST"] = os.getenv("FLASK_MONGODB_URI")
db.init_app(app)

# APIs


if __name__ == "__main__":
    app.run(debug=True)