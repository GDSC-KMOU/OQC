from fastapi import FastAPI, Request, Form, File, UploadFile
from fastapi.responses import HTMLResponse
from PIL import Image
from io import BytesIO
import uvicorn
import torch

app = FastAPI()

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
model = torch.hub.load("WongKinYiu/yolov7", "custom", "best.pt", trust_repo = True)

@app.get("/")
def read_root():
    return "FastAPI"

@app.post("/predict")
async def process_home_form(file = File(...)):
    results = model(Image.open(BytesIO(await file.read())))
    json_results = results_to_json(results, model)

    return json_results

def results_to_json(results, model):
    return [
        [
            {
                "class": int(pred[5]),
                "class_name": model.model.names[int(pred[5])],
                "bbox": [int(x) for x in pred[:4].tolist()], # convert bbox results to int from float
                "confidence": float(pred[4]),
            } for pred in result
        ] for result in results.xyxy
    ]

if __name__ == '__main__':
    uvicorn.run(
        app = app,
        host = '0.0.0.0', 
        port = 3003
    )