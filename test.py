import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

try:
    client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents="Say Hello"
    )
    print("SUCCESS:", response.text)
except Exception as e:
    print("FAILED:", e)