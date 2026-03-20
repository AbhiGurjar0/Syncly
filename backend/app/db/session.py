# app/db/session.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker , Session

from app.core.settings import settings   

# 1. Create engine (connect to DB)
engine = create_engine(
    settings.database_url,
    echo=True  
)

# 2. Create session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()

