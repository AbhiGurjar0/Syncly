from sqlalchemy import Column, String, Integer, Text, DateTime, Enum, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
from app.models.association import project_members , task_assignees ,meeting_members



class Task(Base):
    __tablename__ = "tasks"

    id                = Column(Integer, primary_key=True, index=True)
    title             = Column(String(200), nullable=False)
    description       = Column(Text, nullable=True)
    creator_id        = Column(Integer, ForeignKey("users.id"), nullable=False)
    project_id        = Column(Integer, ForeignKey("projects.id"), nullable=False)
    completion_status = Column(
                            Enum(TaskStatus),
                            default=TaskStatus.todo,
                            nullable=False
                        )
    priority          = Column(
                            Enum(TaskPriority),
                            default=TaskPriority.medium,
                            nullable=False
                        )
    deadline          = Column(DateTime, nullable=True)
    created_at        = Column(DateTime, server_default=func.now())

    # Which chat message created this task (AI extracted it from)
    extracted_from_chat_id = Column(Integer, ForeignKey("chats.id"), nullable=True)

    # ── Relationships ──
    creator      = relationship("User",    back_populates="created_tasks",  foreign_keys=[creator_id])
    assignees    = relationship("User",    secondary=task_assignees,         back_populates="assigned_tasks")
    project      = relationship("Project", back_populates="tasks")
    extracted_from = relationship("Chat",  foreign_keys=[extracted_from_chat_id])
    ai_responses = relationship("AiResponse", back_populates="response_for_task")

