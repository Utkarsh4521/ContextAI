from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config.settings import DATABASE_URL

# Database engine
engine = create_engine(DATABASE_URL)

# Session factory - har request ke liye naya session banata hai
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Saare models ka base
Base = declarative_base()


def get_db():
    """
    Har API request pe naya database session kholta hai,
    request khatam hone par automatically close kar deta hai. (Depends ke sath use hota hai)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
