# CollabSpace Frontend (Hackathon build)

This folder contains the React/Vite frontend for **CollabSpace AI**.

## Run locally

From this directory:

```bash
npm install
npm run dev
```

Then open the dev server URL printed in your terminal.

## Route: `/collabspace` (frontend-first prototype)

This repo currently has a dedicated frontend slice for the CollabSpace experience under the `/collabspace` prefix.

- `GET /collabspace/login`
  - Mock sign-in/up UI (no backend calls yet).
  - On submit, it stores a mock token in `localStorage` under the key `token`.

- `GET /collabspace`
  - Auth-gated dashboard.
  - Shows a list of “projects/workspaces”.
  - Supports creating new projects.
  - Projects are stored in `localStorage` under `collabspace_projects_v1`.

- `GET /collabspace/project/:id`
  - Project details page.
  - Shows title/description.
  - Includes a placeholder message for “CollabSpace AI” (AI UI comes later).

## Code locations

- Routing is wired in: `src/App.jsx`
- CollabSpace slice components:
  - `src/collabspace/auth/*`
  - `src/collabspace/pages/*`
  - `src/collabspace/storage.js`
