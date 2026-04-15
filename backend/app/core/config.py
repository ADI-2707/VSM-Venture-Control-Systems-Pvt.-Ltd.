from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str
    env: str

    database_url: str

    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    log_level: str = "INFO"

    class Config:
        env_file = ".env"

settings = Settings()