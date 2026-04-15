from sqlalchemy.orm import Session
from app.modules.user_model import User
from app.core.hash import hash_password


def create_initial_admin(db: Session):
    existing = db.query(User).filter(User.email == "admin@vsm.com").first()

    if existing:
        return

    admin = User(
        first_name="Admin",
        last_name="Root",
        employee_id="EMP001",
        email="admin@vsm.com",
        hashed_password=hash_password("admin123"),
        role="admin",
    )

    db.add(admin)
    db.commit()