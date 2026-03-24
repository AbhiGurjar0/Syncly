from fastapi import APIRouter, Depends
from typing_extensions import Annotated
from app.db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from app.models.project import Project
from app.schemas.work_space import ProjectResponse2

router = APIRouter()


@router.get("/projects")
async def fetch_projects(db: Annotated[AsyncSession, Depends(get_db)]):

    query = select(Project)
    result = await db.execute(query)
    projects = result.scalars().all()

    response = []

    for p in projects:
        response.append(
            ProjectResponse2(
                id=p.id,
                name=p.title,  # mapping
                desc=p.description,  # mapping
                stack=["React", "Node.js"],  # static / later from DB
                status=p.completion_status,  # mapping
                starred=False,  # default (or DB field)
                updated="2h ago",  # you can calculate later
                progress=78,  # dummy or calculated
                color="#7f6fff",  # UI only
            )
        )

    return response
