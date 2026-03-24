from pydantic import BaseModel
from datetime import datetime
from typing import List


class WorkSpace(BaseModel):
    title: str
    description: str


class Project(BaseModel):
    title: str
    description: str
    deadline: str
    # members: list | None = None


class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str
    owner_id: int
    message: str
    
class ProjectResponse2(BaseModel):
    id: int
    name: str
    desc: str
    stack: List[str]
    status: str
    starred: bool
    updated: str
    progress: int
    color: str
