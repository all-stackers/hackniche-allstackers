from flask_restful import Resource, request, reqparse
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import json

os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI")
llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.7)

class LegalConsultant(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('question', type=str, required=True)

        args = parser.parse_args()

        question_prompt = """
            I am a food truck owner. I want a legal consultant to help me with and legal queries/harassment I face from the police or any persons.
            Suppose some police person is not allowing me to park my food truck in a particular place. I want to know what are my rights and what I can do in such situations.

            input format:
            {{
                question: {question}
            }}

            output format: direct answer:
            The answer for the question you provided.

            Strictly no \n or \ or any other special characters are allowed. don't format your response in any other way.
        """

        response = llm.invoke(question_prompt.format(
            question=args["question"]
        ))
        print(response.content)
        response = response.content

        return {"error": False, "data": response}