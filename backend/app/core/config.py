# app/core/settings.py

from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    # APP INFO
    PROJECT_NAME: str = "Syncly Backend"
    API_V1_PREFIX: str = "/api/v1"

    # SECURITY
    SECRET_KEY: str = Field(..., description="JWT secret key")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # DATABASE
    DATABASE_URL: str
    
    # AI / EXTERNAL KEYS
    GEMINI_API_KEY: str | None = None   # primary
    GROQ_API_KEY: str | None = None     # fallback
    OPEN_ROUTER_KEY: str | None = None  # optional
    
    # ENV CONFIG
    class Config:
        env_file = ".env"
        case_sensitive = True

# single instance
settings = Settings()