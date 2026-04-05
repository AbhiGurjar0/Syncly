import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getNextProjectId, loadProjects, saveProjects } from "../storage";
import { createProject, listProjects } from "../api";

function Button({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 12px",
        borderRadius: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        border: "1px solid rgba(255,255,255,0.12)",
        background: disabled ? "rgba(255,255,255,0.05)" : "rgba(127,111,255,0.18)",
        color: "white",
        width: "100%",
      }}
    >
      {children}
    </button>
  );
}

export default function CollabSpaceDashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState(() => loadProjects());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Prefer backend projects; fall back to localStorage if backend isn't ready.
    const boot = async () => {
      try {
        const data = await listProjects();
        const next = Array.isArray(data?.projects) ? data.projects : [];
        setProjects(next);
      } catch {
        setProjects(loadProjects());
      }
    };
    boot();
  }, []);

  const canCreate = useMemo(() => {
    return title.trim().length >= 2 && description.trim().length >= 5;
  }, [title, description]);

  function onCreate() {
    if (!canCreate) return;
    const run = async () => {
      setError("");
      const nextTitle = title.trim();
      const nextDesc = description.trim();

      try {
        const created = await createProject({ title: nextTitle, description: nextDesc });
        setProjects((prev) => [created, ...prev]);
      } catch {
        // Offline/dev fallback: keep local behavior.
        const nextId = getNextProjectId(projects);
        const nextProject = { id: nextId, title: nextTitle, description: nextDesc };
        const updated = [nextProject, ...projects];
        setProjects(updated);
        saveProjects(updated);
        setError("Backend not reachable — saved locally for now.");
      } finally {
        setTitle("");
        setDescription("");
      }
    };

    run();
  }

  function onSignOut() {
    localStorage.removeItem("token");
    navigate("/collabspace/login");
  }

  return (
    <div style={{ minHeight: "100vh", padding: 20, color: "white" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>CollabSpace AI</div>
            <div style={{ fontSize: 13, color: "#b0b0d0" }}>Your collaboration projects (AI comes later).</div>
          </div>
          <button
            type="button"
            onClick={onSignOut}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "white",
            }}
          >
            Sign out
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Projects</div>
            {error ? (
              <div style={{ fontSize: 12, color: "#b0b0d0", marginBottom: 10 }}>
                {error}
              </div>
            ) : null}
            {projects.length === 0 ? (
              <div style={{ color: "#b0b0d0" }}>No projects yet.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {projects.map((p) => (
                  <Link
                    key={p.id}
                    to={`/collabspace/project/${p.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.10)" }}>
                      <div style={{ fontWeight: 800, marginBottom: 4 }}>{p.title}</div>
                      <div style={{ fontSize: 12, color: "#b0b0d0", lineHeight: 1.45 }}>{p.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Create project</div>

            <label style={{ display: "block", marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "#b0b0d0", marginBottom: 6 }}>Title</div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "block", marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "#b0b0d0", marginBottom: 6 }}>Description</div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </label>

            <Button onClick={onCreate} disabled={!canCreate}>
              Create
            </Button>

            <div style={{ marginTop: 12, fontSize: 12, color: "#b0b0d0", lineHeight: 1.45 }}>
              After creation, we stay on this list (details page is separate).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

