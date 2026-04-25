from sqlalchemy.orm import Session
from app.modules.user_model import User
from app.core.hash import hash_password


def create_initial_admin(db: Session):
    
    if not db.query(User).filter(User.email == "admin@vsm.com").first():
        db.add(User(
            first_name="Admin",
            last_name="Root",
            employee_id="EMP001",
            email="admin@vsm.com",
            hashed_password=hash_password("admin123"),
            role="admin",
        ))

    if not db.query(User).filter(User.email == "analyst@vsm.com").first():
        db.add(User(
            first_name="Test",
            last_name="Analyst",
            employee_id="EMP002",
            email="analyst@vsm.com",
            hashed_password=hash_password("analyst123"),
            role="user",
        ))

    db.commit()