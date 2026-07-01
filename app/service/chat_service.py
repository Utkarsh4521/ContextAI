import uuid
from sqlalchemy.orm import Session
from app.data.dao import chat_dao
from app.infra.ai_client import Gemai, AIChatMessage


def load_system_prompt() -> str:
    try:
        with open("app/prompts/system_prompt.md", "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return None

g_client = Gemai(system_prompt=load_system_prompt())


def send_message(db: Session, user_id: str, prompt: str, conversation_id: str = None) -> dict:
    # Generate a new unique conversation ID if not provided
    conv_id = conversation_id or str(uuid.uuid4())

    #Retrieve recent messages to maintain context
    history = []
    if conversation_id:
        recent = chat_dao.get_recent_messages(db, conv_id, limit=10)
        for msg in recent:
            history.append(AIChatMessage(role="user", content=msg.prompt))
            history.append(AIChatMessage(role="assistant", content=msg.response))
    response_text = g_client.chat(prompt, history=history)

    # Persist the transaction into the database
    chat_dao.save_chat(
        db, conversation_id=conv_id, user_id=user_id,
        prompt=prompt, response=response_text,
    )

    return {"response": response_text, "conversation_id": conv_id}
