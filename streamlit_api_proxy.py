from flask import Flask, request, jsonify
from example_streamlit_app import CowBreedClassifier, CLASS_NAMES
from PIL import Image
import io
import torch

app = Flask(__name__)

# Allow React frontend (CORS)
from flask_cors import CORS
CORS(app, origins=["http://172.18.1.169:8080"])  # React dev server

# Load model once
classifier = CowBreedClassifier("cow_breed_model.pth", CLASS_NAMES)

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    image = Image.open(io.BytesIO(file.read())).convert("RGB")
    
    pred_class, confidence, top3_prob, top3_indices = classifier.predict(image)
    
    return jsonify({
        "predicted_class": pred_class,
        "confidence": confidence,
        "top3_prob": top3_prob.tolist(),
        "top3_indices": top3_indices.tolist()
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
