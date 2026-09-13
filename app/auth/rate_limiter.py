import time
from fastapi import HTTPException, status
from app.config.settings import RATE_LIMIT_AUTH, RATE_LIMIT_ANON, RATE_LIMIT_WINDOW

# Memory mein request logs: { "user_id": [timestamp1, timestamp2, ...] }
request_log: dict[str, list[float]] = {}


def apply_rate_limit(user_id: str):
    """
    User ki request limit check karta hai.
    Agar limit exceed ho jaye toh 429 Too Many Requests error fekta hai.
    """
    now = time.time()

    # User ka limit set karo
    if user_id == "global_unauthenticated_user":
        max_requests = RATE_LIMIT_ANON
    else:
        max_requests = RATE_LIMIT_AUTH

    # Purane records hatao (jo time window se baahar hain)
    if user_id not in request_log:
        request_log[user_id] = []

    request_log[user_id] = [
        t for t in request_log[user_id]
        if now - t < RATE_LIMIT_WINDOW
    ]

    # Limit check
    if len(request_log[user_id]) >= max_requests:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Rate limit exceeded. Max {max_requests} requests per minute.",
        )

    # Request save karo
    request_log[user_id].append(now)
    print(f"User {user_id}: {len(request_log[user_id])}/{max_requests} requests used.")
