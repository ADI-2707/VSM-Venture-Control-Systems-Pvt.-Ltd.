from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from app.db.deps import get_db
from app.core.deps_auth import require_roles
from app.modules.cta_model import CTAEnquiry, CTAClick
from app.modules.cta_schema import (
    CTAEnquiryCreate, CTAEnquiryResponse, 
    CTAClickCreate, CTAClickResponse, CTAAnalytics, CTAClickStats
)

router = APIRouter()

@router.post("/cta/enquiry", response_model=CTAEnquiryResponse)
def submit_enquiry(data: CTAEnquiryCreate, db: Session = Depends(get_db)):
    enquiry = CTAEnquiry(**data.model_dump())
    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)
    return enquiry

@router.post("/cta/click", response_model=CTAClickResponse)
def track_click(data: CTAClickCreate, db: Session = Depends(get_db)):
    click = CTAClick(**data.model_dump())
    db.add(click)
    db.commit()
    db.refresh(click)
    return click

@router.get("/admin/cta/enquiries", response_model=List[CTAEnquiryResponse])
def get_enquiries(
    type: str = Query(..., regex="^(general|service)$"),
    db: Session = Depends(get_db),
    _: None = Depends(require_roles(["manager", "hr", "sales"])),
):
    return db.query(CTAEnquiry).filter(CTAEnquiry.type == type).order_by(CTAEnquiry.created_at.desc()).all()

@router.get("/admin/cta/analytics", response_model=CTAAnalytics)
def get_cta_analytics(
    db: Session = Depends(get_db),
    _: None = Depends(require_roles(["manager", "hr", "sales"])),
):
    stats = db.query(
        CTAClick.button_label,
        CTAClick.page_path,
        func.count(CTAClick.id).label("click_count")
    ).group_by(CTAClick.button_label, CTAClick.page_path).all()

    general_buttons = ["Schedule a Consultation", "Submit Request"]
    service_buttons = ["Get a Quote", "Book a Call"]
    
    general_stats = [
        CTAClickStats(button_label=s.button_label, page_path=s.page_path, click_count=s.click_count)
        for s in stats if s.button_label in general_buttons
    ]
    
    service_stats = [
        CTAClickStats(button_label=s.button_label, page_path=s.page_path, click_count=s.click_count)
        for s in stats if s.button_label in service_buttons
    ]

    return CTAAnalytics(
        general_stats=general_stats,
        service_stats=service_stats
    )
