import requests as r
import json
import os
import pprint

def send_request(image):
    res = r.post("http://capstone.includer.site/predict",
        files = { 'file' : open(image, "rb") }
    )

    pprint.pprint(json.loads(res.text))

if __name__ == '__main__':
    send_request(os.path.join('.', 'example', '밥상.jpg'))