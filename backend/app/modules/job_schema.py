from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime


class JobCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=150)
    department: str = Field(..., min_length=2, max_length=100)
    location: str = Field(..., min_length=2, max_length=150)
    job_type: Literal["full-time", "part-time", "contract", "internship"]
    experience_level: Literal["junior", "mid", "senior"]
    salary_min: Optional[int] = Field(None, ge=0)
    salary_max: Optional[int] = Field(None, ge=0)
    description: str = Field(..., min_length=10, max_length=10000)
    requirements: str = Field(..., min_length=10, max_length=10000)
    status: Literal["draft", "active", "closed"] = "draft"


class JobUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=150)
    department: Optional[str] = Field(None, min_length=2, max_length=100)
    location: Optional[str] = Field(None, min_length=2, max_length=150)
    job_type: Optional[Literal["full-time", "part-time", "contract", "internship"]] = None
    experience_level: Optional[Literal["junior", "mid", "senior"]] = None
    salary_min: Optional[int] = Field(None, ge=0)
    salary_max: Optional[int] = Field(None, ge=0)
    description: Optional[str] = Field(None, min_length=10, max_length=10000)
    requirements: Optional[str] = Field(None, min_length=10, max_length=10000)
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
    unread_applications_count: int = 0

    class Config:
        from_attributes = True


class ApplicationCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=200)
    email: str = Field(..., max_length=254)
    phone: Optional[str] = Field(None, max_length=30)
    cover_note: Optional[str] = Field(None, max_length=3000)


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


class JobStatusCount(BaseModel):
    status: str
    count: int


class TopJob(BaseModel):
    job_id: int
    title: str
    department: str
    application_count: int


class ApplicationTrendPoint(BaseModel):
    date: str
    count: int


class AnalyticsSummary(BaseModel):
    total_jobs: int
    total_applications: int
    jobs_by_status: list[JobStatusCount]
    recent_applications: int  # last 7 days


class AnalyticsTrend(BaseModel):
    trend: list[ApplicationTrendPoint]


class AnalyticsTopJobs(BaseModel):
    top_jobs: list[TopJob]