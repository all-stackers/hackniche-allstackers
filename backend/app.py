from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request
from flask_restful import Api
from mongo_engine import db
from flask_cors import CORS
import os

from resources.foodtruck import (FoodTruck, Menu, UploadImage, Inventory, UpdateInventory)
from resources.orders import (Orders, UpdateOrderStatus, OrderStatus, OrderStatus2)
from resources.Post import (Hashtags, Caption)
from resources.Cloudinary import Cloudinary
from resources.AskAI import AskAI
from resources.Notification import Notification
from resources.LegalConsultant import LegalConsultant
from resources.review import Review
from resources.Inventory import (Towels, MiniBar,Toilet,Damaged,Check)
import requests
import json
import time


import cv2
import os
import requests
import numpy as np
import urllib.request
from PIL import Image
import cloudinary
import cloudinary.uploader
from pathlib import Path
import google.generativeai as genai

app = Flask(__name__)
api = Api(app)
CORS(app)

app.config["MONGODB_HOST"] = os.getenv("FLASK_MONGODB_URI")
db.init_app(app)

# APIs
api.add_resource(FoodTruck, "/foodtruck")
api.add_resource(Menu, "/menu")
api.add_resource(UploadImage, "/uploadMenuImage")
api.add_resource(Inventory, "/addToInventory")
api.add_resource(UpdateInventory, "/updateInventory")
api.add_resource(Orders, "/orders")
api.add_resource(UpdateOrderStatus, "/updateOrderStatus")
api.add_resource(Hashtags, "/hashtag")
api.add_resource(Caption, "/caption")
api.add_resource(Cloudinary, "/cloudinary")
api.add_resource(AskAI, "/askAI")
api.add_resource(Notification, '/notification')
api.add_resource(OrderStatus, '/getorderstatus')
api.add_resource(OrderStatus2, '/getorderstatus2')
api.add_resource(LegalConsultant, '/legalconsultant')
api.add_resource(Review, "/review")
api.add_resource(Towels, "/towels")
api.add_resource(MiniBar, "/minibar")
api.add_resource(Toilet, "/toilet")
api.add_resource(Damaged, "/damaged")
api.add_resource(Check, "/check")


# post on instagram

url2 = "https://res.cloudinary.com/dtpsspvyf/image/upload/v1710039457/Screenshot_2024-03-10_081327_jlgsgm.png"
urllib.request.urlretrieve(url2, 'image2_path.jpg')
url1 = "https://res.cloudinary.com/dtpsspvyf/image/upload/v1710039458/Screenshot_2024-03-10_061330_aelloh.png"
urllib.request.urlretrieve(url1, 'image1_path.jpg')

def prompt():
    genai.configure(api_key="AIzaSyD_5bcjjGmnFVwip-_LN4CvNkeFzLWQxQo")
    generation_config = {
      "temperature": 0.4,
      "top_p": 1,
      "top_k": 32,
      "max_output_tokens": 4096,
    }
    safety_settings = [
      {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
    ]
    model = genai.GenerativeModel(model_name="gemini-1.0-pro-vision-latest",
                                  generation_config=generation_config,
                                  safety_settings=safety_settings)
    if not (img := Path("new.jpg")).exists():
      raise FileNotFoundError(f"Could not find image: {img}")
    image_parts = [
      {
        "mime_type": "image/jpeg",
        "data": Path("new.jpg").read_bytes()
      },
    ]
    prompt_parts = [
        '''
        You are an image analyser focused towards F&B Buisnesses. Analyse images of rooms and understand the tidiness of the room. Check cleanliness and rate it between 1 to 5 (lowest to highest), if anything is broken - Mention what is broken and give an approximate cost of replacement for the same. 
        Give a rating of the image and staff responsible.
        Strictly return the response in the form of 
        {
          "object-1":Score-1,
          "object-2":Score-2
        }
        {
          "cost of replacment" : cost
        }
        ''',
      image_parts[0],
      "\n",
    ]
    response = model.generate_content(prompt_parts)
    return response.text

def stitch_images(image1, image2):
    img1 = cv2.imread(image1)
    img2 = cv2.imread(image2)
    if img1 is None or img2 is None:
        print("Error: Unable to read images.")
        return None
    min_height = min(img1.shape[0], img2.shape[0])
    img1 = img1[:min_height, :]
    img2 = img2[:min_height, :]
    stitched_image = np.concatenate((img1, img2), axis=1)
    cv2.imwrite("new.jpg", stitched_image)
    return stitched_image

headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

cloudinary.config(
    cloud_name="dcwwcwkvu",
    api_key="363672271215785",
    api_secret="Oba71bEe-7fmwIgjugIe3qDZsDY"
)
def upload_to_cloudinary(image_path):
    try:
        # Upload image to Cloudinary
        upload_result = cloudinary.uploader.upload(image_path)

        # Access the URL of the uploaded image
        image_url = upload_result["url"]

        return image_url
    except Exception as e:
        print(f"Error uploading image to Cloudinary: {e}")
        return None

data = {
    1:'https://res.cloudinary.com/dtpsspvyf/image/upload/v1710039457/Screenshot_2024-03-10_080606_kat8m3.png',
    2:'https://res.cloudinary.com/dtpsspvyf/image/upload/v1710039457/Screenshot_2024-03-10_081327_jlgsgm.png',
    3:'https://res.cloudinary.com/dtpsspvyf/image/upload/v1710039456/Screenshot_2024-03-10_080635_ti0gon.png',
    4:'https://res.cloudinary.com/dtpsspvyf/image/upload/v1710039457/Screenshot_2024-03-10_080726_mbe9yc.png'
      }

@app.route("/process_image", methods=["POST"])
def process_image():
    integer_value = int(request.form['room_number'])
    url1 = data[integer_value]
    urllib.request.urlretrieve(url1, 'image1_path.jpg')
    image_blob = request.files['image']
    print(image_blob)
    # image_data = base64.b64decode(image_blob)
    # img = Image.open(BytesIO(image_data))
    image_blob.save("image2_path.jpg")
    result = stitch_images("image1_path.jpg", "image2_path.jpg")
    uploaded_url = upload_to_cloudinary("new.jpg")
    response = prompt()
    print(response)
    response_data = json.loads(response)
    final_response = {
            'error': False,
            'response': {
                'response': response_data,
                'stitched_image': uploaded_url
            }
        }

    return final_response


def upload_media(media_url, media_type, access_token, insta_user_id, caption):
    post_url = "https://graph.facebook.com/v19.0/{}/media".format(insta_user_id)
    
    payload = {
        'media_type': media_type,
        'caption': caption
    }

    if media_type == 'IMAGE':
        payload['image_url'] = media_url
    elif media_type == 'REELS':
        payload['video_url'] = media_url
    else:
        print("Invalid media type. Supported types are 'IMAGE' and 'REELS'.")
        return None
    
    

    r = requests.post(post_url, params={'access_token': access_token}, data=payload)

    try:
        result = r.json()
        print(result)
        return result
    except json.decoder.JSONDecodeError:
        print("Error decoding JSON. Response might not be in JSON format.")
        print("HTTP Status Code:", r.status_code)
        print("Response Text:", r.text)

        try:
            html_response = r.text
            print("HTML Response:", html_response)
        except Exception as e:
            print("Error parsing HTML response:", str(e))

        return None

def status_code(ig_container_id, access_token):
    graph_url = "https://graph.facebook.com/v19.0/{}/".format(ig_container_id)
    params = {
        'access_token': access_token,
        'fields': 'status_code'
    }
    response = requests.get(graph_url, params=params)

    try:
        response_json = response.json()
        return response_json['status_code']
    except json.decoder.JSONDecodeError:
        print("Error decoding JSON. Response might not be in JSON format.")
        print("HTTP Status Code:", response.status_code)
        print("Response Text:", response.text)
        return None
def publish_media(results, access_token, insta_user_id):
    if results and 'id' in results:
        creation_id = results['id']
        second_url = "https://graph.facebook.com/v19.0/{}/media_publish".format(insta_user_id)
        second_payload = {
            'creation_id': creation_id,
            'access_token': access_token,
        }
        r = requests.post(second_url, data=second_payload)
        print(r.text)
        print('Media published to Instagram')
    else:
        print("Media posting not possible")

@app.route('/instagramUpload', methods=['POST'])
def upload():
    data = request.json

    media_type = data.get('media_type', '').upper()
    media_url = data.get('media_url', '')
    access_token = 'EAALwZACV0gEoBOZBRygjeUNQrzO14vWLQc8J94nfstuPIuFwdHGBLZCBbSZCMDVrZCgdeoC74nx5RUIMkI4eZAHErZBB2Ruek1ZBKJa4gkQstfXizugZCZCi2LniGHMqceBOX80TXE3dd1VGUZASSmUZCFG0g5NqBiMhkMk5TVmR9uHoNcmkbo6AXsxOZAdA2BG8tuH5G'
    insta_user_id ='17841464682383816'
    caption = data.get('caption', '')

    if not media_type or not media_url or not access_token or not insta_user_id:
        return jsonify({'error': 'Missing required parameters'}), 400

    results = upload_media(media_url, media_type, access_token, insta_user_id, caption)

    if results is not None:
        time.sleep(10)
        ig_container_id = results.get('id')
        if ig_container_id:
            s = status_code(ig_container_id, access_token)
            if s == 'FINISHED':
                publish_media(results, access_token, insta_user_id)
                return jsonify({'status': 'success', 'message': 'Media uploaded and published successfully'})
            else:
                time.sleep(60)
                publish_media(results, access_token, insta_user_id)
                return jsonify({'status': 'success', 'message': 'Media uploaded successfully. Still waiting for publishing'})
        else:
            return jsonify({'error': 'Error uploading media. Please check your request'}), 500
    else:
        return jsonify({'error': 'Error uploading media. Please check your request'}), 500



if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000)