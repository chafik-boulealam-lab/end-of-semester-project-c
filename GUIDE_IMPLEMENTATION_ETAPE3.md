# 🔐 Guide d'Implémentation - Étape 3 (Authentification)

## Résumé

Votre collègue doit implémenter les 3 endpoints manquants dans `backend/app/api/auth.py` :

1. `POST /auth/register` - Enregistrement utilisateur
2. `POST /auth/login` - Connexion et génération de token
3. `GET /auth/me` - Récupération de l'utilisateur actuel

---

## 🗂️ Fichiers à Modifier

### Principal

- `backend/app/api/auth.py` - Les 3 endpoints (SKELETON prêt)

### Ressources Disponibles

- `backend/app/core/security.py` - Fonctions de cryptage
- `backend/app/models/models.py` - Modèle User
- `backend/app/schemas/user.py` - Schémas validation
- `backend/app/core/dependencies.py` - Injection de dépendances

---

## 📝 Implémentation Détaillée

### 1. `POST /auth/register`

**Objectif** : Créer un nouvel utilisateur

**Body Request** :

```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "full_name": "John Doe",
  "role": "recruiter"
}
```

**Response** :

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "recruiter",
    "created_at": "2026-04-09T10:00:00"
  }
}
```

**Logique** :

```python
@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user_create: UserCreate, db: Session = Depends(get_db)) -> Token:
    """Register a new user"""
    # TODO:
    # 1. Check if email already exists in database
    #    - if exists: raise HTTPException(400, "Email already registered")
    # 2. Hash the password using get_password_hash()
    # 3. Create new User object with hashed password
    # 4. Add to database and commit
    # 5. Generate access token: create_access_token({"sub": user_create.email, "user_id": db_user.id})
    # 6. Return Token with access_token, token_type, user info
    pass
```

### 2. `POST /auth/login`

**Objectif** : Générer un token JWT pour un utilisateur

**Body Request** :

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response** :

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": { ... }
}
```

**Logique** :

```python
@router.post("/login", response_model=Token)
async def login(user_login: UserLogin, db: Session = Depends(get_db)) -> Token:
    """User login - generate JWT token"""
    # TODO:
    # 1. Find user by email in database
    # 2. If not found: raise HTTPException(401, "Invalid credentials")
    # 3. Verify password using verify_password(plain_password, hashed_password)
    # 4. If wrong password: raise HTTPException(401, "Invalid credentials")
    # 5. Generate access token: create_access_token({"sub": user.email, "user_id": user.id})
    # 6. Return Token with token, user info
    pass
```

### 3. `GET /auth/me`

**Objectif** : Récupérer l'utilisateur connecté

**Headers** :

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Response** :

```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "recruiter",
  "created_at": "2026-04-09T10:00:00"
}
```

**Logique** :

```python
async def get_current_user(
    token: str = Depends(get_token_from_header),
    db: Session = Depends(get_db),
) -> UserResponse:
    """Get current authenticated user"""
    # TODO:
    # 1. Decode token using decode_token(token)
    # 2. If token invalid: raise HTTPException(401, "Invalid token")
    # 3. Extract user_id from decoded token
    # 4. Query database for User by id
    # 5. If not found: raise HTTPException(401, "User not found")
    # 6. Return UserResponse with user data
    pass
```

---

## 🔧 Fonctions Disponibles

Tous les imports sont déjà dans `auth.py` :

```python
# Importez ces depuis les modules fournis
from app.core.security import (
    verify_password,        # bool verify_password(plain, hashed)
    get_password_hash,      # str get_password_hash(password)
    create_access_token,    # str create_access_token(data: dict)
    decode_token,           # TokenData decode_token(token)
)

from app.models.models import User  # User model

from app.core.dependencies import get_db  # Session dependency
```

---

## 🧪 Test avec Postman

### Test 1 : Registration

```
POST http://localhost:8000/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123!@#",
  "full_name": "Test User",
  "role": "recruiter"
}
```

**Résultat attendu** : 201 Created + token

### Test 2 : Login

```
POST http://localhost:8000/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123!@#"
}
```

**Résultat attendu** : 200 OK + token

### Test 3 : Get Current User

```
GET http://localhost:8000/auth/me
Authorization: Bearer <token_from_login>
```

**Résultat attendu** : 200 OK + user data

### Test 4 : Invalid Token

```
GET http://localhost:8000/auth/me
Authorization: Bearer invalid
```

**Résultat attendu** : 401 Unauthorized

---

## 💡 Points Clés

✅ **À faire** :

- Vérifier que l'email n'existe pas déjà
- Hasher le mot de passe avant stockage
- Générer un JWT token
- Valider les credentials (email + password)
- Extraire l'utilisateur du token

❌ **Ne pas faire** :

- Stocker les mots de passe en clair
- Envoyer le mot de passe dans la response
- Ignorer les erreurs de validation
- Utiliser des tokens sans expiration

---

## 📚 Ressources dans le Code

### `app/core/security.py`

```python
# Déjà implémentées !
verify_password(plain_password: str, hashed_password: str) -> bool
get_password_hash(password: str) -> str
create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str
decode_token(token: str) -> Optional[TokenData]
```

### `app/models/models.py`

```python
class User(Base):
    __tablename__ = "users"
    id: int
    email: str (unique)
    hashed_password: str
    full_name: str
    role: UserRole  # "admin" | "recruiter"
    created_at: datetime
```

### `app/schemas/user.py`

```python
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: UserRole = UserRole.recruiter

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: UserRole
    created_at: datetime
```

---

## 🚀 Démarrage du Backend

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

Puis accédez à http://localhost:8000/docs pour tester les endpoints directement dans Swagger UI.

---

## ✅ Checklist d'Implémentation

- [ ] Lire ce guide complètement
- [ ] Implémenter POST /auth/register
- [ ] Implémenter POST /auth/login
- [ ] Implémenter GET /auth/me
- [ ] Tester chaque endpoint avec Postman
- [ ] Valider les erreurs (email existe, mot de passe invalide, token expiré)
- [ ] Vérifier les logs du backend
- [ ] Tester l'intégration avec le frontend

---

## 🎯 Une Fois Implémenté

1. Démarrer le backend : `uvicorn app.main:app --reload`
2. Démarrer le frontend : `npm run dev`
3. Accéder à http://localhost:3000
4. Créer un compte et se connecter
5. Vérifier que le dashboard s'affiche
6. Le projet sera maintenant 100% fonctionnel !

---

**Bonne chance ! 💪**
