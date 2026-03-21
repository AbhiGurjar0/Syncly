from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def p1():
    return {"From projects"}


