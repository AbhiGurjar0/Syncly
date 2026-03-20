from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select 
from typing import Annotated
from core.config import settings
from db.session import get_db 
from models.user import User
from core.security import decode_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def get_current_user(
    token:Annotated[str, Depends(oauth2_scheme)],
    db:Annotated[AsyncSession,Depends(get_db)],
):
    
    ## exception
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = decode_token(token)
        
    except Exception as e:
        raise credentials_exception
    
    user_id:str  = payload.get("sub")
    if not user_id:
        raise credentials_exception
  
    query = select(User).where(User.id==user_id)
    
    result = await db.executr(query)
    user =  result.scalar_one_or_none()
    
    
    if not user :
        raise credentials_exception
    return user

    

async def get_current_active_user(
    user = Annotated[User,Depends(get_current_user)]
)->User:
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user