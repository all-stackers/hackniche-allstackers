from flask_restful import Resource, reqparse
from models.review import Review as ReviewModel
import json

class Review(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('review', type=str, required=True)
        parser.add_argument('rating', type=str, required=True)
        parser.add_argument('customer_name', type=str, required=True)
        parser.add_argument('mobile_number', type=str, required=True)

        args = parser.parse_args()

        response = ReviewModel.add_review(args)
        if response["error"]:
            return response
        
        return {"error": False, "message": "Review submitted successfully"}
    
    def get(self):
        response = ReviewModel.get_reviews()
        if response["error"]:
            return response
        
        return {"error": False, "data": json.loads(response["data"].to_json())}