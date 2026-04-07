@echo off
REM AI Talent Finder - Quick Start Script for Windows
REM This script helps you set up and run the application

setlocal enabledelayedexpansion

cls
echo ================================
echo AI Talent Finder - Quick Start
echo ================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo Error: Docker not found. Please install Docker first.
    exit /b 1
)
echo ✓ Docker found

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo Error: Docker Compose not found. Please install Docker Compose first.
    exit /b 1
)
echo ✓ Docker Compose found

echo.
echo Starting AI Talent Finder...
echo.

REM Check if .env exists
if not exist .env (
    echo ⚠ .env file not found!
    echo Creating .env from .env.example...
    copy .env.example .env
    echo ⚠ Please update ANTHROPIC_API_KEY in .env
)

REM Check if Anthropic API key is set
findstr /M "sk-ant-YOUR_API_KEY_HERE" .env >nul
if not errorlevel 1 (
    echo ⚠ ANTHROPIC_API_KEY not configured!
    echo    Get your key from: https://console.anthropic.com/
    echo    Then update the ANTHROPIC_API_KEY in .env
    echo.
)

REM Start Docker containers
echo Starting Docker containers...
docker-compose up -d

echo.
echo ✓ Containers started!
echo.
echo Application URLs:
echo    Frontend:      http://localhost:3000
echo    Backend:       http://localhost:8000
echo    API Docs:      http://localhost:8000/docs
echo    Database:      localhost:5432
echo.
echo Useful commands:
echo    View logs:     docker-compose logs -f
echo    Stop:          docker-compose down
echo    Restart:       docker-compose restart
echo.
echo Done! The application is ready to use.
