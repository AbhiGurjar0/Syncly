from fastapi import APIRouter
# from api.v1.endpoints.project import router as project_router 
from app.api.v1.endpoints.user import router as user_router 
from app.api.v1.endpoints.project import router as project_router
from app.api.v1.endpoints.ai import router as ai_router
from app.api.v1.endpoints.collabspace import router as collabspace_router
router = APIRouter()


router.include_router(user_router, prefix="/user", tags=["user"])
router.include_router(project_router, prefix="/project", tags=["project"])
router.include_router(ai_router, prefix="/ai", tags=["ai"])
router.include_router(collabspace_router, prefix="/collabspace", tags=["collabspace"])



@router.get("/")
def f1():
    return {"Inside v1 router"}
