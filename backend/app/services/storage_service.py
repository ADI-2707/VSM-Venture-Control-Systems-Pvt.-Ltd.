import os
import shutil
import uuid
from typing import Optional
from fastapi import UploadFile
from app.core.config import settings

class StorageService:
    def __init__(self):
        self.storage_type = settings.storage_type
        
        if self.storage_type == "s3":
            try:
                import boto3
                self.s3 = boto3.client(
                    "s3",
                    aws_access_key_id=settings.aws_access_key_id,
                    aws_secret_access_key=settings.aws_secret_access_key,
                    region_name=settings.aws_region
                )
                self.bucket = settings.aws_bucket_name
            except ImportError:
                print("Warning: boto3 is not installed. S3 storage will fail.")
                self.s3 = None
        else:
            self.upload_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
            os.makedirs(self.upload_dir, exist_ok=True)

    def save_file(self, file: UploadFile, prefix: str = "cv") -> str:
        ext = os.path.splitext(file.filename)[1] if file.filename else ".pdf"
        unique_name = f"{prefix}_{uuid.uuid4().hex}{ext}"

        if self.storage_type == "s3" and self.s3 and self.bucket:
            self.s3.upload_fileobj(file.file, self.bucket, unique_name)
            return f"https://{self.bucket}.s3.{settings.aws_region}.amazonaws.com/{unique_name}"
            
        else:
            file_path = os.path.join(self.upload_dir, unique_name)
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            return file_path

    def get_file_path_or_url(self, saved_path: str) -> dict:
        """
        Returns info required to download or redirect to the file.
        Returns {"type": "url", "url": "..."} or {"type": "local", "path": "..."}
        """
        if saved_path.startswith("http"):
            return {"type": "url", "url": saved_path}
            
        if self.storage_type == "local":
            abs_base = os.path.abspath(self.upload_dir)
            abs_path = os.path.abspath(saved_path)
            if not abs_path.startswith(abs_base):
                raise ValueError("Invalid file path")
            return {"type": "local", "path": abs_path}
            
        raise ValueError("Unknown storage path format")

storage = StorageService()
