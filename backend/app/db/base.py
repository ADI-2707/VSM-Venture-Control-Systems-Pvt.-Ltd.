from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass


from app.modules.user_model import User
from app.modules.job_model import Job
from app.modules.application_model import Application