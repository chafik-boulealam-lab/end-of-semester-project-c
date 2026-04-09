# 🚀 DÉMARRAGE RAPIDE

Après configuration, voici comment démarrer le projet complet en 3 étapes.

## Option 1️⃣ : Docker Compose (RECOMMANDÉ)

```bash
# Depuis la racine du projet
docker-compose up
```

**Attendu** :

- PostgreSQL démarre sur le port 5432
- Backend démarre sur le port 8000
- Frontend démarre sur le port 3000

**Accès** :

- Frontend: http://localhost:3000
- Backend: http://localhost:8000/docs
- Database: localhost:5432

---

## Option 2️⃣ : Démarrage Manuel (3 terminaux)

### Terminal 1 - Database

```bash
docker run --name ai-talent-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=ai_talent_finder \
  -p 5432:5432 \
  postgres:16
```

### Terminal 2 - Backend

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

Vérifiez : http://localhost:8000/health (doit répondre `{"status":"ok"}`)

### Terminal 3 - Frontend

```bash
cd frontend
npm run dev
```

Vérifiez : http://localhost:3000 (doit rediriger vers login)

---

## 🔍 Vérifications Rapides

### Backend

```bash
# Health check
curl http://localhost:8000/health

# Swagger UI
# Accédez à: http://localhost:8000/docs
```

### Frontend

```bash
# Build check
cd frontend && npm run build

# Dev check
npm run dev
```

---

## 📋 À Faire Avant de Démarrer

✅ `.env` doit exister à la racine :

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_talent_finder
SECRET_KEY=dev-secret-key-...
```

✅ `.env.local` doit exister dans `frontend/` :

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

✅ Backend venv installé :

```bash
cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt
```

✅ Frontend npm installée :

```bash
cd frontend && npm install
```

---

## 🛑 Troubleshooting

### "Port déjà utilisé"

```bash
# Tuer les processus
lsof -i :8000 | grep LISTEN && kill -9 <PID>
lsof -i :3000 | grep LISTEN && kill -9 <PID>
lsof -i :5432 | grep LISTEN && kill -9 <PID>
```

### "Module not found"

```bash
# Backend
cd backend && pip install -r requirements.txt

# Frontend
cd frontend && npm install --force
```

### "DATABASE_URL not set"

```bash
# Vérifier le fichier .env
cat .env | grep DATABASE_URL

# Si vide, ajouter :
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_talent_finder
```

---

## 📊 Configuration Actuelle

- ✅ Backend FastAPI configuré
- ⏳ Authentification à implémenter (Étape 3)
- ✅ Frontend Next.js configuré

### À Faire (Étape 3)

Votre collègue doit implémenter :

1. POST /auth/register
2. POST /auth/login
3. GET /auth/me

Voir `GUIDE_IMPLEMENTATION_ETAPE3.md` pour les détails.

---

## 🎯 Prochaines Étapes

1. Démarrer le projet (Docker ou manuel)
2. Partager le guide Étape 3 avec votre collègue
3. Une fois authentification implémentée → Tout fonctionne ! ✨

---

**État** : ✅ Configuration complète Étapes 2 & 4
