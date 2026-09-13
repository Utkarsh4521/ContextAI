# 🤖 ContextAI: Full-Stack Chatbot

A full-stack AI Chat application built for my 4th-year project. It uses a **FastAPI** backend with a **React** frontend, and stores chat history in a **PostgreSQL** database. The AI responses are powered by the **Gemini API**.

---
## ✨ Features
* **AI Conversation:** Chat with an intelligent assistant using the Gemini API.
* **Database Storage:** Saves chat sessions locally using SQLAlchemy and PostgreSQL.
* **Export Chat:** Download your current chat history as a .txt file.
* **Modern UI:** A clean, dark-themed responsive React frontend.
* **History Management:** Hover over any past conversation in the sidebar to delete it.

---
## 🛠️ Technology Stack
* **Backend:** Python, FastAPI, Uvicorn, SQLAlchemy
* **Frontend:** React, Vite, CSS
* **Database:** PostgreSQL
* **AI Engine:** Google Gemini API

---
## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js (for frontend setup)
- PostgreSQL installed and running

### Running the Project
1. Open terminal in the `chatbot` folder.
2. Activate the virtual environment: `env\Scripts\activate`
3. Start the backend server: `python -m uvicorn app.main:app --reload`
4. Open your browser and go to `http://localhost:8000`

---
## 📂 Project Structure

```text
chatbot/
├── app/                  # Backend Application
│   ├── api/              # API Endpoints
│   ├── auth/             # Authentication logic
│   ├── config/           # App Settings
│   ├── data/             # Database Connection & DAO
│   ├── domain/           # Database Models
│   ├── infra/            # Gemini API Client
│   ├── service/          # Core logic
│   └── main.py           # Main Entry Point
├── frontend/             # React Frontend
│   ├── src/              # Components & Styles
│   └── index.html        # Entry HTML
├── requirements.txt      # Python Dependencies
└── README.md             # Project Documentation
```