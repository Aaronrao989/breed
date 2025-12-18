# 🐄 Bharat Pashudhan App

**AI-Powered Indian Cattle & Buffalo Breed Recognition**

🔗 **Live Demo:** [https://indianbreedclassifier.streamlit.app/](https://indianbreedclassifier.streamlit.app/)

---

## 📌 Overview

Bharat Pashudhan App is an AI-powered web application that identifies Indian cattle and buffalo breeds from images. Built with Deep Learning (CNN + Transfer Learning), it supports **20 major indigenous breeds** and delivers real-time predictions with confidence scores.

**Developed for Smart India Hackathon (SIH)** with focus on:
- Digital livestock management
- Breed authentication  
- Sustainable agriculture & dairy optimization

---

## 🎯 Problem Statement (SIH – PS 2504)

Accurate identification of Indian cattle and buffalo breeds is critical for breed conservation, milk yield estimation, government subsidy targeting, and informed farmer decision-making. Manual identification is error-prone and requires expert knowledge. **This solution automates breed recognition using image-based AI models.**

---

## 🚀 Key Features

- 🧠 **AI-Based Recognition** – CNN with MobileNetV2 transfer learning
- 🐄 **20 Indigenous Breeds** – Comprehensive coverage of Indian cattle & buffalo
- 📊 **Top-3 Predictions** – Confidence scores for informed decisions
- 🌱 **Professional Agro-Themed UI** – Green and dark color scheme
- 🇮🇳 **Bilingual Support** – Hindi + English interface
- ⚡ **Real-Time Inference** – Instant breed identification
- 📷 **Easy Upload** – JPG/PNG image support
- 🔍 **Grad-CAM Visualization** – Model interpretability (demo mode)

---

## 🧬 Supported Breeds

### Cattle (14 Breeds)
Bhadawari • Deoni • Gaolao • Gir • Hallikar • Hariana • Kankrej • Khillari • Krishna Valley • Ongole • Red Sindhi • Sahiwal • Tharparkar • Umblachery

### Buffalo (6 Breeds)
Jaffrabadi • Mehsana • Murrah • Nagpuri • Nili Ravi • Surti

---

## 🏗️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Model** | MobileNetV2 (Transfer Learning) |
| **Framework** | PyTorch |
| **Frontend** | Streamlit |
| **Visualization** | Matplotlib |
| **Deployment** | Streamlit Cloud |
| **Language** | Python 3.10 |

---

## 📂 Project Structure

```
Breed-Recognition-For-Cattles/
│
├── dataset/
│   ├── raw/                      # Breed-wise image folders (20 classes)
│   └── splits/                   # train.csv, val.csv, test.csv
│
├── notebooks/
│   ├── 01_data_exploration.ipynb
│   └── 02_model_training.ipynb
│
├── ml_core/
│   ├── best_model.pth            # Trained model weights
│   └── class_indices.json        # Breed label mappings
│
├── fonts/
│   └── NotoSansDevanagari-Regular.ttf
│
├── example_streamlit_app.py      # Main application
├── requirements.txt              # Dependencies
└── README.md                     # Documentation
```

---

## ▶️ Quick Start

### 1️⃣ Clone Repository
```bash
git clone https://github.com/aashnaachaudhary10/Breed-Recognition-For-Cattles.git
cd Breed-Recognition-For-Cattles
```

### 2️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Run Application
```bash
streamlit run example_streamlit_app.py
```

The app will open automatically in your browser at `http://localhost:8501`

---

## 📸 How It Works

1. **Upload** a clear cattle/buffalo image (JPG/PNG)
2. **Preprocessing** automatically resizes and normalizes the image
3. **CNN Model** predicts breed probabilities using transfer learning
4. **Results Display** shows:
   - Top predicted breed with confidence score
   - Top-3 alternative predictions
   - Visual confidence chart

---

## 🌱 Impact & Use Cases

| Stakeholder | Benefits |
|-------------|----------|
| 🧑‍🌾 **Farmers** | Breed identification, management decisions |
| 🏛️ **Government** | Policy implementation, subsidy verification |
| 🐄 **Dairy Industry** | Yield optimization, breeding programs |
| 🎓 **Researchers** | Conservation studies, genetic research |

---

## 🧭 Future Roadmap (SIH Finals)

- 📱 **Mobile App** – Android/iOS native applications
- 🧠 **Enhanced Models** – Vision Transformer (ViT) integration
- 🧬 **Milk Yield Prediction** – AI-based productivity forecasting
- 🛰️ **Offline Capability** – Edge AI deployment (Raspberry Pi)
- 📊 **Analytics Dashboard** – Comprehensive farmer insights
- 🐃 **Disease Detection** – Early health monitoring system

---

## 👨‍💻 Team

Developed by **SIH 2025 Team**  
Guided by faculty mentors  
Built with passion for AI + Agriculture 🇮🇳

---

## 📜 License

This project is developed for academic and hackathon purposes under **Smart India Hackathon 2025** guidelines.

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues or pull requests to improve the project.

---

## 📧 Contact

For queries or collaboration opportunities, please reach out through the repository issues page.

---

**⭐ If you find this project useful, please star the repository!**
