function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
}

function getToken() {
  const raw = localStorage.getItem("token");
  if (!raw) return null;
  // Support both raw tokens and JSON-stringified tokens from older code.
  if (raw.startsWith("\"") && raw.endsWith("\"")) {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
  return raw;
}

async function apiFetch(path, { method = "GET", body } = {}) {
  const url = `${getApiBaseUrl()}${path}`;
  const token = getToken();

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message =
      typeof data === "object" && data && "detail" in data ? data.detail : "Request failed";
    throw new Error(message);
  }

  return data;
}

export async function register({ name, email, password }) {
  return apiFetch("/api/v1/user/register", {
    method: "POST",
    body: { name, email, password, agreed: true },
  });
}

export async function login({ email, password }) {
  return apiFetch("/api/v1/user/login", {
    method: "POST",
    body: { email, password, remember: true },
  });
}

export async function listProjects() {
  return apiFetch("/api/v1/collabspace/projects");
}

export async function createProject({ title, description }) {
  return apiFetch("/api/v1/collabspace/projects", {
    method: "POST",
    body: { title, description },
  });
}

export async function getProject(projectId) {
  return apiFetch(`/api/v1/collabspace/projects/${projectId}`);
}

export async function aiSummary({ title, description }) {
  return apiFetch("/api/v1/ai/summary", {
    method: "POST",
    body: { title, description },
  });
}

export async function aiChat({ title, description, messages }) {
  return apiFetch("/api/v1/ai/chat", {
    method: "POST",
    body: { title, description, messages },
  });
}

