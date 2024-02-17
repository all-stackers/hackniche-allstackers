from flask_restful import Resource, request, reqparse
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import json

os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI")
llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.7)

shelf_life = {
    "milk": 3,
    "bread": 2,
    "butter": 5,
    "cheese": 7,
    "yogurt": 5,
    "egg": 7,
    "chicken": 2,
    "pizza dough": 2,
    "pasta": 3,
    "onion": 7,
    "tomato": 5,
}

class AskAI(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('food_item', type=str, required=True)
        parser.add_argument('bought_date', type=str, required=True)
        parser.add_argument('today_date', type=str, required=True)
        parser.add_argument('quantity', type=str, required=True)

        args = parser.parse_args()

        question_prompt = """
            I will provide you item name, bought date and quantity.

            You need to provide whether the item is expired, about to expire or fresh based on bought date and current date which is given in the input.

            input format:
            {{
                food_item: {food_item},
                bought_date: {bought_date},
                current_date: {today_date},
                quantity: {quantity}
                shelf_life: {shelf_life}
            }}

            output format:
            {{
                expired: true/false,
                about_to_expire: true/false,
                fresh: true/false
                solution: "Only if the item is about expire provide the solution orelse empty string. Consider the average self life of the given food item and calculate expiry from the bought date. In the solution you should suggest me the food items on which I should give discounts and use the food item. I don't sell raw items."
            }}

            Strictly no \n or \ or any other special characters are allowed. don't format your response in any other way.
        """

        response = llm.invoke(question_prompt.format(
            food_item=args["food_item"],
            bought_date=args["bought_date"],
            today_date=args["today_date"],
            quantity=args["quantity"],
            shelf_life=json.dumps(shelf_life)
        ))

        return {"error": False, "data": response.content}