from mongo_engine import db
from pymongo.errors import DuplicateKeyError
from mongoengine import NotUniqueError

class FoodTruck(db.Document):
    food_truck_name = db.StringField(required=True)
    mobile_number = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)
    inventory = db.ListField(db.DictField())
    menu = db.ListField(db.DictField())

    meta = {'collection': 'foodtrucks'}

    @classmethod
    def add_foodtruck(cls, args):
        try:
            foodtruck = cls(**args)
            foodtruck.save()
            return {"error": False, "data": foodtruck}
        
        except (DuplicateKeyError, NotUniqueError):
            return {"error": True, "message": "Foodtruck with same mobile already exists"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}

    @classmethod
    def get_foodtruck(cls, mobile_number):
        try:
            foodtruck = cls.objects(mobile_number=mobile_number).first()
            return {"error": False, "data": foodtruck}
        
        except Exception as e:
            return {"error": True, "message": str(e)}

    @classmethod
    def add_to_menu(cls, mobile_number, menu_item):
        try:
            foodtruck = cls.objects(mobile_number=mobile_number).first()
            foodtruck.menu.append(menu_item)
            foodtruck.save()
            return {"error": False, "data": foodtruck}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    @classmethod
    def add_to_inventory(cls, mobile_number, inventory_item):
        try:
            foodtruck = cls.objects(mobile_number=mobile_number).first()
            inventory_item["id"] = str(len(foodtruck.inventory) + 1)
            foodtruck.inventory.append(inventory_item)
            foodtruck.save()
            return {"error": False, "data": foodtruck}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    @classmethod
    def update_inventory(cls, mobile_number, item_id, quantity):
        try:
            foodtruck = cls.objects(mobile_number=mobile_number).first()
            for item in foodtruck.inventory:
                if item["id"] == item_id:
                    item["quantity"] = quantity
                    break
            foodtruck.save()
            return {"error": False, "data": foodtruck}
        
        except Exception as e:
            return {"error": True, "message": str(e)}