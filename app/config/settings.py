import os

# --- App Settings ---
# Saare configuration values ek hi jagah par hain.

# PostgreSQL
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:5353@localhost:5432/fastapi_chat"
)

# OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
AI_MODEL = "gpt-4o-mini"

# JWT
JWT_SECRET_KEY = "a-string-secret-at-least-256-bits-long"
JWT_ALGORITHM = "HS256"

# Rate Limiting
RATE_LIMIT_AUTH = 5       # Authenticated user ke liye: 5 requests/min
RATE_LIMIT_ANON = 3       # Anonymous user ke liye: 3 requests/min
RATE_LIMIT_WINDOW = 60    # Time window (seconds mein)
