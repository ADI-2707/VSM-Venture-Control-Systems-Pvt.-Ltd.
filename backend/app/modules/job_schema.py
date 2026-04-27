from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime


class JobCreate(BaseModel):
    title: str
    department: str
    location: str
    job_type: Literal["full-time", "part-time", "contract", "internship"]
    experience_level: Literal["junior", "mid", "senior"]
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    description: str
    requirements: str
    status: Literal["draft", "active", "closed"] = "draft"


class JobUpdate(BaseModel):
    title: Optional[str] = None
    department: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[Literal["full-time", "part-time", "contract", "internship"]] = None
    experience_level: Optional[Literal["junior", "mid", "senior"]] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    status: Optional[Literal["draft", "active", "closed"]] = None


class JobResponse(BaseModel):
    id: int
    title: str
    department: str
    location: str
    job_type: str
    experience_level: str
    salary_min: Optional[int]
    salary_max: Optional[int]
    description: str
    requirements: str
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ApplicationCreate(BaseModel):
    full_name: str
    email: str
    phone: Optional[str] = None
    cover_note: Optional[str] = None


class ApplicationResponse(BaseModel):
    id: int
    job_id: int
    full_name: str
    email: str
    phone: Optional[str]
    cover_note: Optional[str]
    cv_path: str
    created_at: datetime

    class Config:
        from_attributes = True