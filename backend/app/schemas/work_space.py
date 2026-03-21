from pydantic import BaseModel


class WorkSpace(BaseModel):
    title: str
    description: str


class Project(BaseModel):
    title: str
    description: str
    members: list | None = None


class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str
    owner_id:int
    message: str
