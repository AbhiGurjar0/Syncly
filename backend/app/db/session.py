from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# 1. Async engine
engine = create_async_engine(
    settings.DATABASE_URL,
    # echo=True
)

# 2. Async session
SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# 3. Dependency
async def get_db():
    async with SessionLocal() as session:
        yield session