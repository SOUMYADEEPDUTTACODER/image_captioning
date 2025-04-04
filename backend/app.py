# app.py
import os
import numpy as np
import tensorflow as tf
import pickle
from flask import Flask, request, jsonify, render_template
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.preprocessing.image import load_img, img_to_array

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load Model & Tokenizer
model = tf.keras.models.load_model("model/captionmodel.h5", compile=False)
with open("model/tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

resnet = ResNet50(weights="imagenet", include_top=False, pooling="avg")

def extract_features(image_path):
    img = load_img(image_path, target_size=(224, 224))
    img = img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img)
    return resnet.predict(img, verbose=0)

def generate_caption(image_features, max_length=20):
    caption = "startseq"
    for _ in range(max_length):
        seq = tokenizer.texts_to_sequences([caption])[0]
        seq = pad_sequences([seq], maxlen=max_length)
        y_pred = model.predict([image_features, seq], verbose=0)
        word_index = np.argmax(y_pred)
        word = [w for w, i in tokenizer.word_index.items() if i == word_index]
        if not word:
            break
        caption += " " + word[0]
        if word[0] == "endseq":
            break
    return caption.replace("startseq", "").replace("endseq", "").strip()

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files["file"]
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(filepath)
        features = extract_features(filepath)
        caption = generate_caption(features)
        return jsonify({
            "caption": caption,
            "image_url": filepath
        })
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
#do the chnages See if it works