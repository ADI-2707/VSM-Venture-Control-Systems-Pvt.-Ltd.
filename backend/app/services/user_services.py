from sqlalchemy.orm import Session
from app.modules.user_model import User
from app.core.hash import hash_password


def create_user(db: Session, user_data):
    user = User(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        employee_id=user_data.employee_id,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
        role=user_data.role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()