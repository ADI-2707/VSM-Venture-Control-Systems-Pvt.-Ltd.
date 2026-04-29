from app.db.base import Base
from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    time = Column(DateTime, default=datetime.utcnow, index=True)
    level = Column(String, index=True)
    service = Column(String, index=True)
    source = Column(String, index=True)
    actor = Column(String, index=True)
    message = Column(String)
    process_time = Column(Float, nullable=True)
    status_code = Column(Integer, nullable=True)
