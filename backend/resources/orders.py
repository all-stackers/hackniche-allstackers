from flask_restful import Resource, reqparse
from models.orders import Orders as OrderModel
import json
import datetime

class Orders(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('customer_name', type=str, required=True)
            parser.add_argument('order_name', type=str, required=True)
            parser.add_argument('amount', type=str, required=True)

            args = parser.parse_args()

            args["order_id"] = "AAKF" + str(len(OrderModel.objects) + 1)
            args["status"] = "received"

            # take current time in the format HH:MM:SS AM/PM and add it to args
            now = datetime.datetime.now()
            args["time"] = now.strftime("%I:%M:%S %p")

            # take the current date int the format 17 Feb, 2024 and add it to args
            args["date"] = now.strftime("%d %b, %Y")

            response = OrderModel.add_order(args)
            if response["error"]:
                return response
            
            return {"error": False, "data": json.loads(response["data"].to_json())}

        except Exception as e:
            return {"error": True, "message": str(e)}
        
    def get(self):
        try:
            response = OrderModel.get_orders()
            if response["error"]:
                return response
            
            return {"error": False, "data": json.loads(response["data"].to_json())}

        except Exception as e:
            return {"error": True, "message": str(e)}
        
class UpdateOrderStatus(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('order_id', type=str, required=True)
            parser.add_argument('status', type=str, required=True)

            args = parser.parse_args()

            response = OrderModel.update_order_status(args)
            if response["error"]:
                return response
            
            return {"error": False, "data": json.loads(response["data"].to_json())}

        except Exception as e:
            return {"error": True, "message": str(e)}