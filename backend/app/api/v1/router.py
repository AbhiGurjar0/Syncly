from fastapi import APIRouter
# from api.v1.endpoints.project import router as project_router 
from app.api.v1.endpoints.user import router as user_router 
router = APIRouter()


router.include_router(user_router, prefix="/user", tags=["user"])
# router.include_router(project_router, prefix="/project", tag=["project"])



@router.get("/")
def f1():
    return {"Inside v1 router"}
