from fastapi import APIRouter, HTTPException
import anyio

from app.schemas.ai_schema import (
    AiSummaryRequest,
    AiSummaryResponse,
    AiChatRequest,
    AiChatResponse,
)
from app.services.gemini import generate_text

router = APIRouter()


@router.post("/summary", response_model=AiSummaryResponse)
async def ai_summary(payload: AiSummaryRequest) -> AiSummaryResponse:
    prompt = "\n".join(
        [
            "You are CollabSpace AI. Write a short, helpful project summary.",
            "Keep it beginner-friendly and action-oriented.",
            "",
            f"Title: {payload.title}",
            f"Description: {payload.description or ''}",
        ]
    )

    try:
        text = await anyio.to_thread.run_sync(generate_text, prompt)
    except RuntimeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Gemini request failed")

    return AiSummaryResponse(text=text)


@router.post("/chat", response_model=AiChatResponse)
async def ai_chat(payload: AiChatRequest) -> AiChatResponse:
    last_user = next((m.content for m in reversed(payload.messages) if m.role == "user"), "")

    prompt = "\n".join(
        [
            "You are CollabSpace AI. Respond conversationally and help the team collaborate.",
            "Be concise and practical.",
            "",
            f"Project title: {payload.title}",
            f"Project description: {payload.description or ''}",
            "",
            f"User message: {last_user}",
        ]
    )

    try:
        text = await anyio.to_thread.run_sync(generate_text, prompt)
    except RuntimeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Gemini request failed")

    return AiChatResponse(text=text)

