from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ProjectSubStepBase(BaseModel):
    name: str
    is_completed: bool = False

class ProjectSubStepCreate(ProjectSubStepBase):
    pass

class ProjectSubStepResponse(ProjectSubStepBase):
    id: int
    checkpoint_id: int
    class Config:
        from_attributes = True

class ProjectCheckpointBase(BaseModel):
    name: str
    order: int
    is_completed: bool = False

class ProjectCheckpointResponse(ProjectCheckpointBase):
    id: int
    sub_steps: List[ProjectSubStepResponse] = []
    class Config:
        from_attributes = True

class ProjectCreate(BaseModel):
    client_name: str
    line: str
    material: str
    location: str

class ProjectUpdate(BaseModel):
    progress: Optional[int] = Field(None, ge=0, le=100)
    client_name: Optional[str] = None
    line: Optional[str] = None
    material: Optional[str] = None
    location: Optional[str] = None

class ProjectResponse(BaseModel):
    id: int
    client_name: str
    line: str
    material: str
    location: str
    progress: int
    owner_id: int
    created_at: datetime
    checkpoints: List[ProjectCheckpointResponse] = []
    
    owner_name: Optional[str] = None 

    class Config:
        from_attributes = True
