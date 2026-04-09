from typing import Generator
from sqlalchemy.orm import Session
from .database import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """
    Dependency function for FastAPI to provide database sessions.
    
    Usage in routes:
        from fastapi import Depends
        from app.core.database import get_db
        
        @router.get("/items")
        def read_items(db: Session = Depends(get_db)):
            # Use db session here
            pass
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
