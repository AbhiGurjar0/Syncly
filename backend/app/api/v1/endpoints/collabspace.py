from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing_extensions import Annotated

from app.db.session import get_db
from app.dependencies.verify import get_current_active_user
from app.models.user import User
from app.models.project import Project
from app.schemas.collabspace_schema import (
    CollabSpaceProjectCreate,
    CollabSpaceProjectOut,
    CollabSpaceProjectsOut,
)

router = APIRouter()


@router.get("/projects", response_model=CollabSpaceProjectsOut)
async def list_projects(
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    query = select(Project).where(Project.owner_id == current_user.id).order_by(Project.id.desc())
    result = await db.execute(query)
    projects = result.scalars().all()
    return CollabSpaceProjectsOut(projects=projects)


@router.post("/projects", response_model=CollabSpaceProjectOut)
async def create_project(
    payload: CollabSpaceProjectCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    project = Project(
        title=payload.title,
        description=payload.description,
        owner_id=current_user.id,
    )
    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project


@router.get("/projects/{project_id}", response_model=CollabSpaceProjectOut)
async def get_project(
    project_id: int,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    query = select(Project).where(Project.id == project_id, Project.owner_id == current_user.id)
    result = await db.execute(query)
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

