from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import router as v1_router
from app.db.base import Base
from app.models import * 
from app.db.session import engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # Keep dev setup simple and safer than "*" with credentials.
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_router, prefix="/api/v1")


@app.get("/")
def test():
    return {"message": "Running.."}




@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)