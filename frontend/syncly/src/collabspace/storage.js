const PROJECTS_KEY = "collabspace_projects_v1";

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "Team Onboarding",
    description: "Your first workspace project. Create tasks and share updates later.",
  },
  {
    id: 2,
    title: "Product Roadmap",
    description: "Plan milestones and keep stakeholders aligned.",
  },
];

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function loadProjects() {
  const raw = localStorage.getItem(PROJECTS_KEY);
  if (!raw) return [...DEFAULT_PROJECTS];

  const parsed = safeParse(raw);
  if (!Array.isArray(parsed)) return [...DEFAULT_PROJECTS];

  return parsed;
}

export function saveProjects(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function getNextProjectId(projects) {
  const maxId = projects.reduce((acc, p) => {
    const n = typeof p.id === "number" ? p.id : parseInt(p.id, 10);
    return Number.isFinite(n) ? Math.max(acc, n) : acc;
  }, 0);

  return maxId + 1;
}

