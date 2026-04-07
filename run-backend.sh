#!/bin/bash

# Backend startup script

cd /Users/elhadjibassirousy/Desktop/AI-Talent-Finder/backend
source /Users/elhadjibassirousy/Desktop/AI-Talent-Finder/.venv/bin/activate
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
