from sqlalchemy import Column, String, Integer, Text, DateTime, Enum, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
from app.models.association import project_members , task_assignees ,meeting_members


class MeetingSummary(Base):
    __tablename__ = "meeting_summaries"

    id           = Column(Integer, primary_key=True, index=True)
    title        = Column(String(200), nullable=True)
    summary      = Column(Text, nullable=False)      # full AI generated summary
    decisions    = Column(Text, nullable=True)        # extracted decisions
    concerns     = Column(Text, nullable=True)        # extracted concerns
    next_steps   = Column(Text, nullable=True)        # extracted next steps
    meeting_id   = Column(Integer, ForeignKey("meetings.id"), nullable=False)
    room_id      = Column(Integer, ForeignKey("rooms.id"), nullable=False)
    generated_at = Column(DateTime, server_default=func.now())

    # ── Relationships ──
    meeting = relationship("Meeting", back_populates="summary")
    room    = relationship("Room",    back_populates="summaries")

