from app.db.base import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String, nullable=False)
    line = Column(String, nullable=False)
    material = Column(String, nullable=False)
    location = Column(String, nullable=False)
    
    progress = Column(Integer, default=0)
    
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", backref="projects")
    checkpoints = relationship("ProjectCheckpoint", back_populates="project", cascade="all, delete-orphan", order_by="ProjectCheckpoint.order")

class ProjectCheckpoint(Base):
    __tablename__ = "project_checkpoints"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    name = Column(String, nullable=False)
    order = Column(Integer, nullable=False) # 1 to 5
    is_completed = Column(Boolean, default=False)

    project = relationship("Project", back_populates="checkpoints")
    sub_steps = relationship("ProjectSubStep", back_populates="checkpoint", cascade="all, delete-orphan")

class ProjectSubStep(Base):
    __tablename__ = "project_sub_steps"

    id = Column(Integer, primary_key=True, index=True)
    checkpoint_id = Column(Integer, ForeignKey("project_checkpoints.id"), nullable=False)
    name = Column(String, nullable=False)
    is_completed = Column(Boolean, default=False)

    checkpoint = relationship("ProjectCheckpoint", back_populates="sub_steps")
