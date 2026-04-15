from sqlalchemy.orm import Session
from app.services.user_services import get_user_by_email
from app.core.hash import verify_password
from app.core.security import create_access_token


def login_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    token = create_access_token({"sub": str(user.id), "role": user.role})

    return {"access_token": token, "user": user}