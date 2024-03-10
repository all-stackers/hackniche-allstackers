from flask_restful import Resource, request
from llms.geminiProVision import generate_gemini_response
from io import BytesIO
import json

class Towels(Resource):
    def post(self):
        image = request.files['image']
        # text = request.form['text']

        input = """
            Act as Room cleaner expert and tell me the number of towels present in the image.
        """

        question = """
            Tell the number of towels present in the image?
            

            output should be strictly in the json format as below.

            [
            {
             "Towels":"2"
            }
           
            ]
            Strictly no \n or \ or any other special characters are allowed. don't format your response in any other way.
        """

        image_content = BytesIO(image.read())
        # question = question.format(text=text)
        response = generate_gemini_response(input_prompt=input, image=image_content, question_prompt=question)
        print("towel response",response)

        return {"error": False,"data": json.loads(response)}
    

class MiniBar(Resource):
    def post(self):
        image = request.files['image']

        input = """
            I will give you the image of MiniBar present in the Hotels tell me the items present in the image that are related to the minibar only.
        """

        question = """
            I am a Hotel room attendant ,tell me the items present in the the minibar image given to you
            output format: 
            ["Coke","Pepsi","Tea Packets","Coffee"]
            Strictly no \n or \ or any other special characters are allowed. don't format your response in any way.
        """

        image_content = BytesIO(image.read())
        response = generate_gemini_response(input_prompt=input, image=image_content, question_prompt=question)
        print(response)

        return {"error": False, "data": json.loads(response)}


class Toilet(Resource):
    def post(self):
        image = request.files['image']

        input = """
            I will give you the image of Toilet Accessories present in the Hotels Toilet tell me if it contains Toothbrush, Shampoo,Soap.
        """

        question = """
            I am a Hotel room attendant ,tell me if the image contains Toothbrush, Shampoo,Soap.
            output format: 
            [
                {{"Toothbrush": "False"}},
                {{"Shampoo": "True"}},
                {{"Soap": "True"}},
            ]
            
            Strictly no \n or \ or any other special characters are allowed. don't format your response in any way.
        """

        image_content = BytesIO(image.read())
        response = generate_gemini_response(input_prompt=input, image=image_content, question_prompt=question)
        print(response)

        return {"error": False, "data": json.loads(response)}
    

class Damaged(Resource):
    def post(self):
        image = request.files['image']

        input = """
            I will give you the image of a Hotel Room,Toilet you have to tell me items present in the given image,also it should detect any broken thing or item is present in the room, also give the replacement cost of that broken image.
        """

        question = """
            I am a room attendant tell me the items present in the room/Toilet also tell if some broken item is present and if broken item is present then also give replacement cost of it.
            Strictly damage should be detected if the object has caused a serious broke.
            output format :
            
            [
                {{"items": []}},
                {{"isAnythingBroken": ""}},
                {{"brokenObjects": []}},
                {{"cost": ""}},
            ]
            
            
            Strictly no \n or \ or any other special characters are allowed. don't format your response in any way.
        """

        image_content = BytesIO(image.read())
        response = generate_gemini_response(input_prompt=input, image=image_content, question_prompt=question)
        print(response)

        return {"error": False, "data": json.loads(response)}
    
class Check(Resource):
    def post(self):
        image = request.files['image']

        input = """
           You are tasked with analyzing an image of a room or toilet to determine if it contains any serious damage or broken objects. You should provide a response based on the condition of the image.
        """

        question = """
            You are tasked with analyzing an image of a room or toilet to determine if it contains any serious damage or broken objects. You should provide a response based on the condition of the image.

            Conditions:

            If the image depicts the room/toilet in proper condition without any serious damage or broken objects, respond with:

            [ {"status":"ok"}]

            If the image shows signs of serious damage such as broken walls, stains on walls, bed, floor, etc., indicate danger with:

            [{"status":"damaged"}]

            output format :
            [
                {"status":""}
                ]
            
            
            Strictly no \n or \ or any other special characters are allowed. don't format your response in any way.
        """

        image_content = BytesIO(image.read())
        response = generate_gemini_response(input_prompt=input, image=image_content, question_prompt=question)
        print(response)

        return {"error": False, "data": json.loads(response)}