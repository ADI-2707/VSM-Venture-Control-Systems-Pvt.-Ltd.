from typing import Literal
from pydantic import BaseModel, EmailStr, Field

UserRole = Literal["manager", "hr", "marketing", "analyst", "sales"]


class UserCreate(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str | None = Field(None, max_length=100)
    employee_id: str = Field(..., min_length=2, max_length=20)
    email: EmailStr
    phone_number: str | None = Field(None, max_length=30)
    password: str = Field(..., min_length=8, max_length=128)
    role: UserRole = "sales"


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1, max_length=128)


class RefreshTokenRequest(BaseModel):
    token: str = Field(..., max_length=2048)


class ChangePasswordRequest(BaseModel):
    current_password: str = Field(..., min_length=1, max_length=128)
    new_password: str = Field(..., min_length=8, max_length=128)


class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str | None
    employee_id: str
    email: str
    phone_number: str | None = None
    role: str

    class Config:
        from_attributes = True
