"""Job Criteria API routes"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import datetime

from app.core.dependencies import get_db
from app.models.models import JobCriteria

router = APIRouter(prefix="/api/jobs", tags=["jobs"])


class JobCriteriaCreate(BaseModel):
    title: str
    description: str
    recruiter_id: int = 1  # Default to admin for now


class JobCriteriaUpdate(BaseModel):
    title: str = None
    description: str = None


class JobCriteriaResponse(BaseModel):
    id: int
    recruiter_id: int
    title: str
    description: str
    created_at: datetime

    class Config:
        from_attributes = True


@router.get("/", response_model=List[JobCriteriaResponse])
def get_job_criteria(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all job criteria"""
    criteria = db.query(JobCriteria).offset(skip).limit(limit).all()
    return criteria


@router.get("/{job_id}", response_model=JobCriteriaResponse)
def get_job_criteria_by_id(
    job_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific job criteria by ID"""
    criteria = db.query(JobCriteria).filter(JobCriteria.id == job_id).first()
    if not criteria:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job criteria not found"
        )
    return criteria


@router.post("/", response_model=JobCriteriaResponse)
def create_job_criteria(
    criteria: JobCriteriaCreate,
    db: Session = Depends(get_db)
):
    """Create a new job criteria"""
    db_criteria = JobCriteria(
        recruiter_id=criteria.recruiter_id,
        title=criteria.title,
        description=criteria.description
    )
    db.add(db_criteria)
    db.commit()
    db.refresh(db_criteria)
    return db_criteria


@router.put("/{job_id}", response_model=JobCriteriaResponse)
def update_job_criteria(
    job_id: int,
    criteria: JobCriteriaUpdate,
    db: Session = Depends(get_db)
):
    """Update a job criteria"""
    db_criteria = db.query(JobCriteria).filter(JobCriteria.id == job_id).first()
    if not db_criteria:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job criteria not found"
        )
    
    if criteria.title:
        db_criteria.title = criteria.title
    if criteria.description:
        db_criteria.description = criteria.description
    
    db.commit()
    db.refresh(db_criteria)
    return db_criteria


@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job_criteria(
    job_id: int,
    db: Session = Depends(get_db)
):
    """Delete a job criteria"""
    criteria = db.query(JobCriteria).filter(JobCriteria.id == job_id).first()
    if not criteria:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job criteria not found"
        )
    
    db.delete(criteria)
    db.commit()
    return None
