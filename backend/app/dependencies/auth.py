from app.schemas.user_schema import UserCreate, UserResponse
from sqlalchemy import select
from app.models.user import User
from typing import Annotated
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from app.db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.security import hash_password, verify_password, create_access_token
from datetime import timedelta
from app.core.config import settings
from app.schemas.user_schema import Token


async def signup(
    user_in: UserCreate, db: AsyncSession = Depends(get_db)
) -> UserResponse:

    query = select(User).where(User.email == user_in.email.lower())
    result = await db.execute(query)
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=400, detail="user with this email already exist"
        )

    user = User(
        name=user_in.name,
        email=user_in.email.lower(),
        password=hash_password(user_in.password),
    )

    db.add(user)
    await db.commit()
    await db.refresh(user)

    return user


async def signin(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[AsyncSession, Depends(get_db())],
) -> Token:

    query = select(User).where(User.email == form_data.email.lower())
    result = await db.execute(query)
    user = result.scalar_one_or_none()

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=404, detail="user not found")

    access_token_expiry_time = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    return Token(
        access_token=create_access_token(
            {"sub": str(user.id)}, access_token_expiry_time
        ),
        success=True,
        message="Logged In Successfully",
    )
