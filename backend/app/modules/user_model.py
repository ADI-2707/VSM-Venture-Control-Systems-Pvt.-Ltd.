from app.db.base import Base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=True)

    employee_id = Column(String, unique=True, nullable=False, index=True)
    email = Column(String, unique=True, nullable=False, index=True)

    hashed_password = Column(String, nullable=False)
    token_version = Column(Integer, default=0, nullable=False)

    role = Column(String, nullable=False, default="user")

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)