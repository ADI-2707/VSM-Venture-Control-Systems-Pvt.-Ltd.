from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str
    env: str

    database_url: str

    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    log_level: str = "INFO"
    
    storage_type: str = "local"
    aws_access_key_id: str | None = None
    aws_secret_access_key: str | None = None
    aws_bucket_name: str | None = None
    aws_region: str = "us-east-1"

    class Config:
        env_file = ".env"

settings = Settings()