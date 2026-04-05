from __future__ import annotations

from app.core.config import settings


def _require_key() -> str:
    if not settings.GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY is not set")
    return settings.GEMINI_API_KEY


def generate_text(prompt: str, model_name: str = "gemini-1.5-flash") -> str:
    """
    Minimal Gemini wrapper. Keep it synchronous and simple.
    The FastAPI endpoint will call this in a threadpool.
    """
    api_key = _require_key()

    import google.generativeai as genai

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(model_name)
    resp = model.generate_content(prompt)
    return (resp.text or "").strip()

