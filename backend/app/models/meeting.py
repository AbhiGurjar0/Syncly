from sqlalchemy import Column, String, Integer, Text, DateTime, Enum, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
from app.models.enum import MeetingStatus
from app.models.association import project_members , task_assignees ,meeting_members




class Meeting(Base):
    __tablename__ = "meetings"

    id         = Column(Integer, primary_key=True, index=True)
    title      = Column(String(200), nullable=False)
    raw_notes  = Column(Text, nullable=True)        # plain English notes typed during meeting
    status     = Column(
                     Enum(MeetingStatus),
                     default=MeetingStatus.upcoming,
                     nullable=False
                 )
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    room_id    = Column(Integer, ForeignKey("rooms.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    scheduled_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    # ── Relationships ──
    creator  = relationship("User",    back_populates="created_meetings", foreign_keys=[creator_id])
    members  = relationship("User",    secondary=meeting_members,         back_populates="meetings")
    room     = relationship("Room",    back_populates="meetings")
    summary  = relationship("MeetingSummary", back_populates="meeting",   uselist=False)

