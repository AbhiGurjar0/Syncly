# CollabSpace Build Plan (frontend-first)

## Current state
- Backend is intentionally out of scope for now.
- Frontend has a working `/collabspace` slice (mock auth + project list + project details placeholder).

## Step 1 (already done in code)
- Add CollabSpace AI frontend v1 slice:
  - `/collabspace/login` (mock sign-in/up)
  - `/collabspace` (auth-gated dashboard + create project)
  - `/collabspace/project/:id` (project details + “AI coming soon” placeholder)

## Step 2 (next)
- Build the CollabSpace AI UI inside the project details page.
- Keep it mocked (no real API calls yet), but structure the UI so we can later plug in backend responses.
- We will decide with you:
  - Whether AI should be a chat panel or a summary generator first
  - Whether AI outputs should be saved per project (localStorage) for demo continuity

## Step 3 (later, after AI UI looks good)
- Add frontend API wrapper functions (still no backend changes yet):
  - One place where we call `/api/...` endpoints when they exist
  - Keep the rest of the UI independent from fetch/axios details

## Step 4 (backend integration later)
- Implement backend endpoints + database wiring to support:
  - Projects and project updates
  - AI-generated summaries/chat responses
  - Auth/authorization for project access

## Workflow rule
- After each step, we stop for your approval before moving on.

