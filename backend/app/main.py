import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from root .env file
env_path = Path(__file__).parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

from app.core.database import Base, engine
from app.models.models import User, Candidate, Skill, CandidateSkill, Experience, Education, JobCriteria, CriteriaSkill, MatchResult, Favorite
from app.api import auth, candidates, skills, jobs, matching

# Create database tables on startup
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title="AI Talent Finder", version="1.0.0")

# Configure CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Include routers (Auth must be first)
app.include_router(auth.router)
app.include_router(candidates.router)
app.include_router(skills.router)
app.include_router(jobs.router)
app.include_router(matching.router)

# Health check endpoint
@app.get("/health")
def health():
    """Health check endpoint"""
    return {"status": "ok", "version": "1.0.0"}
