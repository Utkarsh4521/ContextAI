import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.data.database import engine, Base
from app.domain.entities import ChatHistory 
from app.api.endpoints import chat, conversations

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FastAPI AI Chat",
    description="AI-powered chat API with conversation memory",
    version="1.0.0",
)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(conversations.router)

static_dir = os.path.join(os.path.dirname(__file__), "..", "static")

if os.path.exists(static_dir):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_react(full_path: str):
        """React SPA — tüm route'ları index.html'e yönlendir."""
        file_path = os.path.join(static_dir, full_path)
        if full_path and os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(static_dir, "index.html"))
