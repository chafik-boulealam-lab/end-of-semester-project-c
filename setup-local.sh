#!/bin/bash

# AI Talent Finder - Local Development Setup & Run
# This script starts the application locally without Docker

set -e

echo "================================"
echo "AI Talent Finder - Local Setup"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check .env file
if [ ! -f .env ]; then
    echo -e "${RED}Error: .env file not found${NC}"
    exit 1
fi

# Check PostgreSQL
echo "Checking PostgreSQL..."
if ! psql -U postgres -c "SELECT 1" > /dev/null 2>&1; then
    echo -e "${RED}Error: PostgreSQL not running${NC}"
    echo "Start PostgreSQL with: brew services start postgresql"
    exit 1
fi
echo -e "${GREEN}✓${NC} PostgreSQL is running"

# Check if database exists
if ! psql -U postgres -c "SELECT 1" -d ai_talent_finder > /dev/null 2>&1; then
    echo "Creating database..."
    psql -U postgres -c "CREATE DATABASE ai_talent_finder;"
    echo -e "${GREEN}✓${NC} Database created"
else
    echo -e "${GREEN}✓${NC} Database exists"
fi

echo ""
echo "Setup complete!"
echo ""
echo "To start the application, open TWO terminals and run:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  python -m uvicorn app.main:app --reload"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then visit:"
echo "  Frontend:  http://localhost:3000"
echo "  Backend:   http://localhost:8000"
echo "  API Docs:  http://localhost:8000/docs"
