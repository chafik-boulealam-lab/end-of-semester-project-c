---
title: End-of-Semester Project — Announcement & Actions
description: Bilingual (English / Français) project announcement and agent action steps to broadcast to Google Chat groups and update the GitHub Organization documentation.
keywords:
  - end-of-semester
  - project
  - announcement
  - github
  - google-chat
  - supabase
  - mongodb
  - c
  - ai
---

Purpose
-------
Act as Academic Assistant to launch the End-of-Semester Project for Groups A–D. Create and broadcast a formal announcement in English and French, update the GitHub Organization (teams/projects) with the project requirements, and provide clear instructions so each student group can create their repository and invite Professor Chafik Bouallam.

Context
-------
- Organization: chafik-boulealam-lab
- Four class teams (A, B, C, D). Students will form sub-groups (3–5 students) and create ~26 repositories under the org.
- Professor: Chafik Bouallam — must be invited to every repository.

Project Requirements (must include in announcement)
-------------------------------------------------
- Core Language: C (the application's core logic must be implemented in C)
- Architecture: Backend / Frontend separation
- AI Integration (mandatory): Each project must integrate at least one AI API (chatbot, speech-to-text, image analysis, translation, etc.) — multiple AI features encouraged
-- Database: Use cloud databases for deployed projects — Supabase or MongoDB. SQLite is permitted only for offline-only applications (e.g., local storage); deployed projects must use a cloud database.
- Deployment: Final product must be deployed and publicly accessible (web, mobile, or desktop)
- GitHub Workflow: All students must show visible activity (commits/pushes/branches). Professor must be invited to each repository.

Execution Steps for the Assistant (high-level)
---------------------------------------------
1. Ask clarifying questions via the host UI (use the `ask-me-first` pattern) when required. Collect confirmations for: which Google Chat groups map to Teams A–D, whether webhooks are available for those groups, and whether to tag all members in the posts.
2. Generate the formal announcement in English and French (full-length) and a short post suitable for Google Chat (short EN/FR).
3. Post the short EN/FR announcement to each Google Chat group for Teams A–D. If webhooks/API are not configured, open the target group pages and place the message in the clipboard for manual paste; report the status.
4. Update the GitHub Organization “Teams” or “Projects” description area with the official project requirements (both EN and FR). If API credentials are available (`GITHUB_TOKEN` from environment/.env), perform API updates (team description or org-level pinned doc). Otherwise, create a markdown file in the repo `esisa-students/` and commit it, or open a GitHub issue in a central repo with the text.
5. Produce a short checklist and repository README template that each group should use, and post the checklist to Google Chat and as the org reference in GitHub.
6. Report back with links to posted messages, updated GitHub locations, and a one-line status for each Team.

Clarifying Questions (ask before taking action)
----------------------------------------------
1. Confirm Google Chat targets: provide the 4 group names/URLs or say "use channels for Teams A,B,C,D" (critical).
2. Confirm posting mode: "automated webhook/API" or "manual (paste)" (critical).
3. Confirm whether I should create/update a README in `esisa-students/` with the full bilingual guidelines (yes/no).
4. Optional: Should I include sample CI/deploy templates (Vercel/Netlify/Docker)? (optional)

On-approval behavior (what this prompt should do once the user confirms)
---------------------------------------------------------------------
- If the user confirms and provides any required channel/webhook details, post the short EN/FR messages to each Google Chat group.
- If `GITHUB_TOKEN` is present in `.env`, patch the Team descriptions via the Teams API (`PATCH /orgs/{org}/teams/{team_slug}`) or create/commit `esisa-students/END_OF_SEMESTER_PROJECT.md` in a chosen central repo with the bilingual text, and open a pinned issue linking to it.
- If some actions cannot be performed due to missing credentials or API errors, collect manual instructions for the professor (copy-ready text and exact links) and produce a single summary for manual execution.

Messages (full-length)
----------------------

English — Full Announcement (for README / Org reference)

Subject: Launch of End-of-Semester Project – Computer Science Department

Hello everyone,

We are officially kicking off the End-of-Semester projects. This year we are raising the bar: you must work to professional production standards in groups of 3 to 5 students.

Technical Stack & Constraints:
- Logic Heart: The core application logic must be implemented in C.
- Architecture: Follow a Backend / Frontend separation.
- AI Integration (mandatory): Integrate at least one AI API (chatbot, speech-to-text, image analysis, translation, etc.). Multiple AI features are encouraged.
-- Database: Use cloud databases for deployed projects — Supabase or MongoDB. SQLite is permitted only for offline-only applications (e.g., local storage); deployed projects must use a cloud database.
- Deployment: Your application must be deployed and publicly accessible (web, mobile, or desktop).
- GitHub Workflow: Every student must show visible activity. Use branches, commits, and pushes professionally. Invite Professor Chafik Bouallam to your repository as a collaborator.

Next steps:
1. Form your group of 3–5 students.
2. Create a repository under the organization `chafik-boulealam-lab` using the naming convention `project-<group>-<topic>`.
3. Add a README with group members and roles, and invite Professor Chafik Bouallam (github.com/chafik-boulealam-esisa) as a collaborator.

Good luck — build something professional and deploy it live.


Français — Annonce complète (pour README / référence org)

Objet : Lancement du projet de fin de semestre – Département Informatique

Bonjour à toutes et à tous,

Nous lançons officiellement les projets de fin de semestre. Cette année, nous travaillons selon des standards professionnels : vous devez constituer des groupes de 3 à 5 étudiants.

Contraintes techniques :
- Langage principal : Le cœur logique de l'application doit être développé en C.
- Architecture : Respectez une séparation Backend / Frontend.
- Intégration IA (obligatoire) : Chaque projet doit intégrer au moins une API d'IA (chatbot, reconnaissance vocale, analyse d'image, traduction, etc.). Plusieurs fonctionnalités IA sont encouragées.
-- Base de données : Utilisez des bases cloud pour les projets déployés — Supabase ou MongoDB. SQLite est autorisé uniquement pour les applications hors-ligne (p. ex. stockage local); les projets déployés doivent utiliser une base cloud.
- Déploiement : Le produit final doit être déployé et accessible publiquement.
- GitHub : Chaque étudiant doit montrer une activité visible (commits/push/branches). Invitez le professeur Chafik Bouallam dans votre dépôt.

Étapes suivantes :
1. Formez votre groupe (3–5 étudiants).
2. Créez votre dépôt sous l'organisation `chafik-boulealam-lab` avec le nom `project-<groupe>-<sujet>`.
3. Ajoutez un README avec la liste des membres et leurs rôles, et invitez le professeur Chafik Bouallam (github.com/chafik-boulealam-esisa) en tant que collaborateur.

Bonne chance — construisez et déployez une application professionnelle.


Short posts (Google Chat) — Français
------------------------------------------------
FR (short):
"Lancement du projet de fin de semestre — Groupes de 3–5. Coeur en C, DB cloud (Supabase/MongoDB), IA obligatoire. Créez votre dépôt sous chafik-boulealam-lab et invitez le Prof. Chafik Bouallam. Détails dans l'organisation."


Repository README template (to provide to students)
-------------------------------------------------
Title: <Project Title>

Members:
- Name (role, GitHub username)

Description:
- Short description of the project, tech stack, AI features, and deployment link.

Requirements checklist:
- Core logic in C: description of where the C code lives.
- Cloud DB: Supabase or MongoDB connection info (do not commit credentials).
- AI APIs: list of services and short note on where they are integrated.
- Deployment link: URL to live application.

Presentation & Demo Requirements (Final Project):
- Students must prepare a clear, visual presentation focused on key points with minimal text; presenters must not read from screens.
- The first slide must include: ESISA logo, project name, team members, and the professor and jury names: Professor Mehdi Iraqi Houssaini; Director Mekouar Khalid; Director Mekouar youssef, Professor Othman Mekouar; Professor boulealam chafik.
- Students must record a video demo of their project and include a link to the recording in the repository README.
- The GitHub repository must show professional commits from all group members (visible activity and proper branching/commit history).
- Upon completion, students must post the demo video on LinkedIn and include the LinkedIn post URL in the repository README.


Safety & Permissions
--------------------
- Do not request or commit secrets. Use environment variables and secret managers.
- If automated posting or GitHub edits require credentials, request them via the host UI and do not echo tokens in logs.

Reporting back
--------------
After posting and updating GitHub, return a short report that includes:
- Google Chat message links or screenshot/text copy if posted manually.
- GitHub location updated (team descriptions or path to `esisa-students/END_OF_SEMESTER_PROJECT.md`).
- Any failed steps with clear remediation instructions for the professor.

---
End of prompt
