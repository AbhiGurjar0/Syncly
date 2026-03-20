from sqlalchemy import Column, String, Integer, Text, DateTime, Enum, ForeignKey, Table , Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
from app.models.association import project_members , task_assignees ,meeting_members ,room_members


class User(Base):
    __tablename__ = "users"

    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String(100), nullable=False)
    email      = Column(String(255), unique=True, nullable=False, index=True)
    password   = Column(String(255), nullable=False)
    avatar     = Column(String(500), nullable=True)   # profile picture URL
    is_active  = Column(Boolean ,default = True)
    created_at = Column(DateTime, server_default=func.now())
    

    # ── Relationships ──
    # Projects this user owns
    owned_projects  = relationship("Project",  back_populates="owner",   foreign_keys="Project.owner_id")

    # Projects this user is a member of
    projects        = relationship("Project",  secondary=project_members, back_populates="members")

    # Rooms this user created
    owned_rooms     = relationship("Room",     back_populates="creator",  foreign_keys="Room.creator_id")

    # Rooms this user is a member of
    rooms           = relationship("Room",     secondary=room_members,    back_populates="members")

    # Chats/updates this user posted
    chats           = relationship("Chat",     back_populates="user",     foreign_keys="Chat.user_id")

    # Tasks this user created
    created_tasks   = relationship("Task",     back_populates="creator",  foreign_keys="Task.creator_id")

    # Tasks assigned to this user
    assigned_tasks  = relationship("Task",     secondary=task_assignees,  back_populates="assignees")

    # Meetings this user created
    created_meetings = relationship("Meeting", back_populates="creator",  foreign_keys="Meeting.creator_id")

    # Meetings this user is part of
    meetings        = relationship("Meeting",  secondary=meeting_members, back_populates="members")

    # AI responses sent to this user
    ai_responses    = relationship("AiResponse", back_populates="response_to")








