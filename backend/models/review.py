from mongo_engine import db
from pymongo.errors import DuplicateKeyError
from mongoengine import NotUniqueError

class Review(db.Document):
    review_id = db.StringField(required=True)
    customer_name = db.StringField(required=True)
    review = db.StringField(required=True)
    rating = db.StringField(required=True)
    mobile_number = db.StringField(required=True)
    response = db.StringField()

    meta = {'collection': 'reviews'}

    @classmethod
    def add_review(cls, args):
        try:
            args["review_id"] = str(len(cls.objects()) + 1)
            review = cls(**args)
            review.save()
            return {"error": False, "data": review}
        
        except (DuplicateKeyError, NotUniqueError):
            return {"error": True, "message": "Review with same id already exists"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    @classmethod
    def get_reviews(cls, ):
        try:
            reviews = cls.objects()
            return {"error": False, "data": reviews}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    @classmethod
    def get_review_by_id(cls, review_id):
        try:
            review = cls.objects(review_id=review_id).first()
            return {"error": False, "data": review}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    @classmethod
    def update_review(cls, args):
        try:
            review = cls.objects(review_id=args["review_id"]).first()
            if not review:
                return {"error": True, "message": "Review not found"}
            
            review.update(review=args["review"], rating=args["rating"])
            return {"error": False, "data": cls.objects()}
        
        except Exception as e:
            return {"error": True, "message": str(e)}