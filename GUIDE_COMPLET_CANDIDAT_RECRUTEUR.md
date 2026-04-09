# 🎯 GUIDE COMPLET - CANDIDAT vs RECRUTEUR

## 📊 VUE D'ENSEMBLE VISUELLE

```
┌─────────────────────────────────────────────────────────────────┐
│                    🏠 AI TALENT FINDER                          │
│                     Landing Page (/)                             │
│                                                                  │
│         👤 CANDIDAT                 🧑‍💼 RECRUTEUR              │
│         Upload CV                   Trouver talents              │
│         [S'inscrire→]               [S'inscrire→]                │
└─────────────────────────────────────────────────────────────────┘
        │                                   │
        └──────────────┬──────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
┌──────────────────┐        ┌──────────────────┐
│  /auth/register  │        │  /auth/register  │
│  ?role=candidate │        │  ?role=recruiter │
│                  │        │                  │
│ • Email          │        │ • Email          │
│ • Password       │        │ • Password       │
│ • Full Name      │        │ • Full Name      │
│ • Role: FIXED    │        │ • Role: FIXED    │
└──────────────────┘        └──────────────────┘
        │                             │
        └──────────────┬──────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
```

---

## 👤 PARCOURS CANDIDAT (CANDIDAT)

### 1️⃣ Inscription
```
📍 Route: /auth/register?role=candidate

Formulaire:
├─ Nom complet: "Alice Developer"
├─ Email: "alice@example.com"
├─ Mot de passe: "SecurePass123"
└─ Rôle: AUTOMATIQUEMENT = "candidate"

Résultat:
✓ Utilisateur créé en BD
✓ JWT token généré
✓ Stock dans localStorage
✓ Redirect → /candidate/dashboard
```

### 2️⃣ Dashboard Candidat
```
📍 Route: /candidate/dashboard

Affiche:
├─ Bienvenue, [Nom]! 👋
├─ 3 Actions rapides:
│  ├─ 📄 Télécharger CV
│  ├─ 🧑 Mon Profil
│  └─ 💼 Opportunités (bientôt)
└─ Stats:
   ├─ CV uploadé: 0/
   ├─ Compétences détectées: 0
   ├─ Profils consultés: 0
   └─ Propositions reçues: 0
```

### 3️⃣ Upload CV
```
📍 Route: /candidate/upload

Fonctionnalité:
├─ Zone drag & drop
├─ Format: PDF uniquement
├─ Taille max: 10MB
└─ Actions:
   ├─ [Parcourir] → Sélectionner fichier
   ├─ [Upload CV] → Envoyer
   └─ ✓ Feedback visuel (succès/erreur)

Après upload:
├─ 🤖 IA analyse automatiquement
├─ Extraction:
│  ├─ Compétences techniques
│  ├─ Compétences soft
│  ├─ Expériences
│  └─ Formations
└─ Profil structuré créé
```

### 4️⃣ Profil Candidat
```
📍 Route: /candidate/profile

Affiche (généré par IA):
├─ 🎯 Compétences Détectées
│  ├─ Python: Advanced
│  ├─ FastAPI: Advanced
│  ├─ React: Intermediate
│  └─ SQL: Intermediate
│
├─ 💼 Expériences
│  ├─ Senior Developer @ Tech Corp (3 ans)
│  └─ Junior Developer @ Startup Inc (2 ans)
│
├─ 🎓 Formations
│  └─ Bachelor in Computer Science
│
└─ ✓ Status: VISIBLE AUX RECRUTEURS

Visibilité:
✓ Profil accessibles par recruteurs
✓ Matching automatique
✓ Peut recevoir propositions
```

---

## 🧑‍💼 PARCOURS RECRUTEUR (RECRUITER)

### 1️⃣ Inscription
```
📍 Route: /auth/register?role=recruiter

Formulaire IDENTIQUE:
├─ Nom complet: "Bob Manager"
├─ Email: "bob@example.com"
├─ Mot de passe: "SecurePass123"
└─ Rôle: AUTOMATIQUEMENT = "recruiter"

Résultat:
✓ Utilisateur créé en BD
✓ JWT token généré
✓ Redirect → /recruiter/dashboard
```

### 2️⃣ Dashboard Recruteur
```
📍 Route: /recruiter/dashboard

FEATURE CLÉE: 2 MODES DE RECHERCHE
┌─────────────────────────────────┐
│  Choix du Mode de Matching      │
├─────────────────────────────────┤
│                                 │
│  🅰️ MODE RECHERCHE               │
│  └─ Décrire les critères        │
│     Matching traditionnel        │
│     Résultats rapides           │
│                                 │
│  🅱️ MODE GÉNÉRATION              │
│  └─ Décrire le besoin           │
│     IA génère profil idéal      │
│     Matching plus pertinent     │
│                                 │
└─────────────────────────────────┘
```

### 3️⃣ Mode A - RECHERCHE (Traditionnel)
```
📍 Actions: /api/matching/criteria + /search

Étapes:

STEP 1: Créer Critères
─────────────────────
POST /api/matching/criteria
{
  "title": "Senior Python Developer",
  "description": "5+ years exp, Cloud expertise",
  "mode": "search",
  "required_skills": [
    {"name": "Python", "weight": 100},
    {"name": "AWS", "weight": 90},
    {"name": "Docker", "weight": 70}
  ]
}

Response: criteria_id = 42

STEP 2: Chercher Candidats
──────────────────────────
POST /api/matching/search/42

Response: Liste triée par score
[
  {
    "candidate_id": 1,
    "full_name": "Alice Developer",
    "email": "alice@example.com",
    "match_score": 92,
    "explanation": "Matched 3/3 skills"
  },
  {
    "candidate_id": 2,
    "full_name": "Bob Coder",
    "email": "bob@example.com",
    "match_score": 87,
    "explanation": "Matched 2/3 skills"
  },
  ...
]

UI AFFICHE:
├─ Champ titre: "Senior Python Developer"
├─ Zone description (textarea)
├─ Compétences: "Python, AWS, Docker"
├─ [🔍 Lancer Recherche]
└─ Résultats (sortis):
   ├─ Alice Developer - 92%
   ├─ Bob Coder - 87%
   └─ Charlie Dev - 78%
```

### 4️⃣ Mode B - GÉNÉRATION (IA)
```
📍 Action: /api/matching/generate-and-match

Étape:

DESCRIPTION DU BESOIN
────────────────────
Je cherche un CTO pour notre startup:
"Visionnaire tech, capable de:
- Diriger une équipe de 5 dev
- Architecturer une plateforme SaaS
- Expérience startup/scale-up
- Aimant les défis"

STEP 1: Générer Profil Idéal
────────────────────────────
POST /api/matching/generate-profile
{
  "job_title": "CTO Startup",
  "description": "[texte ci-dessus]"
}

Response: Profil généré par IA
{
  "ideal_skills": [
    {"name": "Python", "weight": 100, "level": "expert"},
    {"name": "Leadership", "weight": 90, "level": "advanced"},
    {"name": "System Design", "weight": 85, "level": "advanced"},
    {"name": "AWS", "weight": 70, "level": "intermediate"}
  ],
  "ideal_experience_years": 8,
  "ideal_education": "Engineering degree or equiv"
}

STEP 2: Matcher Automatiquement
───────────────────────────────
POST /api/matching/generate-and-match
{
  "job_title": "CTO Startup",
  "description": "[texte]"
}

Response: Profil + Résultats
{
  "ideal_profile": { ... },
  "matches": [
    {
      "candidate_id": 3,
      "full_name": "Diana Expert",
      "email": "diana@example.com",
      "match_score": 96,
      "gap_analysis": "Exceeds requirements"
    },
    ...
  ]
}

UI AFFICHE:
├─ Profil Idéal Généré:
│  ├─ Python: Expert
│  ├─ Leadership: Advanced
│  └─ System Design: Advanced
│
├─ Candidats Matchés:
│  ├─ Diana Expert - 96%
│  ├─ Eve Architect - 89%
│  └─ Frank Leader - 84%
└─ [⭐ Ajouter à shortlist]
```

### 5️⃣ Shortlist
```
📍 Route: /recruiter/shortlist

Affiche:
├─ Titre: "Tes Candidats en Shortlist"
├─ Total: 2 candidats
│
├─ Carte 1:
│  ├─ John Doe
│  ├─ john@example.com
│  ├─ Score: 92%
│  ├─ Ajouté: Il y a 2 jours
│  └─ [Retirer]
│
├─ Carte 2:
│  └─ ...
│
└─ [📥 Exporter en CSV]
   └─ Génère: shortlist_2026-04-09.csv
      ├─ Name,Email,Score,Date
      ├─ John Doe,john@example.com,92,2026-04-07
      └─ ...
```

---

## 🔄 FLUX D'AUTHENTIFICATION DÉTAILLÉ

### Registration Flow
```
User (Frontend)
    │
    ├─ [Click Inscrire]
    │
    └─→ Register Page
         │
         ├─ Choose Role:
         │  ├─ 👤 Candidat → ?role=candidate
         │  └─ 🧑‍💼 Recruteur → ?role=recruiter
         │
         ├─ Fill Form:
         │  ├─ Email
         │  ├─ Password
         │  ├─ Full Name
         │  └─ [S'inscrire]
         │
         └─→ Backend: POST /api/auth/register
             │
             ├─ Validation:
             │  ├─ Email unique? ✓
             │  ├─ Password min 6? ✓
             │  └─ All fields? ✓
             │
             ├─ Create User:
             │  ├─ Hash password (bcrypt)
             │  └─ Save to DB
             │
             ├─ Generate JWT (expires in 30 days)
             │
             └─→ Response:
                 {
                   "access_token": "eyJh...",
                   "token_type": "bearer",
                   "user": {
                     "id": 1,
                     "email": "user@example.com",
                     "full_name": "User Name",
                     "role": "recruiter"
                   }
                 }
         │
         └─ Frontend:
            ├─ Store token in localStorage
            ├─ Redirect based on role:
            │  ├─ candidate → /candidate/dashboard
            │  └─ recruiter → /recruiter/dashboard
            └─ ✓ Logged in!
```

### Login Flow
```
User (Frontend)
    │
    ├─ [Click Connexion]
    │
    └─→ Login Page
         │
         ├─ Fill Form:
         │  ├─ Email
         │  ├─ Password
         │  └─ [Connexion]
         │
         └─→ Backend: POST /api/auth/login
             │
             ├─ Find user by email
             │  └─ EXISTS? → Continue
             │     ELSE → ERROR 401
             │
             ├─ Verify password
             │  └─ MATCH? → Continue
             │     ELSE → ERROR 401
             │
             ├─ Generate JWT
             │
             └─→ Response (same as register)
         │
         └─ Frontend:
            ├─ Store token + redirect
            └─ ✓ Logged in!
```

---

## 🔐 SÉCURITÉ EN DÉTAIL

### Password Hashing
```python
# On inscription:
password = "SecurePass123"
hashed = bcrypt.hash(password)
→ Stocké en BD: $2b$12$...

# On login:
input_password = "SecurePass123"
verify = bcrypt.verify(input_password, hashed)
→ True/False
```

### JWT Token
```
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "sub": "user@example.com",
  "user_id": 1,
  "exp": 1715211600  # 30 days from now
}

Signature:
HMACSHA256(header.payload, SECRET_KEY)

Used as:
Authorization: Bearer eyJh...
```

---

## 📱 RÉSUMÉ INTERFACE

### 👤 Candidat
```
LOGIN
  ↓
DASHBOARD
├─ 📄 Upload CV ────→ Drag & drop zone
├─ 🧑 Profil ────────→ Compétences + Expériences
└─ 💼 Opportunités ──→ (Bientôt) Propositions
```

### 🧑‍💼 Recruteur
```
LOGIN
  ↓
DASHBOARD ← CHOIX MODE
├─ 🅰️ RECHERCHE
│  ├─ Remplir critères
│  ├─ [Lancer recherche]
│  └─ Afficher résultats
│
├─ 🅱️ GÉNÉRATION
│  ├─ Décrire besoin
│  ├─ [Générer + matcher]
│  └─ Afficher profil + résultats
│
└─ ⭐ SHORTLIST
   ├─ Afficher sélections
   └─ [Export CSV]
```

---

## 🎓 POINTS CLÉS À COMPRENDRE

1. **2 Rôles = 2 UX Complètement Différentes**
   - Candidat: Upload CV → Reste passive
   - Recruteur: Recherche active → Matching intelligent

2. **2 Modes Recruteur = 2 Approches**
   - Mode A (Recherche): SQL-like queries
   - Mode B (Génération): IA-powered ideation

3. **Tokens JWT**
   - Stockés côté client (localStorage)
   - Envoyés à chaque requête API
   - Valides 30 jours

4. **Sécurité**
   - Pas de password en clair
   - HTTPS en production
   - CORS pour frontend uniquement

---

## ✅ CHECKLIST DE TEST

- [ ] Inscription candidat
- [ ] Inscription recruteur
- [ ] Connexion après déconnexion
- [ ] JWT token valide
- [ ] /auth/me retourne user correct
- [ ] Mode 1 (Recherche) fonctionne
- [ ] Mode 2 (Génération) fonctionne
- [ ] Upload CV candidat
- [ ] Shortlist recruteur
- [ ] Export CSV

---

✨ C'est tout! Tu as maintenant la complete infrastructure prête. Bon succès!
