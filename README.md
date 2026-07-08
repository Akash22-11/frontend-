<div align="center">

# 🌍 EcoVision AI
### *AI-Powered Environmental Monitoring & Pollution Detection Platform*

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.12-blue?style=for-the-badge&logo=python">
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql">
  <img src="https://img.shields.io/badge/YOLOv8-AI-red?style=for-the-badge">
</p>

<p align="center">
  <b>Detect Pollution • Predict AQI • Analyze Weather • AI Assistant</b>
</p>

---

### 🌱 Making Environmental Monitoring Smarter with Artificial Intelligence

</div>

---

# 📖 Overview

**EcoVision AI** is an AI-powered environmental monitoring platform that helps detect pollution sources, predict air quality, analyze weather conditions, and provide intelligent environmental insights.

The platform combines **Computer Vision**, **Machine Learning**, **Weather APIs**, and **Artificial Intelligence** to support smarter environmental monitoring and quicker decision-making.

---

# 🚀 Features

### 🤖 AI Pollution Detection
- Detects pollution sources from uploaded images
- YOLOv8-based object detection
- Bounding boxes with confidence scores

### 🌫 Air Quality Prediction
- Predicts Air Quality Index (AQI)
- Machine Learning based forecasting

### 🌦 Weather Integration
- Real-time weather information
- Temperature
- Humidity
- Wind Speed
- Environmental conditions

### 📊 Dashboard
- Pollution statistics
- AQI trends
- Environmental reports
- Pollution hotspot monitoring

### 💬 AI Assistant
- Environmental chatbot
- Pollution awareness
- AI-generated responses
- User guidance

### 🔒 Authentication
- JWT Authentication
- Secure Login
- User Registration

### 🏛 Municipality Reporting
- Report pollution incidents
- Track submitted reports

---

# 🛠 Technology Stack

## Frontend

- React.js
- HTML5
- CSS3
- JavaScript

## Backend

- FastAPI
- Python
- SQLAlchemy
- JWT Authentication

## Artificial Intelligence

- YOLOv8
- OpenCV
- Scikit-Learn
- NumPy
- Pandas

## Database

- PostgreSQL

## APIs

- OpenWeather API

## Deployment

- Render
- GitHub

---

# 🏗 Project Architecture

```
EcoVision AI
│
├── Frontend (React)
│      │
│      ├── Authentication
│      ├── Dashboard
│      ├── AI Chatbot
│      ├── Pollution Detection
│      └── Reports
│
├── Backend (FastAPI)
│      │
│      ├── Authentication API
│      ├── AI Detection API
│      ├── Weather API
│      ├── Prediction API
│      ├── Dashboard API
│      └── Municipality API
│
├── Machine Learning
│      │
│      ├── YOLOv8
│      ├── AQI Prediction
│      └── OpenCV
│
└── PostgreSQL Database
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/Akash22-11/ecovision.git

cd ecovision/backend
```

---

## Create Virtual Environment

```bash
python -m venv venv
```

Activate

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create a `.env` file

```env
APP_ENV=development

SECRET_KEY=your_secret_key

DATABASE_URL=your_database_url

OPENWEATHER_API_KEY=your_api_key
```

---

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

API Documentation

```
http://127.0.0.1:8000/docs
```

---

# 📂 API Endpoints

| Endpoint | Description |
|-----------|-------------|
| `/api/v1/login` | User Login |
| `/api/v1/register` | User Registration |
| `/api/v1/weather` | Weather Information |
| `/api/v1/prediction` | AQI Prediction |
| `/api/v1/dashboard` | Dashboard Data |
| `/api/v1/reports` | Pollution Reports |
| `/api/v1/ask` | AI Chatbot |

---

# 📸 Screenshots

> Add screenshots here

```
Dashboard Screenshot

Pollution Detection

AI Chatbot

Weather Page
```

---

# 🌍 Future Enhancements

- Live CCTV Pollution Detection
- Drone Image Analysis
- Mobile Application
- Satellite Image Processing
- Smart City Integration
- Push Notifications
- Advanced AI Assistant
- Real-time AQI Mapping

---

# 🎯 Project Goals

✔ Detect Pollution Automatically

✔ Predict Air Quality

✔ Environmental Awareness

✔ AI-powered Decision Support

✔ Smart Environmental Monitoring

---

# 👨‍💻 Developer

### Akash

GitHub

https://github.com/Akash22-11

---

# ⭐ Support

If you like this project,

⭐ Star this repository

🍴 Fork the repository

🤝 Contribute to improve EcoVision AI

---

<div align="center">

## 🌿 "AI for a Cleaner Tomorrow"

Made with ❤️ using FastAPI • React • YOLOv8 • Machine Learning

</div>
