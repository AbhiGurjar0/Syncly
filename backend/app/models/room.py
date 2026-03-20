from sqlalchemy import Column, String, Integer, Text, DateTime, Enum, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
from app.models.association import project_members , task_assignees ,meeting_members




class Room(Base):
    __tablename__ = "rooms"

    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String(200), nullable=False)
    invite_code = Column(String(20), unique=True, nullable=False)  # e.g. "SYNCLY-X7K2"
    creator_id  = Column(Integer, ForeignKey("users.id"), nullable=False)
    project_id  = Column(Integer, ForeignKey("projects.id"), nullable=True)
    created_at  = Column(DateTime, server_default=func.now())

    # ── Relationships ──
    creator    = relationship("User",    back_populates="owned_rooms",  foreign_keys=[creator_id])
    members    = relationship("User",    secondary=room_members,        back_populates="rooms")
    project    = relationship("Project", back_populates="room")
    chats      = relationship("Chat",    back_populates="room")
    meetings   = relationship("Meeting", back_populates="room")
    summaries  = relationship("MeetingSummary", back_populates="room")