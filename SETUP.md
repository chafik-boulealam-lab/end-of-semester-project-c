# AI Talent Finder - Setup and Installation Guide

## ✅ Configuration Status

All backend and frontend configurations have been completed successfully!

## 📋 Prerequisites

- **Python 3.11+** (for backend development)
- **Node.js 20+** (for frontend)
- **PostgreSQL 16** (or Docker for containerized setup)
- **Docker & Docker Compose** (optional, for containerized setup)

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

```bash
# From the project root directory
docker-compose up -d

# The application will be available at:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# Database: localhost:5432
```

### Option 2: Local Development

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment (if not already created)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Ensure database is running (PostgreSQL)
# Update DATABASE_URL in .env if needed

# Run migrations (if applicable)
alembic upgrade head

# Start the server
uvicorn app.main:app --reload
```

Backend will be available at: **http://localhost:8000**

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:3000**

## 🔧 Configuration Files

### Backend Environment (.env)

Located in the root directory. Key variables:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_talent_finder

# API Configuration
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

# Anthropic API (Required for CV extraction)
ANTHROPIC_API_KEY=sk-ant-YOUR_API_KEY_HERE

# Other settings
SPACY_MODEL=en_core_web_sm
CV_UPLOAD_DIR=./uploads/cvs
```

**Important:** Set `ANTHROPIC_API_KEY` from https://console.anthropic.com/

### Frontend Environment (.env.local)

Located in `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=AI Talent Finder
NODE_ENV=development
```

## 📚 API Endpoints

### Candidates

- `GET /candidates/` - List all candidates
- `GET /candidates/{id}` - Get specific candidate
- `POST /candidates/` - Create candidate
- `PUT /candidates/{id}` - Update candidate
- `DELETE /candidates/{id}` - Delete candidate
- `POST /candidates/upload` - Upload CV file

### Skills

- `GET /skills/` - List all skills
- `GET /skills/?category=tech` - Filter by category
- `GET /skills/{id}` - Get specific skill
- `POST /skills/` - Create skill
- `DELETE /skills/{id}` - Delete skill

### Job Criteria

- `GET /jobs/` - List all job criteria
- `GET /jobs/{id}` - Get specific job criteria
- `POST /jobs/` - Create job criteria
- `PUT /jobs/{id}` - Update job criteria
- `DELETE /jobs/{id}` - Delete job criteria

### Matching

- `GET /matching/results` - List all matches
- `GET /matching/results/{id}` - Get specific match
- `POST /matching/calculate/{candidate_id}/{criteria_id}` - Calculate match
- `DELETE /matching/results/{id}` - Delete match

### Health

- `GET /health` - Health check endpoint

## 🗄️ Database Schema

The database includes the following main tables:

- **users** - Admin and recruiter accounts
- **candidates** - Candidate profiles
- **skills** - Available skills (tech, soft, language)
- **candidate_skills** - Skills associated with candidates
- **experiences** - Work experience records
- **educations** - Education records
- **job_criteria** - Job position requirements
- **criteria_skills** - Required skills for jobs
- **match_results** - Matching scores between candidates and jobs
- **favorites** - Recruiter's favorite candidates

## 🐛 Troubleshooting

### Backend Won't Start

1. **Check Python version:** `python --version` (requires 3.11+)
2. **Check dependencies:** `pip list | grep fastapi`
3. **Check database connection:** Ensure PostgreSQL is running
4. **Check DATABASE_URL:** Should be accessible from your environment

### Frontend Won't Start

1. **Clear cache:** `rm -rf .next node_modules`
2. **Reinstall:** `npm install`
3. **Check API URL:** `NEXT_PUBLIC_API_URL` must point to backend

### Database Connection Issues

1. **Check PostgreSQL is running**: `psql -U postgres`
2. **Verify DATABASE_URL format**: `postgresql://user:password@host:port/database`
3. **For Docker**: Use `db` as hostname instead of `localhost`

### API Errors

1. Check backend logs: `docker logs ai-talent-finder-backend-1`
2. Check frontend browser console for request errors
3. Verify CORS is configured correctly in backend

## 📝 Development Workflow

### Adding New Features

1. **Backend:** Create route in `app/api/[feature].py`
2. **Frontend:** Create API client in `frontend/src/services/[feature].ts`
3. **Frontend:** Create components in `frontend/src/components/`

### Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head
```

### Code Quality

```bash
# Backend linting (install pylint, black, etc.)
black app/
pylint app/

# Frontend linting
npm run lint
```

## 🚢 Production Deployment

1. Update environment variables
2. Set `DEBUG=false`
3. Change `SECRET_KEY` to a secure value
4. Configure allowed origins in `ALLOWED_ORIGINS`
5. Use a production ASGI server (Gunicorn)
6. Set up proper SSL/TLS certificates
7. Configure PostgreSQL with strong credentials

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Review API documentation at `http://localhost:8000/docs`
3. Check backend logs: `docker logs`
4. Check frontend console: F12 in browser

## ✨ Next Steps

1. Replace boilerplate in `frontend/src/app/page.tsx`
2. Implement authentication routes
3. Create candidate upload interface
4. Implement matching algorithm
5. Add error handling and validation
6. Deploy to production

Enjoy building AI Talent Finder! 🎉
