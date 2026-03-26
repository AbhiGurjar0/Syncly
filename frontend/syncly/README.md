# CollabSpace Frontend

This app is the frontend for the running CollabSpace AI website.

## Purpose

The frontend provides:
- authentication flow for CollabSpace users
- project dashboard and project details views
- AI summary and AI chat interfaces connected through the frontend API layer

## Local run

1. Open this folder: `frontend/syncly`
2. Install dependencies with `npm install`
3. Start the app with `npm run dev`
4. Open the local URL printed by Vite

## Core routes

- `/collabspace/login`
  - User sign-in and sign-up entrypoint.
- `/collabspace`
  - Main dashboard with project list and project creation.
- `/collabspace/project/:id`
  - Project details with AI tabs (Summary and Chat).

## Frontend architecture

- `src/App.jsx`
  - Main route registration and route mounting.
- `src/collabspace/api.js`
  - Single integration layer for backend requests.
  - Keep all network calls here when adding features.
- `src/collabspace/auth/`
  - Auth pages and route guards.
- `src/collabspace/pages/`
  - Page-level containers and layout logic.
- `src/collabspace/ai/`
  - AI-specific UI modules and state handling.
- `src/collabspace/ui/`
  - Shared UI building blocks for consistent styling.

## How to add new frontend features

1. Define the user-facing behavior first.
2. Add or update page-level state in `src/collabspace/pages/`.
3. Add reusable UI in `src/collabspace/ui/` if duplication appears.
4. Add API methods in `src/collabspace/api.js` for backend communication.
5. Keep auth-protected screens behind existing route guard usage.
6. Verify route navigation and error states before merging.

## Standards for ongoing work

- Keep components small and focused.
- Keep data fetching out of presentation-only components.
- Reuse existing style patterns for consistency.
- Prefer clear names and simple logic over advanced abstractions.
- Add changes in a way teammates can read quickly and extend safely.
