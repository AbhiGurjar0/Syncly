from fastapi import APIRouter, Depends,Response
from typing_extensions import Annotated
from app.models.user import User
from app.dependencies.verify import get_current_active_user
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.schemas.work_space import Project
# from app.models.project import Project
from app.dependencies.auth import signup, signin
from app.schemas.user_schema import UserCreate, UserLogin
from app.schemas.work_space import ProjectResponse
from app.models.project import Project as ProjectModel
router = APIRouter()


@router.post('/register')
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    return await signup(user_in, db)


@router.post('/login')
async def login(user_in: UserLogin, db: AsyncSession = Depends(get_db)):
    return await signin(user_in, db)


@router.post("/create_project")
async def create_project(
    form_data: Project,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_active_user)],
) -> ProjectResponse:

    print("USER:", current_user)
    print("USER ID:", getattr(current_user, "id", None))

    project = ProjectModel(
        title=form_data.title,
        description=form_data.description,
        owner_id=current_user.id,
    )

    db.add(project)
    await db.commit()
    await db.refresh(project)

    return ProjectResponse(
        id=project.id,
        title=project.title,
        description=project.description,
        owner_id=project.owner_id,
        message="Project Created Successfully",
    )