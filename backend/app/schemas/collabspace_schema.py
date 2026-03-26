from pydantic import BaseModel
from typing import List


class CollabSpaceProjectCreate(BaseModel):
    title: str
    description: str | None = None


class CollabSpaceProjectOut(BaseModel):
    id: int
    title: str
    description: str | None = None

    class Config:
        from_attributes = True


class CollabSpaceProjectsOut(BaseModel):
    projects: List[CollabSpaceProjectOut]

