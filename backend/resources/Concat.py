from flask import Flask, request, jsonify, send_file
import base64
import cv2
import os
import requests
import cv2
import numpy as np
import urllib.request
from io import BytesIO
from PIL import Image
import cloudinary
import cloudinary.uploader
from pathlib import Path
import google.generativeai as genai
import json


url2 = "https://res.cloudinary.com/dtpsspvyf/image/upload/v1710039457/Screenshot_2024-03-10_081327_jlgsgm.png"
urllib.request.urlretrieve(url2, 'image2_path.jpg')
url1 = "https://res.cloudinary.com/dtpsspvyf/image/upload/v1710039458/Screenshot_2024-03-10_061330_aelloh.png"
urllib.request.urlretrieve(url1, 'image1_path.jpg')

app = Flask(__name__)

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
    final_response = {
            'error': False,
            'response': {
                'response': str(response),
                'stitched_image': uploaded_url
            }
        }

    return final_response

if __name__ == "__main__":
    app.run(debug=True)
