from mongo_engine import db
from pymongo.errors import DuplicateKeyError
from mongoengine import NotUniqueError

class User(db.Document):
    name = db.StringField(required=True)
    # age = db.IntField(required=True)
    # gender = db.StringField(required=True)
    mobile_number = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)

    meta = {'collection': 'users'}

    @classmethod
    def add_user(cls, args):
        try:
            user = cls(**args)
            user.save()
            return {"error": False, "data": user}
        
        except (DuplicateKeyError, NotUniqueError):
            return {"error": True, "message": "User with same mobile already exists"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}

    @classmethod
    def get_user_by_mobile_number(cls, mobile_number):
        try:
            user = cls.objects.get(mobile_number=mobile_number)
            return {"error": False, "data": user}
        
        except cls.DoesNotExist:
            return {"error": True, "message": "User does not exist"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}