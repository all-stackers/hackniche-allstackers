from flask_restful import Resource, reqparse
from models.orders import Orders as OrderModel
import json
import datetime
from twilio.rest import Client
import random
from flask import request

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

            now = datetime.datetime.now()
            args["time"] = now.strftime("%I:%M:%S %p")

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
            
            updated_order_list = json.loads(response["data"].to_json())
            order = list(filter(lambda x: x["order_id"] == args["order_id"], updated_order_list))[0]
            print(order.get("order_name"))

            otp = random.randint(1000, 9999)
            message = f"Your order for {order.get('order_name')} has been confirmed. Show this OTP at the Food Truck: {otp}"
            
            if args['status'] == "pending":
                account_sid = 'AC9bfcbe0ba32fab4c09b5425fddceace8'
                auth_token = '17d8540e3563cbba37ba250ca16184e3'
                client = Client(account_sid, auth_token)

                message = client.messages.create(
                from_='whatsapp:+14155238886',
                body=message,
                to='whatsapp:+919004690126'
                )

                # pizza dough
                # pizza sauce
                # cheese
                # paneer
                # tomato
                
            
            return {"error": False, "data": json.loads(response["data"].to_json())}

        except Exception as e:
            return {"error": True, "message": str(e)}
        
class OrderStatus(Resource):
    def get(self):
        order_id = request.args.get('order_id')
        response = OrderModel.get_order_by_id(order_id)

        if response["error"]:
            return response
        
        status = response["data"]["status"]
        if status == "pending":
            return {"error": False, "data": True}
        
        return {"error": False, "data": False}