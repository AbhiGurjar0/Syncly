from sqlalchemy import Column, String, Integer, Text, DateTime, Enum, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
from app.models.association import project_members , task_assignees ,meeting_members


class AiResponse(Base):
    __tablename__ = "ai_responses"

    id                    = Column(Integer, primary_key=True, index=True)
    title                 = Column(String(200), nullable=True)
    response_content      = Column(Text, nullable=False)         # the actual AI output
    response_type         = Column(String(50), nullable=True)    # "daily_summary", "task_extraction", "meeting_summary"
    response_for_project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    response_for_task_id    = Column(Integer, ForeignKey("tasks.id"),    nullable=True)
    response_to_user_id     = Column(Integer, ForeignKey("users.id"),    nullable=True)
    generated_at          = Column(DateTime, server_default=func.now())

    # ── Relationships ──
    response_for_project = relationship("Project", back_populates="ai_responses")
    response_for_task    = relationship("Task",    back_populates="ai_responses")
    response_to          = relationship("User",    back_populates="ai_responses")

