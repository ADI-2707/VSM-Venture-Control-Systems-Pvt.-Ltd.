import os
import shutil
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import UploadFile, HTTPException
from app.modules.job_model import Job
from app.modules.application_model import Application
from app.modules.job_schema import JobCreate, JobUpdate

CV_UPLOAD_DIR = "uploads/cvs"
os.makedirs(CV_UPLOAD_DIR, exist_ok=True)


def get_all_jobs(db: Session, status: str = None):
    query = db.query(Job)
    if status:
        query = query.filter(Job.status == status)
    return query.order_by(Job.created_at.desc()).all()


def get_job_by_id(db: Session, job_id: int):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


def create_job(db: Session, data: JobCreate):
    job = Job(**data.model_dump())
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


def update_job(db: Session, job_id: int, data: JobUpdate):
    job = get_job_by_id(db, job_id)
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(job, field, value)
    db.commit()
    db.refresh(job)
    return job


def delete_job(db: Session, job_id: int):
    job = get_job_by_id(db, job_id)
    db.delete(job)
    db.commit()
    return {"detail": "Job deleted"}


def submit_application(db: Session, job_id: int, full_name: str, email: str,
                       phone: str, cover_note: str, cv_file: UploadFile):
    get_job_by_id(db, job_id)

    allowed = {"application/pdf", "application/msword",
               "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}
    if cv_file.content_type not in allowed:
        raise HTTPException(status_code=400, detail="CV must be PDF or Word document")

    ext = cv_file.filename.rsplit(".", 1)[-1]
    filename = f"{job_id}_{email.replace('@','_')}_{cv_file.filename}"
    filepath = os.path.join(CV_UPLOAD_DIR, filename)

    with open(filepath, "wb") as f:
        shutil.copyfileobj(cv_file.file, f)

    application = Application(
        job_id=job_id,
        full_name=full_name,
        email=email,
        phone=phone,
        cover_note=cover_note,
        cv_path=filepath,
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    return application


def get_applications(db: Session, job_id: int):
    get_job_by_id(db, job_id)
    return db.query(Application).filter(Application.job_id == job_id)\
             .order_by(Application.created_at.desc()).all()


def get_analytics_summary(db: Session):
    total_jobs = db.query(func.count(Job.id)).scalar()
    total_applications = db.query(func.count(Application.id)).scalar()

    jobs_by_status = (
        db.query(Job.status, func.count(Job.id).label("count"))
        .group_by(Job.status)
        .all()
    )

    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    recent_applications = (
        db.query(func.count(Application.id))
        .filter(Application.created_at >= seven_days_ago)
        .scalar()
    )

    return {
        "total_jobs": total_jobs,
        "total_applications": total_applications,
        "jobs_by_status": [{"status": s, "count": c} for s, c in jobs_by_status],
        "recent_applications": recent_applications,
    }


def get_applications_trend(db: Session, days: int = 30):
    since = datetime.utcnow() - timedelta(days=days)

    rows = (
        db.query(
            func.date(Application.created_at).label("date"),
            func.count(Application.id).label("count"),
        )
        .filter(Application.created_at >= since)
        .group_by(func.date(Application.created_at))
        .order_by(func.date(Application.created_at))
        .all()
    )

    # Fill in zero days so chart has no gaps
    date_map = {str(row.date): row.count for row in rows}
    trend = []
    for i in range(days):
        day = (since + timedelta(days=i + 1)).strftime("%Y-%m-%d")
        trend.append({"date": day, "count": date_map.get(day, 0)})

    return {"trend": trend}


def get_top_jobs(db: Session, limit: int = 5):
    rows = (
        db.query(
            Application.job_id,
            Job.title,
            Job.department,
            func.count(Application.id).label("application_count"),
        )
        .join(Job, Job.id == Application.job_id)
        .group_by(Application.job_id, Job.title, Job.department)
        .order_by(func.count(Application.id).desc())
        .limit(limit)
        .all()
    )

    return {
        "top_jobs": [
            {
                "job_id": r.job_id,
                "title": r.title,
                "department": r.department,
                "application_count": r.application_count,
            }
            for r in rows
        ]
    }