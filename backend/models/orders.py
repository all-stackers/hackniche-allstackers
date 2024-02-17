from mongo_engine import db
from pymongo.errors import DuplicateKeyError
from mongoengine import NotUniqueError

class Orders(db.Document):
    order_id = db.StringField(required=True)
    customer_name = db.StringField(required=True)
    order_name = db.StringField(required=True)
    date = db.StringField(required=True)
    time = db.StringField(required=True)
    amount = db.StringField(required=True)
    status = db.StringField(required=True)

    meta = {'collection': 'orders'}

    @classmethod
    def add_order(cls, args):
        try:
            order = cls(**args)
            order.save()
            return {"error": False, "data": order}
        
        except (DuplicateKeyError, NotUniqueError):
            return {"error": True, "message": "Order with same id already exists"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    @classmethod
    def get_orders(cls, ):
        try:
            orders = cls.objects()
            return {"error": False, "data": orders}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    @classmethod
    def update_order_status(cls, args):
        try:
            order = cls.objects(order_id=args["order_id"]).first()
            if not order:
                return {"error": True, "message": "Order not found"}
            
            order.update(status=args["status"])
            # return the updated orders list
            return {"error": False, "data": cls.objects()}
        
        except Exception as e:
            return {"error": True, "message": str(e)}

