import requests as r
import json
import os

def send_request(image):
    res = r.post("http://localhost:3000/predict",
        files = { 'file' : open(image, "rb") }
    )

    print(res.text)

if __name__ == '__main__':
    send_request(os.path.join('.', 'example', '밥상.jpg'))