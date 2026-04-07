#!/bin/bash

# AI Talent Finder - Quick Start Script
# This script helps you set up and run the application

set -e

echo "================================"
echo "AI Talent Finder - Quick Start"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is installed
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓${NC} Docker found"
else
    echo -e "${RED}✗${NC} Docker not found. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}✓${NC} Docker Compose found"
else
    echo -e "${RED}✗${NC} Docker Compose not found. Please install Docker Compose first."
    exit 1
fi

echo ""
echo "Starting AI Talent Finder..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠${NC} .env file not found!"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠${NC} Please update ANTHROPIC_API_KEY in .env"
fi

# Check if Anthropic API key is set
if grep -q "sk-ant-YOUR_API_KEY_HERE" .env; then
    echo -e "${YELLOW}⚠${NC} ANTHROPIC_API_KEY not configured!"
    echo "   Get your key from: https://console.anthropic.com/"
    echo "   Then update the ANTHROPIC_API_KEY in .env"
    echo ""
fi

# Start Docker containers
echo "Starting Docker containers..."
docker-compose up -d

echo ""
echo -e "${GREEN}✓${NC} Containers started!"
echo ""
echo "🚀 Application URLs:"
echo "   Frontend:      ${GREEN}http://localhost:3000${NC}"
echo "   Backend:       ${GREEN}http://localhost:8000${NC}"
echo "   API Docs:      ${GREEN}http://localhost:8000/docs${NC}"
echo "   Database:      localhost:5432"
echo ""
echo "📝 Useful commands:"
echo "   View logs:     docker-compose logs -f"
echo "   Stop:          docker-compose down"
echo "   Restart:       docker-compose restart"
echo ""
echo "Done! The application is ready to use."
