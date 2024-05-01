import requests as r
import json
import os
import pprint

def send_request(image):
    res = r.post("http://localhost:3003/predict",
        files = { 'file' : open(image, "rb") }
    )

    pprint.pprint(res.text)

if __name__ == '__main__':
    send_request(os.path.join('.', 'example', '밥상.jpg'))