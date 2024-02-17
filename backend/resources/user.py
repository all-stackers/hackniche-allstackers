from flask_restful import Resource, reqparse
import json

class User(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, required=True, help="Name is required")
        parser.add_argument("mobile_number", type=str, required=True, help="Mobile number is required")
        parser.add_argument("password", type=str, required=True, help="Password is required")

        args = parser.parse_args()

        response = User.add_user(args)
        if response["error"]:
            return response
        
        user = response["data"]
        
        return {"error": False, "data": json.loads(user.to_json())}