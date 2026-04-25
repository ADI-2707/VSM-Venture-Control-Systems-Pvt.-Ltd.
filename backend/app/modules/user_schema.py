from typing import Literal
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    first_name: str
    last_name: str | None = None
    employee_id: str
    email: EmailStr
    password: str
    role: Literal["user", "admin"] = "user"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str | None
    employee_id: str
    email: str
    role: str

    class Config:
        from_attributes = True