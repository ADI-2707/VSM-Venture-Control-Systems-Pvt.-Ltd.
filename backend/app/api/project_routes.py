from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.deps import get_db
from app.core.deps_auth import get_current_user, require_roles
from app.modules.project_model import Project, ProjectCheckpoint, ProjectSubStep
from app.modules.project_schema import ProjectCreate, ProjectResponse, ProjectUpdate, ProjectSubStepCreate, ToggleRequest
from app.modules.user_model import User

router = APIRouter(prefix="/projects", tags=["projects"])

DEFAULT_CHECKPOINTS = ["Enquiry", "Order", "Drawing", "Site Visit", "Payment"]

@router.post("", response_model=ProjectResponse)
def create_project(
    data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = Project(
        client_name=data.client_name,
        line=data.line,
        material=data.material,
        location=data.location,
        owner_id=current_user.id
    )
    db.add(project)
    db.flush()

    for i, name in enumerate(DEFAULT_CHECKPOINTS):
        checkpoint = ProjectCheckpoint(
            project_id=project.id,
            name=name,
            order=i + 1
        )
        db.add(checkpoint)
    
    db.commit()
    db.refresh(project)
    return project

@router.get("", response_model=List[ProjectResponse])
def get_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    employee_id: int = None
):
    query = db.query(Project)
    
    if current_user.role == "manager":
        if employee_id:
            query = query.filter(Project.owner_id == employee_id)
    else:
        query = query.filter(Project.owner_id == current_user.id)
    
    projects = query.all()
    
    for p in projects:
        p.owner_name = f"{p.owner.first_name} {p.owner.last_name or ''}".strip()
        
    return projects

@router.patch("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    data: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.owner_id != current_user.id and current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(project, key, value)
    
    db.commit()
    db.refresh(project)
    return project

def calculate_project_progress(project_id: int, db: Session):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        return
    
    total_items = 0
    completed_items = 0
    
    for cp in project.checkpoints:
        total_items += 1
        if cp.is_completed:
            completed_items += 1
        
        for sub in cp.sub_steps:
            total_items += 1
            if sub.is_completed:
                completed_items += 1
    
    if total_items > 0:
        project.progress = int((completed_items / total_items) * 100)
    else:
        project.progress = 0
    
    db.commit()

@router.patch("/checkpoints/{checkpoint_id}")
def toggle_checkpoint(
    checkpoint_id: int,
    data: ToggleRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    checkpoint = db.query(ProjectCheckpoint).filter(ProjectCheckpoint.id == checkpoint_id).first()
    if not checkpoint:
        raise HTTPException(status_code=404, detail="Checkpoint not found")
    
    if checkpoint.project.owner_id != current_user.id and current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    checkpoint.is_completed = data.is_completed
    db.commit()
    
    calculate_project_progress(checkpoint.project_id, db)
    
    return {"message": "Updated"}

@router.post("/checkpoints/{checkpoint_id}/substeps")
def add_substep(
    checkpoint_id: int,
    data: ProjectSubStepCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    checkpoint = db.query(ProjectCheckpoint).filter(ProjectCheckpoint.id == checkpoint_id).first()
    if not checkpoint:
        raise HTTPException(status_code=404, detail="Checkpoint not found")
    
    if checkpoint.project.owner_id != current_user.id and current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    substep = ProjectSubStep(
        checkpoint_id=checkpoint_id,
        name=data.name,
        is_completed=data.is_completed
    )
    db.add(substep)
    db.commit()
    
    calculate_project_progress(checkpoint.project_id, db)
    
    return {"message": "Added"}

@router.patch("/substeps/{substep_id}")
def toggle_substep(
    substep_id: int,
    data: ToggleRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    substep = db.query(ProjectSubStep).filter(ProjectSubStep.id == substep_id).first()
    if not substep:
        raise HTTPException(status_code=404, detail="Substep not found")
    
    if substep.checkpoint.project.owner_id != current_user.id and current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    substep.is_completed = data.is_completed
    db.commit()
    
    calculate_project_progress(substep.checkpoint.project_id, db)
    
    return {"message": "Updated"}

