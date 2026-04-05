from pydantic import BaseModel
from typing import List, Literal


class AiSummaryRequest(BaseModel):
    title: str
    description: str | None = None


class AiSummaryResponse(BaseModel):
    text: str


class AiChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class AiChatRequest(BaseModel):
    title: str
    description: str | None = None
    messages: List[AiChatMessage]


class AiChatResponse(BaseModel):
    text: str

