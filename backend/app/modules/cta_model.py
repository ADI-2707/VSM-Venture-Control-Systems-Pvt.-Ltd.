from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from datetime import datetime
from app.db.base import Base

class CTAEnquiry(Base):
    __tablename__ = "cta_enquiries"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)
    
    email = Column(String, nullable=False)
    source_page = Column(String, nullable=False)
    status = Column(String, default="pending")
    
    full_name = Column(String, nullable=True)
    query = Column(Text, nullable=True)
    
    organization_name = Column(String, nullable=True)
    material_type = Column(String, nullable=True)
    line = Column(String, nullable=True)
    location = Column(String, nullable=True)
    service_name = Column(String, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

class CTAClick(Base):
    __tablename__ = "cta_clicks"

    id = Column(Integer, primary_key=True, index=True)
    button_label = Column(String, nullable=False)
    page_path = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
