from sqlalchemy import Column, String, Integer, Text, DateTime, Enum, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
from app.models.association import project_members , task_assignees ,meeting_members

class Chat(Base):
    __tablename__ = "chats"

    id         = Column(Integer, primary_key=True, index=True)
    content    = Column(Text, nullable=False)       # what the user typed
    user_id    = Column(Integer, ForeignKey("users.id"), nullable=False)
    room_id    = Column(Integer, ForeignKey("rooms.id"), nullable=False)
    ai_processed = Column(Integer, default=0)       # 0 = not yet, 1 = processed
    created_at = Column(DateTime, server_default=func.now())

    # ── Relationships ──
    user = relationship("User",    back_populates="chats")
    room = relationship("Room",    back_populates="chats")
