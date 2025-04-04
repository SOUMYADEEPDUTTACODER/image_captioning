Flask Image Captioning App

This is a Flask-based Image Captioning Web App that generates captions for uploaded images using a deep learning model.

🚀 Features

Upload an image and get an AI-generated caption.

Uses a pre-trained ResNet50 model for feature extraction.

Integrates with a trained LSTM-based image captioning model.

Built with Flask (Python backend) and HTML, CSS, JavaScript (frontend).

📂 Project Structure

imagecaptioning/
├── backend/
│   ├── app.py  # Flask Backend
│   ├── model/
│   │   ├── caption_model.h5  # Trained Model
│   │   ├── tokenizer.pkl  # Tokenizer for Text Processing
│   ├── static/
│   │   ├── uploads/  # Stores Uploaded Images
│   ├── templates/
│   │   ├── index.html  # Frontend UI
├── README.md  # Documentation
├── requirements.txt  # Dependencies

🔧 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/YOUR_GITHUB_USERNAME/image-captioning-flask.git
cd image-captioning-flask/backend

2️⃣ Create a Virtual Environment (Optional but Recommended)

python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate  # On Windows

3️⃣ Install Dependencies

pip install -r requirements.txt

4️⃣ Run the Flask App

python app.py

The server will run at http://127.0.0.1:5000/.

🎨 Frontend (User Interface)

Upload an image.

The backend processes it and generates a caption.

The image and caption are displayed on the webpage.

🛠 Deployment (Optional)

To deploy on Heroku, AWS, or Render, follow these steps:

Create a Procfile with:

web: gunicorn app:app

Push code to GitHub.

Deploy using your preferred cloud platform.

🤝 Contributing

Feel free to fork this repository, create new features, and submit a pull request!


🌟 Acknowledgments

TensorFlow/Keras for Deep Learning

Flask for Backend

Bootstrap & JavaScript for UI

🚀 Enjoy Captioning! 🎉

