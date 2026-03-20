from sqlalchemy import Column, String, Integer, Text, DateTime, Enum, ForeignKey, Table
from app.db.base import Base


room_members = Table(
    "room_members", Base.metadata,
    Column("user_id",    Integer, ForeignKey("users.id"),    primary_key=True),
    Column("room_id",    Integer, ForeignKey("rooms.id"),    primary_key=True),
)

# Which users are members of which projects
project_members = Table(
    "project_members", Base.metadata,
    Column("user_id",    Integer, ForeignKey("users.id"),    primary_key=True),
    Column("project_id", Integer, ForeignKey("projects.id"), primary_key=True),
)

# Which users are assigned to which tasks
task_assignees = Table(
    "task_assignees", Base.metadata,
    Column("user_id",  Integer, ForeignKey("users.id"),  primary_key=True),
    Column("task_id",  Integer, ForeignKey("tasks.id"),  primary_key=True),
)

# Which users are in which meetings
meeting_members = Table(
    "meeting_members", Base.metadata,
    Column("user_id",     Integer, ForeignKey("users.id"),     primary_key=True),
    Column("meeting_id",  Integer, ForeignKey("meetings.id"),  primary_key=True),
)
