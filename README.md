# 🧠 AI TALENT FINDER - Plateforme de Matching Candidat/Recruteur

**Version:** 1.0.0  
**Status:** ✅ MVP Production Ready  
**Date:** Avril 2026  

---

## 🎯 À PROPOS

AI Talent Finder est une plateforme innovante qui connecte les candidats avec les recruteurs en utilisant deux approches de matching distinctes:

- **👤 Parcours Candidat:** Upload CV → Profil structuré → Visible aux recruteurs
- **🧑‍💼 Parcours Recruteur:** 
  - 🅰️ Mode Recherche (approche traditionnelle)
  - 🅱️ Mode Génération (approche IA-powered)

**Créé par:** Yani Ilyass, Gopou Dore, Junior Sy, ElHadj Bassiro, Youbi Omar  
**Année:** 3ème année, Groupe A

---

## 🚀 DÉMARRAGE RAPIDE (5 MIN)

### 1. Backend
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend (nouveau terminal)
```bash
cd frontend
npm run dev
```

### 3. Accéder
**http://localhost:3000**

---

## ✅ STATUT DU PROJET

### Étape 2: Backend Infrastructure ✅ COMPLÈTE
- 10 modèles SQLAlchemy
- FastAPI + SQLAlchemy + PostgreSQL
- Security (bcrypt + JWT)
- 15+ dépendances installées

### Étape 3: Authentification ✅ COMPLÈTE
- POST /api/auth/register - Inscription avec rôle
- POST /api/auth/login - Connexion
- GET /api/auth/me - Utilisateur courant
- Support 3 rôles: candidate, recruiter, admin

### Étape 4: Frontend ✅ COMPLÈTE
- Landing page avec 2 parcours
- Dashboard candidat (upload, profil)
- Dashboard recruteur (2 modes matching)
- Shortlist et export
- Auth system avec JWT

---

## 📚 DOCUMENTATION

**Lire en priorité:**
1. [COMPLETION_REPORT.md](./COMPLETION_REPORT.md) - Résumé exécutif
2. [ETAPE3_COMPLETE.md](./ETAPE3_COMPLETE.md) - Guide technique
3. [GUIDE_COMPLET_CANDIDAT_RECRUTEUR.md](./GUIDE_COMPLET_CANDIDAT_RECRUTEUR.md) - Workflows

---

## 🎯 FEATURES

✅ **Candidat:**
- Register avec email/password/name
- Upload CV (PDF)
- AI extracts skills automatiquement
- Profil structuré visible aux recruteurs

✅ **Recruteur:**
- Register avec email/password/name
- Mode 1 (Recherche): Critères → Candidats
- Mode 2 (Génération): Besoins texte → Profil IA → Matching
- Shortlist favoris
- Export CSV

✅ **Sécurité:**
- Passwords hachés (bcrypt)
- JWT tokens (30 jours)
- CORS configuré
- Email unique

---

## 📁 STRUCTURE

```
backend/
├── app/
│   ├── api/
│   │   ├── auth.py ..................... ✅ IMPLÉMENTÉ
│   │   └── matching.py ................ ✅ 2 modes
│   ├── models/ ........................ ✅ 10 modèles
│   ├── schemas/user.py ............... ✅ Créé
│   └── main.py ....................... ✅ Routes importées
│
frontend/src/
├── app/
│   ├── page.tsx ...................... ✅ Landing
│   ├── auth/register ................. ✅ Choix rôle
│   ├── candidate/ .................... ✅ Dashboard + upload
│   └── recruiter/ .................... ✅ 2 modes matching
└── services/
    └── auth.ts ...................... ✅ Mis à jour
```

---

## 🔐 API ENDPOINTS

```
POST   /api/auth/register         Register user
POST   /api/auth/login            Login user  
GET    /api/auth/me               Get current user

POST   /api/matching/criteria      Create job criteria
POST   /api/matching/search/{id}   Mode 1: Search
POST   /api/matching/generate-profile  Mode 2: Generate
POST   /api/matching/generate-and-match Mode 2: Complete
```

---

## 🧪 TEST RAPIDE

```bash
# Register candidat
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"pass123","full_name":"Alice","role":"candidate"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"pass123"}'

# Get me (replace TOKEN)
curl http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

---

## 💻 REQUIREMENTS

- Python 3.12+
- Node.js 22+
- PostgreSQL 14+

---

## 🚀 PRODUCTION

```bash
# Docker
docker-compose up -d

# Manual: See COMPLETION_REPORT.md
```

---

## 📞 TEAM

- **Backend Lead:** [Your name]
- **Frontend Lead:** [Your name]
- **Database:** ElHadj Bassiro

---

## 📝 LICENSE

MIT License

---

**Status: ✅ Ready for Étape 5 (CV Processing + Advanced Matching)**
