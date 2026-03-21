from pydantic import BaseModel

class UserCreate(BaseModel):
    name:str
    email:str
    password:str
    agreed:bool
    
class UserResponse(BaseModel):
    id:int
    email:str
    
    class Config:
        from_attributes = True
        
        
        
class Token(BaseModel):
    access_token:str
    token_type: str = "bearer"
    message:str
    success:str
    