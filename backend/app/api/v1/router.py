from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def f1():
    return {"Inside v1 router"}

