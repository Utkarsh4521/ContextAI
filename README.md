# 🚀 FastAPI React Chat: Full-Stack AI Assistant


A powerful, full-stack AI Chat application built to master modern web development technologies. This project seamlessly integrates a high-performance **FastAPI** backend with a dynamic **React** frontend, utilizing **PostgreSQL** for robust data persistence and **OpenAI** for intelligent responses.

Designed with **N-Layer Architecture**, this project serves as a comprehensive example of building scalable, maintainable, and production-ready software systems.

---
## ✨ Key Features & Upgrades
* **Intelligent Conversation:** Context-aware responses using the OpenAI API.
* **Database Persistence:** Real-time saving and fetching of chat sessions using SQLAlchemy (ORM) and PostgreSQL.
* **Custom Chat Export :** Engineered a client-side Blob generation mechanism allowing users to download their active chat transcripts as `.txt` files directly from the browser.
* **Decoupled Architecture:** Clean separation of concerns between the API, Service, Data, and Domain layers.
* **Responsive UI:** Custom React hooks for dynamic layout adjustments across desktop and mobile devices.

---

## 🛠️ Technology Stack

| Component       | Technology                          |
| :-------------- | :---------------------------------- |
| **Backend**     | Python, FastAPI, Uvicorn, SQLAlchemy |
| **Frontend**    | React, Vite, JavaScript, CSS3       |
| **Database**    | PostgreSQL                          |
| **AI Engine**   | gemini api                          |
| **Tools**       | Git, Docker (Optional)     |

---
## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js & npm (for frontend development)
- PostgreSQL installed and running

### One-Click Launch (Recommended)
This project includes a smart startup script `baslat.bat` 
1.  Sets up the environment.
2.  Starts the generic Uvicorn server.
3.  Launches the application in your browser (`http://localhost:8000`).


## 📂 Project Structure

```
fastapi-react-chat/
├── app/                  # Backend Application (N-Layer Architecture)
│   ├── api/              # API Layer (Endpoints & Schemas)
│   ├── auth/             # Authentication (JWT & Rate Limiting)
│   ├── config/           # Configuration Settings
│   ├── data/             # Data Access Layer (DAO & Database Connection)
│   ├── domain/           # Domain Entities & Models
│   ├── infra/            # Infrastructure (OpenAI Client)
│   ├── service/          # Business Logic Layer
│   └── main.py           # Application Entry Point
├── frontend/             # React Frontend
│   ├── src/              # Components, Hooks, & Styles
│   └── index.html        # Entry HTML
├── static/               # Compiled Frontend Assets
├── docs/                 # Documentation Images
├── requirements.txt      # Python Dependencies
└── README.md             # Project Documentation
```


## 🏗️ Architecture Design (N-Layer)
The backend is structured for enterprise scalability:
1. **API Layer:** Handles HTTP routing, input validation, and endpoints.
2. **Service Layer:** Contains core business logic and AI integration rules.
3. **Data/DAO Layer:** Manages database interactions safely.
4. **Domain Layer:** Defines Pydantic schemas and database models.
