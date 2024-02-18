from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request
from flask_restful import Api
from mongo_engine import db
from flask_cors import CORS
import os

from resources.foodtruck import (FoodTruck, Menu, UploadImage, Inventory, UpdateInventory)

app = Flask(__name__)
api = Api(app)
CORS(app)

app.config["MONGODB_HOST"] = os.getenv("FLASK_MONGODB_URI")
db.init_app(app)

# APIs
api.add_resource(FoodTruck, "/foodtruck")
api.add_resource(Menu, "/menu")
api.add_resource(UploadImage, "/uploadMenuImage")
api.add_resource(Inventory, "/addToInventory")
api.add_resource(UpdateInventory, "/updateInventory")

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000)