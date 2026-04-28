import os
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, Query
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import Optional

from app.db.deps import get_db
from app.core.deps_auth import require_roles  # ✅ use RBAC instead of admin-only

from app.modules.job_schema import (
    JobCreate, JobUpdate, JobResponse, ApplicationResponse,
    AnalyticsSummary, AnalyticsTrend, AnalyticsTopJobs,
)

from app.services.job_service import (
    get_all_jobs, get_job_by_id, create_job,
    update_job, delete_job, submit_application, get_applications,
    get_analytics_summary, get_applications_trend, get_top_jobs,
)

router = APIRouter()


@router.get("/jobs", response_model=list[JobResponse])
def list_jobs(status: Optional[str] = "active", db: Session = Depends(get_db)):
    return get_all_jobs(db, status=status)


@router.get("/jobs/{job_id}", response_model=JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    return get_job_by_id(db, job_id)


@router.post("/jobs/{job_id}/apply", response_model=ApplicationResponse)
def apply_for_job(
    job_id: int,
    full_name: str = Form(...),
    email: str = Form(...),
    phone: Optional[str] = Form(None),
    cover_note: Optional[str] = Form(None),
    cv: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    return submit_application(db, job_id, full_name, email, phone, cover_note, cv)


@router.get("/admin/jobs", response_model=list[JobResponse])
def admin_list_jobs(
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    _: None = Depends(require_roles(["manager", "hr"])),
):
    return get_all_jobs(db, status=status)


@router.post("/admin/jobs", response_model=JobResponse)
def admin_create_job(
    data: JobCreate,
    db: Session = Depends(get_db),
    _: None = Depends(require_roles(["manager", "hr"])),
):
    return create_job(db, data)


@router.patch("/admin/jobs/{job_id}", response_model=JobResponse)
def admin_update_job(
    job_id: int,
    data: JobUpdate,
    db: Session = Depends(get_db),
    _: None = Depends(require_roles(["manager", "hr"])),
):
    return update_job(db, job_id, data)


@router.delete("/admin/jobs/{job_id}")
def admin_delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    _: None = Depends(require_roles(["manager", "hr"])),
):
    return delete_job(db, job_id)


@router.get("/admin/jobs/{job_id}/applications", response_model=list[ApplicationResponse])
def admin_get_applications(
    job_id: int,
    db: Session = Depends(get_db),
    _: None = Depends(require_roles(["manager", "hr"])),
):
    return get_applications(db, job_id)


@router.get("/admin/applications/{application_id}/cv")
def download_cv(
    application_id: int,
    db: Session = Depends(get_db),
    _: None = Depends(require_roles(["manager", "hr"])),
):
    from app.modules.application_model import Application

    app = db.query(Application).filter(Application.id == application_id).first()

    if not app or not os.path.exists(app.cv_path):
        raise HTTPException(status_code=404, detail="CV not found")

    return FileResponse(app.cv_path, filename=os.path.basename(app.cv_path))


@router.get("/admin/analytics/summary", response_model=AnalyticsSummary)
def analytics_summary(
    db: Session = Depends(get_db),
    _: None = Depends(require_roles(["manager", "analyst", "sales"])),
):
    return get_analytics_summary(db)


@router.get("/admin/analytics/trend", response_model=AnalyticsTrend)
def analytics_trend(
    days: int = Query(default=30, ge=7, le=90),
    db: Session = Depends(get_db),
    _: None = Depends(require_roles(["manager", "analyst", "sales"])),
):
    return get_applications_trend(db, days)


@router.get("/admin/analytics/top-jobs", response_model=AnalyticsTopJobs)
def analytics_top_jobs(
    limit: int = Query(default=5, ge=1, le=10),
    db: Session = Depends(get_db),
    _: None = Depends(require_roles(["manager", "analyst", "sales"])),
):
    return get_top_jobs(db, limit)