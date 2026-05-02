from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal
from datetime import datetime

class CTAEnquiryCreate(BaseModel):
    type: Literal["general", "service"]
    source_page: str
    
    email: EmailStr
    full_name: Optional[str] = None
    query: Optional[str] = None
    
    organization_name: Optional[str] = None
    material_type: Optional[str] = None
    line: Optional[str] = None
    location: Optional[str] = None
    service_name: Optional[str] = None

class CTAEnquiryResponse(CTAEnquiryCreate):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class CTAClickCreate(BaseModel):
    button_label: str
    page_path: str

class CTAClickResponse(CTAClickCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class CTAClickStats(BaseModel):
    button_label: str
    page_path: str
    click_count: int

class CTAAnalytics(BaseModel):
    general_stats: list[CTAClickStats]
    service_stats: list[CTAClickStats]
