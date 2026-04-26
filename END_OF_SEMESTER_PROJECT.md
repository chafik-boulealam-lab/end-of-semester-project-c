### Projet de fin de semestre — Consignes pour les étudiants

Bonjour à toutes et à tous,

Nous lançons officiellement les projets de fin de semestre. Cette année, vous travaillez selon des standards professionnels : formez des groupes de 3 à 5 étudiants et produisez un projet déployé, testé et documenté.

---

## Contraintes techniques obligatoires

- **Langage principal :** Le cœur logique de l'application doit être développé en **C**.
- **Architecture :** Séparation Backend / Frontend.
- **Intégration IA (obligatoire) :** Intégrez au moins une API d'IA (chatbot, reconnaissance vocale, analyse d'image, traduction, etc.). Plusieurs fonctionnalités IA sont encouragées.
- **Base de données :** Utilisez uniquement des bases cloud — **Supabase** ou **MongoDB** (SQLite interdit).
- **Déploiement :** Le produit final doit être déployé et accessible publiquement (web, mobile ou desktop).
- **GitHub :** Chaque étudiant doit montrer une activité visible (commits/branches/push). Invitez le Prof. Chafik Boulealam dans votre dépôt.

---

## Étapes à suivre (pour les étudiants)

1. Constituez votre groupe (3–5 étudiants).
2. Créez un dépôt sous l'organisation `chafik-boulealam-lab` avec la convention `project-<groupe>-<sujet>`.
3. Ajoutez un `README.md` contenant la liste des membres, leurs rôles et le lien de déploiement.
4. Implémentez le projet, intégrez les services IA et la base cloud, déployez le service.
5. Invitez le Prof. Chafik Boulealam en tant que collaborateur sur votre dépôt.

---

## Modèle de `README.md` (à adapter)

Titre : <Titre du projet>

Membres :
- Nom (rôle, pseudo GitHub)

Description :
- Brève description du projet, stack technique, fonctionnalités IA et lien de déploiement.

Checklist obligatoire :
- Cœur logique en C : indiquer l'emplacement du code C.
- Base cloud : préciser Supabase ou MongoDB (ne pas committer de credentials).
- APIs IA : lister les services utilisés et où ils sont intégrés.
- Lien de déploiement : URL publique vers l'application.

Comment exécuter (court) :
1. Étapes de build (installer dépendances, compiler backend C, lancer le frontend)
2. Exemple : `make build && ./bin/app`

Liens :
- DEMO : https://<deployed-url>
- Publication LinkedIn : <URL de la publication LinkedIn>

---

## Présentation & exigences de la démonstration finale

- Préparez une présentation claire et visuelle, limitée en texte; évitez de lire les diapositives.
- La première diapositive doit inclure : logo ESISA, nom du projet, membres de l'équipe et noms du professeur/jury.
- Enregistrez une vidéo de démonstration et fournissez le lien dans le `README.md`.
- Le dépôt GitHub doit montrer des commits professionnels de tous les membres (activité distribuée et historique de branches propre).
- Après la soutenance, postez la vidéo sur LinkedIn et ajoutez le lien dans le `README.md`.

---


---

## Sécurité & bonnes pratiques

- Ne commitez pas de secrets. Utilisez des variables d'environnement et des outils de secret management.
- Documentez clairement les étapes d'installation et de déploiement dans le `README.md`.

---

Si vous avez des questions ou des besoins particuliers (webhooks, accès, etc.), contactez le professeur.

Fin des consignes étudiants.
