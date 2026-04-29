from pydantic_settings import BaseSettings
from pydantic import field_validator

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

    @field_validator("secret_key")
    @classmethod
    def secret_key_must_be_strong(cls, v: str) -> str:
        if v in ("supersecretkey", "changeme", "secret", ""):
            raise ValueError(
                "SECRET_KEY is a known weak placeholder. "
                "Generate one with: openssl rand -hex 32"
            )
        if len(v) < 32:
            raise ValueError(
                f"SECRET_KEY must be at least 32 characters, got {len(v)}. "
                "Generate one with: openssl rand -hex 32"
            )
        return v

    class Config:
        env_file = ".env"

settings = Settings()