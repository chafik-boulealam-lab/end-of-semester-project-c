# ESISA — Projet de fin de semestre — Feuille de route professionnelle

Ce document est une fiche pratique et pédagogique destinée aux étudiants : il explicite la feuille de route, les livrables exigés et les recommandations techniques. Le ton est analytique et orienté « professionnel reproducible ». Tous les livrables finaux doivent respecter la spécification complète : [END_OF_SEMESTER_PROJECT.md](./END_OF_SEMESTER_PROJECT.md).

---

## Objectif et audience

- Public : étudiants en fin de cycle (groupes de 3–5).
- Objectif : produire un produit logiciel professionnel, déployé, testé et documenté, intégrant au moins une composante IA.
- Supervision : Prof. Mehdi Iraqi Houssaini (Course) et Prof. Chafik Boulealam (TP).

---

## Calendrier

- Durée du projet : 1 mois.
- Soutenance finale (date fixe) : 30/05/2026.

---

## Vue synthétique — Livrables critiques

| Livrable | Description courte | Exigence minimale |
|---|---:|---|
| Dépôt GitHub public | Code source, issues, PRs | `project-<groupe>-<sujet>` sous `chafik-boulealam-lab` + invitation Prof. Boulealam |
| README.md | Présentation, instructions, lien demo, lien LinkedIn | Complet, clair, liens actifs |
| Backend (C) | Cœur logique compilable | Code en C + instructions build |
| Tests | Unitaires & intégration | CI ou scripts de test reproductibles |
| Déploiement | URL publique ou page distrib. | Vercel / Expo / Itch.io selon cible |
| Vidéo démo | 5–10 minutes | Lien dans README + post LinkedIn |

---

## Feuille de route condensée (4 semaines)

Semaine 1 — Conception & prototype

- Rédiger la problématique, objectifs mesurables et critères de succès.
- Documenter l'architecture (diagramme) et fournir un prototype minimal exécutable.
- Livrable : `docs/architecture.md`, prototype minimal.


Semaine 2 — Intégration API & prototype

- Implémenter le backend en C (cœur logique) et réaliser les premiers appels vers une API IA externe (tester d'abord avec Postman, `curl` ou un petit script C utilisant `libcurl`).
- Livrable : un prototype minimal qui effectue une requête POST/GET vers une API IA et enregistre la réponse en JSON.

Semaine 3 — Parsing JSON & intégration

- Parser les réponses JSON reçues des APIs en C (par ex. `cJSON` ou parsing simple) et intégrer les résultats dans le flux applicatif.
- Gérer les erreurs réseau, les limites de taux, et prévoir des tests unitaires pour les appels API.
- Configurer CI (tests de compilation et tests rapides d'intégration). 

Semaine 4 — Déploiement, finalisation et soutenance

- Déployer la version de production (Vercel / Expo / Itch.io selon cible).
- Préparer les slides, enregistrer la vidéo démo (5–10 min) et publier sur LinkedIn.
- Finaliser la checklist et valider les critères avant la soutenance du 30/05/2026.

---

## Checklist technique (à cocher avant soutenance)

- [ ] Dépôt public nommé correctement
- [ ] `README.md` complet avec liens de déploiement
- [ ] Backend C compilable avec instructions
- [ ] Tests automatisés et script d'exécution
- [ ] Base locale : **SQLite** (obligatoire pour tests locaux)
- [ ] Base production : Supabase ou MongoDB (si déployé)
- [ ] Déploiement actif et accessible (Vercel / Expo / Itch.io)
- [ ] Vidéo démonstration + lien LinkedIn

---

## Intégration IA centrée sur les API (approche API-Centric)

Résumé : pour ce projet destiné à des étudiants en première année (sans prérequis en apprentissage automatique), l'intégration IA doit se faire exclusivement via des APIs externes (REST). Il n'est pas nécessaire de concevoir, entraîner ou déployer des modèles locaux. L'objectif est d'apprendre à consommer une API, gérer la communication, et intégrer la réponse JSON dans une application en C.

Principes clefs :

- **Appels REST depuis le backend C** : le backend en C envoie des requêtes HTTP vers des services IA externes (ex. OpenAI, Gemini, Mistral) et reçoit des réponses au format JSON.
- **Outils recommandés (débutants)** : tester d'abord les appels avec `Postman`, `curl` ou un petit script Python. Ensuite intégrer dans C avec `libcurl` (ou `system("curl ...")` pour un prototype rapide).
- **Parsing JSON** : utilisez une bibliothèque simple comme `cJSON` ou `jansson` pour analyser les réponses JSON en C, ou mettez en place un parsing minimal si vous préférez.
- **Sécurité** : stockez les clés API dans des variables d'environnement (ne commitez jamais de secrets).
- **Robustesse** : gérez les erreurs réseau, les codes HTTP non-200, les timeouts et les limites de taux.

Flux simple recommandé :

1. Entrée utilisateur → prétraitement en C
2. Requête HTTP (POST/GET) vers une API IA (JSON)
3. Réponse JSON → parsing en C → post-traitement
4. Stockage local (SQLite) et affichage dans l'interface

Bonnes pratiques d'implémentation :

- Testez vos requêtes avec Postman/curl avant d'intégrer en C.
- Commencez par un prototype minimal (faire une requête, afficher la réponse brute), puis améliorez le parsing et l'UX.
- Écrivez des tests unitaires autour des fonctions qui effectuent les appels et parsings.
- Documentez comment exécuter des appels API (exemples `curl`) et comment fournir la variable d'environnement contenant la clé.

Conseil pédagogique : concentrez-vous sur la qualité du code C (organisation, tests), la gestion des erreurs et l'intégration claire de la réponse API dans l'application — c'est ce qui sera évalué.

---

## Exemples de commandes minimales (développement local)

```bash
# Build (exemple)
make build

# Lancer l'app (exemple)
./bin/app --config config/local.yaml

# Tests
pytest tests/
```

La base locale de développement doit être **SQLite** (fichier `data/local.db`) ; les scripts d'initialisation doivent permettre d'initialiser une instance locale mimant la base cloud.

---

## Critères d’évaluation (rapide)

- Fonctionnalité & Qualité (20%) — Le projet fonctionne comme décrit et couvre les exigences.
- Intégration IA (20%) — Pertinence et qualité de l'intégration IA.
- Qualité du code & tests (10%) — Propreté, structure, tests.
- Déploiement & accessibilité (10%) — Application déployée et accessible.
- Présentation & vidéo (40%) — Clarté et professionnalisme de la soutenance et du matériel (LinkedIn, Video, Branding).

---

## Contact

Prof. Chafik Boulealam — ch.boulealam@esisa.ac.ma

---

Document court rédigé pour usage étudiant et professionnel. Pour la spécification complète et les consignes détaillées, consultez : [END_OF_SEMESTER_PROJECT.md](./END_OF_SEMESTER_PROJECT.md).
