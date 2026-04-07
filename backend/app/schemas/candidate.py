from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CandidateBase(BaseModel):
    full_name: str
    email: str
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None

class CandidateCreate(CandidateBase):
    cv_path: Optional[str] = None
    raw_text: Optional[str] = None

class CandidateUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    cv_path: Optional[str] = None
    raw_text: Optional[str] = None

class CandidateResponse(CandidateBase):
    id: int
    cv_path: Optional[str]
    raw_text: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True