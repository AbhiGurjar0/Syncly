
from sqlalchemy import Column, String, Integer, Text, DateTime, Enum, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
from app.models.association import project_members , task_assignees ,meeting_members
from app.models.enum import ProjectStatus



class Project(Base):
    __tablename__ = "projects"

    id                = Column(Integer, primary_key=True, index=True)
    title             = Column(String(200), nullable=False)
    description       = Column(Text, nullable=True)
    owner_id          = Column(Integer, ForeignKey("users.id"), nullable=False)
    completion_status = Column(
                            Enum(ProjectStatus),
                            default=ProjectStatus.on_track,
                            nullable=False
                        )
    deadline          = Column(DateTime, nullable=True)
    created_at        = Column(DateTime, server_default=func.now())

    # ── Relationships ──
    owner       = relationship("User",    back_populates="owned_projects", foreign_keys=[owner_id])
    members     = relationship("User",    secondary=project_members,       back_populates="projects")
    tasks       = relationship("Task",    back_populates="project")
    room        = relationship("Room",    back_populates="project",        uselist=False)
    ai_responses = relationship("AiResponse", back_populates="response_for_project")

