# 🚀 Guide Complet - Démarrage Local (Sans Docker)

**Votre base de données PostgreSQL est prête!** Voici comment démarrer l'application en local.

---

## 📋 Prérequis (Vérifiés)

- ✅ PostgreSQL 14 - Installé et en cours d'exécution
- ✅ Base de données `ai_talent_finder` - Créée
- ✅ Python 3.11+ - À jour
- ✅ Node.js & npm - Nécessaires pour le frontend
- ✅ Virtual Environment - Activé (`.venv`)

---

## 🎯 Étape par Étape

### Étape 1: Vérifier les prérequis

**Vérifier Python:**

```bash
python --version
# Doit être 3.11+
```

**Vérifier npm:**

```bash
npm --version
node --version
```

**Vérifier PostgreSQL:**

```bash
psql -U postgres -c "SELECT version();"
```

---

### Étape 2: Démarrer le Backend

**Ouvrez Terminal 1 et exécutez:**

```bash
cd backend
python -m pip install -r requirements.txt  # Si pas déjà fait
python -m uvicorn app.main:app --reload
```

**Vous devriez voir:**

```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

**Testez le backend:**

```bash
# Dans un autre terminal:
curl http://localhost:8000/health
# Résultat: {"status":"ok","version":"1.0.0"}
```

---

### Étape 3: Démarrer le Frontend

**Ouvrez Terminal 2 et exécutez:**

```bash
cd frontend
npm install  # Si pas déjà fait
npm run dev
```

**Vous devriez voir:**

```
  ▲ Next.js 16.2.1
  - Local:        http://localhost:3000
```

---

## 🌐 Accès à l'Application

| Service               | URL                        | Statut |
| --------------------- | -------------------------- | ------ |
| **Frontend**          | http://localhost:3000      | ✅     |
| **Backend API**       | http://localhost:8000      | ✅     |
| **API Documentation** | http://localhost:8000/docs | ✅     |
| **Database**          | localhost:5432             | ✅     |

---

## 📊 Tester les API

### Via Swagger UI (Recommandé)

1. Allez sur http://localhost:8000/docs
2. Testez directement les endpoints
3. Exemples disponibles pour chaque route

### Via Terminal

**Créer un candidat:**

```bash
curl -X POST http://localhost:8000/candidates/ \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Jean Dupont",
    "email": "jean@example.com",
    "phone": "+33612345678"
  }'
```

**Lister les candidats:**

```bash
curl http://localhost:8000/candidates/
```

**Créer une compétence:**

```bash
curl -X POST http://localhost:8000/skills/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Python", "category": "tech"}'
```

---

## 🛠️ Vérification Rapide

**Backend prêt?**

```bash
curl http://localhost:8000/health && echo ""
```

**Frontend prêt?**

```bash
curl http://localhost:3000 && echo ""
```

**Database connectée?**

```bash
curl http://localhost:8000/docs
# Si la page Swagger s'affiche, tout fonctionne!
```

---

## ⚙️ Configuration

### Fichier `.env` (Mis à jour)

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_talent_finder

# Backend
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

# ⚠️ OBLIGATOIRE: Votre clé Anthropic
ANTHROPIC_API_KEY=sk-ant-YOUR_API_KEY_HERE
```

**À faire:** Remplacer `YOUR_API_KEY_HERE` par votre vraie clé d'Anthropic.

---

## 📂 Structure du Projet

```
Backend (Terminal 1):
  backend/
  ├── app/
  │   ├── main.py              ← Point d'entrée FastAPI
  │   ├── api/                 ← Routes API
  │   │   ├── candidates.py
  │   │   ├── skills.py
  │   │   ├── jobs.py
  │   │   └── matching.py
  │   ├── models/models.py     ← Modèles de base de données
  │   └── core/
  │       ├── database.py      ← Configuration DB
  │       └── dependencies.py

Frontend (Terminal 2):
  frontend/
  ├── src/
  │   ├── app/                 ← Pages Next.js
  │   │   └── page.tsx
  │   └── services/            ← Clients API
  │       ├── api.ts
  │       ├── candidates.ts
  │       ├── skills.ts
  │       ├── jobs.ts
  │       └── matching.ts
  └── next.config.ts
```

---

## 🔍 Endpoints Disponibles

### Candidats

- `GET /candidates/` - Lister tous les candidats
- `POST /candidates/` - Créer un candidat
- `GET /candidates/{id}` - Récupérer un candidat
- `PUT /candidates/{id}` - Mettre à jour un candidat
- `DELETE /candidates/{id}` - Supprimer un candidat
- `POST /candidates/upload` - Upload un CV

### Compétences

- `GET /skills/` - Lister toutes les compétences
- `POST /skills/` - Créer une compétence
- `GET /skills/{id}` - Récupérer une compétence
- `DELETE /skills/{id}` - Supprimer une compétence

### Critères de Poste

- `GET /jobs/` - Lister tous les critères
- `POST /jobs/` - Créer un critère
- `GET /jobs/{id}` - Récupérer un critère
- `PUT /jobs/{id}` - Mettre à jour un critère
- `DELETE /jobs/{id}` - Supprimer un critère

### Matching

- `GET /matching/results` - Lister les résultats de matching
- `POST /matching/calculate/{candidate_id}/{criteria_id}` - Calculer un match
- `DELETE /matching/results/{id}` - Supprimer un résultat

---

## 🚨 Dépannage

### Backend ne démarre pas

**Erreur: `ModuleNotFoundError`**

```bash
pip install -r requirements.txt
```

**Erreur: `Database refused connection`**

```bash
# Vérifier PostgreSQL
psql -U postgres -c "SELECT 1"

# Si ça ne marche pas, redémarrer:
brew services restart postgresql
```

**Erreur: `Port 8000 already in use`**

```bash
# Trouver et tuer le processus:
lsof -i :8000
kill -9 <PID>
```

### Frontend ne démarre pas

**Erreur: `npm: command not found`**

```bash
# Installer Node.js
brew install node

# Vérifier:
node --version
npm --version
```

**Erreur: `Port 3000 already in use`**

```bash
# Tuer le processus:
lsof -i :3000
kill -9 <PID>
```

### Problèmes de connexion

**L'API frontend ne peut pas atteindre le backend:**

- Vérifiez que `NEXT_PUBLIC_API_URL=http://localhost:8000` dans `frontend/.env.local`
- Vérifiez que le backend tourne sur le port 8000
- Vérifiez les CORS dans `backend/.env`: `ALLOWED_ORIGINS=http://localhost:3000`

---

## 📝 Notes Importantes

1. **Terminal 1 doit rester ouvert** - C'est le backend
2. **Terminal 2 doit rester ouvert** - C'est le frontend
3. **PostgreSQL doit être en cours d'exécution**
4. **Utilisez `--reload`** pour voir les changements en temps réel

---

## ✅ Checklist de Démarrage

- [ ] PostgreSQL en cours d'exécution
- [ ] Base de données `ai_talent_finder` créée
- [ ] Terminal 1: Backend démarré sur http://localhost:8000
- [ ] Terminal 2: Frontend démarré sur http://localhost:3000
- [ ] http://localhost:8000/health répond
- [ ] http://localhost:8000/docs accessible
- [ ] http://localhost:3000 accessible

---

## 🎯 Prochaines Étapes

1. **Tester l'API** via http://localhost:8000/docs
2. **Créer des données test** (candidats, compétences, jobs)
3. **Construire le frontend** - Remplacer le boilerplate
4. **Ajouter l'authentification** - Routes de login
5. **Implémenter le matching** - Algorithme de similarité

---

## 💡 Tips

- Utilisez `npm run dev` en mode watch pour voir les changements instantanés
- Utilisez `--reload` avec uvicorn pour hot-reload Python
- Les logs du backend s'affichent dans Terminal 1
- Les logs du frontend s'affichent dans Terminal 2

**Bonne codage! 🚀**
