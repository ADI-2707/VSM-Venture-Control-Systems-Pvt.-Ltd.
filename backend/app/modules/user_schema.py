from typing import Literal
from pydantic import BaseModel, EmailStr

UserRole = Literal["manager", "hr", "marketing", "analyst", "sales"]


class UserCreate(BaseModel):
    first_name: str
    last_name: str | None = None
    employee_id: str
    email: EmailStr
    password: str
    role: UserRole = "sales"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class RefreshTokenRequest(BaseModel):
    token: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str | None
    employee_id: str
    email: str
    role: str

    class Config:
        from_attributes = True
