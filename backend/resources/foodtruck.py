from flask_restful import Resource, reqparse
from models.foodtruck import FoodTruck as FoodTruckModel
import json
from flask import request
import cloudinary.uploader
import cloudinary
from llms.geminiProVision import generate_gemini_response

class FoodTruck(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('food_truck_name', type=str, required=True)
        parser.add_argument('mobile_number', type=str, required=True)
        parser.add_argument('password', type=str, required=True)

        args = parser.parse_args()

        response = FoodTruckModel.add_foodtruck(args)
        if response["error"]:
            return {"message": response["message"]}, 400
        
        data = response["data"].to_json()

        return {"error": False, "data": json.loads(data)}
    
    def get(self):
        # get the mobile number from url params
        mobile_number = request.args.get('mobile_number')

        response = FoodTruckModel.get_foodtruck(mobile_number)
        if response["error"]:
            return {"message": response["message"]}, 400
        
        data = response["data"].to_json()

        return {"error": False, "data": json.loads(data)}
    
class Menu(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mobile_number', type=str, required=True)
        parser.add_argument('photos', type=list, location="json", required=True, help="This field cannot be left blank!")
        parser.add_argument('food_name', type=str, required=True)
        parser.add_argument('description', type=str, required=True)
        parser.add_argument('health_metrics', type=dict, location="json", required=True, help="This field cannot be left blank!")
        parser.add_argument('category', type=list, location="json", required=True)
        parser.add_argument('price', type=float, required=True)
        args = parser.parse_args()

        menu_item = {
            "photos": args['photos'],
            "food_name": args['food_name'],
            "description": args['description'],
            "health_metrics": args['health_metrics'],
            "category": args['category'],
            "price": args['price']
        }

        response = FoodTruckModel.add_to_menu(args['mobile_number'], menu_item)
        if response["error"]:
            return {"message": response["message"]}, 400
        
        data = response["data"].to_json()

        return {"error": False, "data": json.loads(data)}



        # cloudinary.config(cloud_name ="dcwwcwkvu", api_key="363672271215785", api_secret="Oba71bEe-7fmwIgjugIe3qDZsDY")
        # upload_result = cloudinary.uploader.upload(image)
        # image_url = upload_result['secure_url']

        # return {"error": False, "data": image_url}

class UploadImage(Resource):
    def post(self):
        image = request.files['image']

        cloudinary.config(cloud_name ="dcwwcwkvu", api_key="363672271215785", api_secret="Oba71bEe-7fmwIgjugIe3qDZsDY")
        upload_result = cloudinary.uploader.upload(image)
        image_url = upload_result['secure_url']

        input_prompt = "Act as an expert chef who is describing the dish to a customer."
        question_prompt = """
            Analyse the photo i have provided and give me the following details in the format given below. No additional details are required.
        
            output format: 
            {
                "food_name": "",
                "description": "",
                "health_metrics": {
                    "calories": "",
                    "protein": "",
                    "fat": "",
                    "carbs": ""
                },
                "category": [
                    "jain",
                    "veg",
                    ...
                ]
            }
            strictly no intro/outro or heading.
        """

        response = generate_gemini_response(input_prompt, image, question_prompt)
        print(response)
        food_details = json.loads(response)

        data = {
            "photo": image_url,
            "food_details": food_details
        }

        return {"error": False, "data": data}
    
class Inventory(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mobile_number', type=str, required=True)
        parser.add_argument("name", type=str, required=True)
        parser.add_argument('photo', type=str, required=True)
        parser.add_argument('quantity', type=str, required=True)
        parser.add_argument('last_updated', type=str, required=True)

        args = parser.parse_args()

        inventory_item = {
            "name": args['name'],
            "photo": args['photo'],
            "quantity": args['quantity'],
            "last_updated": args['last_updated']
        }

        response = FoodTruckModel.add_to_inventory(args['mobile_number'], inventory_item)
        if response["error"]:
            return {"message": response["message"]}, 400
        
        data = response["data"].to_json()

        return {"error": False, "data": json.loads(data)}

class UpdateInventory(Resource):
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument('mobile_number', type=str, required=True)
        parser.add_argument("id", type=str, required=True)
        parser.add_argument('quantity', type=str, required=True)

        args = parser.parse_args()

        response = FoodTruckModel.update_inventory(args['mobile_number'], args['id'], args['quantity'])
        if response["error"]:
            return {"message": response["message"]}, 400
        
        data = response["data"].to_json()

        return {"error": False, "data": json.loads(data)}