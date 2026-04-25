# End-of-Semester Project — Official Guidelines (English / Français)

## Purpose
Act as Academic Assistant to launch the End-of-Semester project for Groups A–D. Provide bilingual (EN/FR) guidelines, a student README template, a short Google Chat post (EN/FR), a checklist, and example CI/deploy templates.

---

## Project Requirements (must include in announcement)

- Core Language: C — the application's core logic must be implemented in C.
- Architecture: Backend / Frontend separation.
- AI Integration (mandatory): Integrate at least one AI API (chatbot, speech-to-text, image analysis, translation, etc.). Multiple AI features encouraged.
- Database: Use cloud databases only — Supabase or MongoDB. SQLite is forbidden.
- Deployment: Final product must be deployed and publicly accessible (web, mobile, or desktop).
- GitHub Workflow: All students must show visible activity (commits/pushes/branches). Professor Chafik Bouallam must be invited to each repository.

---

## Execution Steps (for students)

1. Form your group (3–5 students).
2. Create a repository under the organization `chafik-boulealam-lab` using the naming convention `project-<group>-<topic>`.
3. Add a README using the template below, implement the project, deploy it publicly, and include the deployment link in the README.
4. Invite Professor Chafik Bouallam (github.com/chafik-boulealam-esisa) as a collaborator on the repository.

---

## Repository README Template

Title: <Project Title>

Members:
- Name (role, GitHub username)

Description:
- Short description of the project, tech stack, AI features, and deployment link.

Requirements checklist:
- Core logic in C: description of where the C code lives.
- Cloud DB: Supabase or MongoDB connection info (do not commit credentials).
- AI APIs: list of services and where they are integrated.
- Deployment link: URL to live application.

How to run (short):
1. Build steps (install deps, build C backend, run frontend)
2. Example: `make build && ./bin/app`

Links:
- DEMO: https://<deployed-url>
- LinkedIn post: <LinkedIn post URL>

---

## Presentation & Demo Requirements (Final Project)

- Prepare a clear, visual presentation focused on key points. Minimize text — presenters should not read long slides.
- First slide must include: ESISA logo, project name, team members, professor and jury names:
  - Professor boulealam chafik
  - Professor Mehdi Iraqi Houssaini
  - Director Mekouar Khalid
  - Othman Mekouar
  - Mekouar youssef
- Record a video demo of your project and include the recording link in the repository README.
- The GitHub repository must show professional commits from all group members (visible activity and proper branching/commit history).
- Upon completion, post the demo video on LinkedIn and include the LinkedIn post URL in the repository README.

---

## Short Google Chat Posts (copy-ready)

EN:
> End-of-Semester Project launched — Groups of 3–5. Core logic in C, cloud DB (Supabase/MongoDB), AI integration required. Create repo under chafik-boulealam-lab, invite Prof. Chafik Bouallam. Full details: see repository `esisa-students/END_OF_SEMESTER_PROJECT.md`.

FR:
> Lancement du projet de fin de semestre — Groupes de 3–5. Coeur en C, DB cloud (Supabase/MongoDB), IA obligatoire. Créez votre dépôt sous chafik-boulealam-lab et invitez le Prof. Chafik Bouallam. Détails: `esisa-students/END_OF_SEMESTER_PROJECT.md`.

Replace the final `Full details` link with the real GitHub URL after this file is pushed to the org repo.

---

## Example CI / Deployment Templates

1) Dockerfile (C backend example)

```
FROM ubuntu:24.04
RUN apt-get update && apt-get install -y build-essential
WORKDIR /app
COPY . .
RUN gcc -O2 -std=c11 -o app src/main.c
CMD ["./app"]
```

2) GitHub Actions — Build and push Docker image (GHCR)

```
name: Build and publish Docker image
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build image
        run: |
          docker build -t ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}:${{ github.sha }} .
      - name: Log in to GHCR
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Push image
        run: |
          docker push ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}:${{ github.sha }}
```

3) GitHub Actions — Deploy to Vercel (example)

```
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
          vercel-organization-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

Notes: set required secrets (e.g., `GITHUB_TOKEN`, `VERCEL_TOKEN`) in the repo settings. Do not store tokens in source.

---

## Posting & Permissions

- Do not commit secrets. Use repository secrets or environment variables.
- If you want me to commit this file to a GitHub repo under `chafik-boulealam-lab`, provide explicit confirmation to use the token in `.env` and confirm the target repo name.

---

## Contact / Reporting

After posting and updating GitHub, provide the links and I will produce a short status report for each Team.

---

End of file.
