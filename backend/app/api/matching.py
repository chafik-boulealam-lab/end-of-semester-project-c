"""Matching API routes"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import datetime

from app.core.dependencies import get_db
from app.models.models import MatchResult

router = APIRouter(prefix="/matching", tags=["matching"])


class MatchResultResponse(BaseModel):
    id: int
    criteria_id: int
    candidate_id: int
    score: float
    explanation: str = None
    created_at: datetime

    class Config:
        from_attributes = True


@router.get("/results", response_model=List[MatchResultResponse])
def get_match_results(
    candidate_id: int = None,
    criteria_id: int = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get match results, optionally filtered by candidate or criteria"""
    query = db.query(MatchResult)
    
    if candidate_id:
        query = query.filter(MatchResult.candidate_id == candidate_id)
    if criteria_id:
        query = query.filter(MatchResult.criteria_id == criteria_id)
    
    results = query.offset(skip).limit(limit).all()
    return results


@router.get("/results/{match_id}", response_model=MatchResultResponse)
def get_match_result(
    match_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific match result"""
    result = db.query(MatchResult).filter(MatchResult.id == match_id).first()
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match result not found"
        )
    return result


@router.post("/calculate/{candidate_id}/{criteria_id}")
def calculate_match(
    candidate_id: int,
    criteria_id: int,
    db: Session = Depends(get_db)
):
    """Calculate match score between a candidate and a job criteria"""
    # Check if candidate and criteria exist
    from app.models.models import Candidate, JobCriteria
    
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate not found"
        )
    
    criteria = db.query(JobCriteria).filter(JobCriteria.id == criteria_id).first()
    if not criteria:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job criteria not found"
        )
    
    # Check if match already exists
    existing_match = db.query(MatchResult).filter(
        MatchResult.candidate_id == candidate_id,
        MatchResult.criteria_id == criteria_id
    ).first()
    
    if existing_match:
        return {
            "message": "Match already exists",
            "match_id": existing_match.id,
            "score": existing_match.score
        }
    
    # Calculate match score (simplified)
    # In real implementation, this would use NLP and ML models
    score = 0.75  # Placeholder
    
    match_result = MatchResult(
        candidate_id=candidate_id,
        criteria_id=criteria_id,
        score=score
    )
    db.add(match_result)
    db.commit()
    db.refresh(match_result)
    
    return {
        "message": "Match calculated successfully",
        "match_id": match_result.id,
        "score": match_result.score
    }


@router.delete("/results/{match_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_match_result(
    match_id: int,
    db: Session = Depends(get_db)
):
    """Delete a match result"""
    result = db.query(MatchResult).filter(MatchResult.id == match_id).first()
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match result not found"
        )
    
    db.delete(result)
    db.commit()
    return None
