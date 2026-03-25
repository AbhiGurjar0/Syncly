import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadProjects } from "../storage";

export default function CollabSpaceProjectDetails() {
  const { id } = useParams();

  const [projects] = useState(() => loadProjects());
  const project = useMemo(() => {
    const numericId = parseInt(id, 10);
    return projects.find((p) => p.id === numericId || String(p.id) === String(id)) || null;
  }, [id, projects]);

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", padding: 20, color: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Project not found</div>
          <Link to="/collabspace" style={{ color: "#b4acff" }}>
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: 20, color: "white" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 14 }}>
          <Link to="/collabspace" style={{ color: "#b4acff", textDecoration: "none" }}>
            ← Back
          </Link>
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>{project.title}</div>
          <div style={{ fontSize: 13, color: "#b0b0d0", lineHeight: 1.6, marginBottom: 18 }}>{project.description}</div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.10)", marginBottom: 14 }} />

          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>CollabSpace AI (coming soon)</div>
          <div style={{ fontSize: 13, color: "#b0b0d0", lineHeight: 1.6 }}>
            AI summary, suggestions, and collaborative updates will appear here in a later step.
          </div>
        </div>
      </div>
    </div>
  );
}

