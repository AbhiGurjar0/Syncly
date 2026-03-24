import { useState, useEffect } from "react";

/* ── Google Fonts ── */
const FONT_LINK = document.createElement("link");
FONT_LINK.rel = "stylesheet";
FONT_LINK.href =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:ital,wdth,wght@0,75..100,400..700;1,75..100,400..700&display=swap";
document.head.appendChild(FONT_LINK);

/* ── Global CSS ── */
const injectCSS = (css) => {
  const s = document.createElement("style");
  s.textContent = css;
  document.head.appendChild(s);
};

injectCSS(`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }

  .dark-root {
    --bg:           #080810;
    --bg2:          #0d0d1a;
    --surface:      #13131f;
    --surface2:     #1a1a28;
    --surface3:     #20202e;
    --border:       rgba(255,255,255,0.07);
    --border-h:     rgba(255,255,255,0.14);
    --text:         #eeeef8;
    --text2:        #8888b0;
    --text3:        #44446a;
    --accent:       #7f6fff;
    --accent2:      #b4acff;
    --glow:         rgba(127,111,255,0.22);
    --subtle:       rgba(127,111,255,0.09);
    --ok:           #34d399;
    --warn:         #fbbf24;
    --err:          #f87171;
    --info:         #60a5fa;
    --inp-bg:       rgba(255,255,255,0.035);
    --inp-border:   rgba(255,255,255,0.08);
    --card-shadow:  0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.45);
    --sidebar-w:    240px;
  }
  .light-root {
    --bg:           #f0eeff;
    --bg2:          #e8e5ff;
    --surface:      #ffffff;
    --surface2:     #f6f5ff;
    --surface3:     #eeecff;
    --border:       rgba(0,0,0,0.07);
    --border-h:     rgba(0,0,0,0.14);
    --text:         #0d0c1e;
    --text2:        #5a5a90;
    --text3:        #b0b0d0;
    --accent:       #5a4fff;
    --accent2:      #9188ff;
    --glow:         rgba(90,79,255,0.18);
    --subtle:       rgba(90,79,255,0.07);
    --ok:           #059669;
    --warn:         #d97706;
    --err:          #dc2626;
    --info:         #2563eb;
    --inp-bg:       rgba(0,0,0,0.025);
    --inp-border:   rgba(0,0,0,0.1);
    --card-shadow:  0 0 0 1px rgba(90,79,255,0.07), 0 8px 32px rgba(90,79,255,0.09);
    --sidebar-w:    240px;
  }

  body {
    font-family: 'Instrument Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    transition: background 0.3s ease, color 0.3s ease;
  }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border-h); border-radius: 99px; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes spinR    { to { transform: rotate(360deg); } }
  @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes orbA     { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-50px,30px) scale(1.1);} }
  @keyframes orbB     { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(40px,-40px) scale(1.12);} }
  @keyframes pulse    { 0%,100%{box-shadow:0 0 0 0 var(--glow);} 60%{box-shadow:0 0 0 5px transparent;} }
  @keyframes slideIn  { from{opacity:0;transform:translateX(-8px);} to{opacity:1;transform:translateX(0);} }
  @keyframes popIn    { from{opacity:0;transform:scale(0.93);} to{opacity:1;transform:scale(1);} }
`);

/* ── Sample project data ── */
const INITIAL_PROJECTS = [
  {
    id: 1,
    name: "NexusChat",
    desc: "Real-time AI chat with multi-model routing and tool-use support.",
    stack: ["React", "Node.js", "WebSocket"],
    status: "active",
    starred: true,
    updated: "2h ago",
    progress: 78,
    color: "#7f6fff",
  },
  {
    id: 2,
    name: "VectorDB Studio",
    desc: "Visual interface for managing embeddings, indexes, and similarity search.",
    stack: ["Python", "FastAPI", "Qdrant"],
    status: "active",
    starred: false,
    updated: "1d ago",
    progress: 54,
    color: "#f472b6",
  },
  {
    id: 3,
    name: "AutoDoc AI",
    desc: "Automated documentation generator from codebase using LLMs.",
    stack: ["TypeScript", "OpenAI", "AST"],
    status: "paused",
    starred: true,
    updated: "3d ago",
    progress: 40,
    color: "#34d399",
  },
  {
    id: 4,
    name: "DeployBot",
    desc: "AI-assisted CI/CD pipeline with intelligent rollback and alerting.",
    stack: ["Go", "Kubernetes", "Prometheus"],
    status: "active",
    starred: false,
    updated: "5h ago",
    progress: 91,
    color: "#fbbf24",
  },
  {
    id: 5,
    name: "PromptForge",
    desc: "Prompt engineering workspace with version control and A/B testing.",
    stack: ["Next.js", "Supabase", "OpenAI"],
    status: "active",
    starred: true,
    updated: "Just now",
    progress: 65,
    color: "#60a5fa",
  },
  {
    id: 6,
    name: "DataWeave",
    desc: "Low-code ETL pipeline builder with AI transformation suggestions.",
    stack: ["Python", "Airflow", "dbt"],
    status: "archived",
    starred: false,
    updated: "2w ago",
    progress: 100,
    color: "#fb923c",
  },
  {
    id: 7,
    name: "SemanticSearch",
    desc: "Enterprise search layer with hybrid dense and sparse retrieval.",
    stack: ["Rust", "HNSW", "gRPC"],
    status: "active",
    starred: false,
    updated: "12h ago",
    progress: 33,
    color: "#a78bfa",
  },
  {
    id: 8,
    name: "AgentOS",
    desc: "Multi-agent orchestration framework with shared memory and tooling.",
    stack: ["Python", "LangGraph", "Redis"],
    status: "paused",
    starred: true,
    updated: "1w ago",
    progress: 20,
    color: "#2dd4bf",
  },
];

const STATUS_META = {
  active: { label: "Active", color: "#34d399", bg: "rgba(52,211,153,0.1)" },
  paused: { label: "Paused", color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
  archived: {
    label: "Archived",
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.1)",
  },
};

const SORT_OPTIONS = ["Last Updated", "Name", "Progress", "Status"];
const FILTER_OPTIONS = ["All", "Active", "Paused", "Archived", "Starred"];

/* ── Icons ── */
const I = {
  Grid: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  List: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Plus: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Star: ({ filled }) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Search: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Filter: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  ),
  Sort: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="15" y2="12" />
      <line x1="3" y1="18" x2="9" y2="18" />
    </svg>
  ),
  Moon: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Sun: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Dots: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="5" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" />
    </svg>
  ),
  Code: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Archive: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  ),
  Trash: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  ),
  Edit: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  X: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Folder: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Activity: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Bell: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Settings: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Home: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  ChevronDown: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
};

/* ── Reusable UI pieces ── */

function BgOrbs() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          top: -200,
          right: -100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(127,111,255,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orbA 22s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 450,
          height: 450,
          bottom: -150,
          left: -80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,172,255,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orbB 26s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function Avatar({ name, size = 32 }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, var(--accent), var(--accent2))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontWeight: 700,
        color: "#fff",
        flexShrink: 0,
        boxShadow: "0 0 0 2px var(--surface), 0 0 0 3px var(--accent)",
      }}
    >
      {initials}
    </div>
  );
}

/* ── MODAL: New / Edit Project ── */
function ProjectModal({ project, onSave, onClose }) {
  const isEdit = !!project;
  const [name, setName] = useState(project?.name || "");
  const [desc, setDesc] = useState(project?.desc || "");
  const [stack, setStack] = useState(project?.stack?.join(", ") || "");
  const [deadline, setDeadline] = useState(project?.deadline);
  const [status, setStatus] = useState(project?.status || "active");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!name.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const colors = [
        "#7f6fff",
        "#f472b6",
        "#34d399",
        "#fbbf24",
        "#60a5fa",
        "#fb923c",
        "#a78bfa",
        "#2dd4bf",
        "#e879f9",
        "#f87171",
      ];
      onSave({
        id: project?.id || Date.now(),
        name: name.trim(),
        desc: desc.trim(),
        stack: stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        status,
        deadline,
        starred: project?.starred || false,
        updated: "Just now",
        progress: project?.progress || 0,
        color:
          project?.color || colors[Math.floor(Math.random() * colors.length)],
      });
      setLoading(false);
      onClose();
    }, 800);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 13px",
    background: "var(--inp-bg)",
    border: "1px solid var(--inp-border)",
    borderRadius: 10,
    color: "var(--text)",
    fontSize: 13.5,
    fontFamily: "'Instrument Sans', sans-serif",
    outline: "none",
    transition: "all 0.2s",
  };
  const labelStyle = {
    fontSize: 11.5,
    fontWeight: 600,
    color: "var(--text2)",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    display: "block",
    marginBottom: 6,
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 460,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          animation: "popIn 0.25s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, var(--accent2), transparent)",
            opacity: 0.5,
            borderRadius: "20px 20px 0 0",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 22,
          }}
        >
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: 22,
              color: "var(--text)",
            }}
          >
            {isEdit ? "Edit Project" : "New Project"}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 30,
              height: 30,
              border: "1px solid var(--border)",
              borderRadius: 8,
              background: "var(--surface2)",
              color: "var(--text2)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <I.X />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>Project Name</label>
            <input
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. PromptForge"
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent)";
                e.target.style.boxShadow = "0 0 0 3px var(--glow)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--inp-border)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              style={{
                ...inputStyle,
                height: 80,
                resize: "vertical",
                lineHeight: 1.5,
              }}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What does this project do?"
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent)";
                e.target.style.boxShadow = "0 0 0 3px var(--glow)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--inp-border)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          <div>
            <label style={labelStyle}>Tech Stack (comma separated)</label>
            <input
              style={inputStyle}
              value={stack}
              onChange={(e) => setStack(e.target.value)}
              placeholder="React, Node.js, Postgres"
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent)";
                e.target.style.boxShadow = "0 0 0 3px var(--glow)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--inp-border)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          <div>
            <label style={labelStyle}>Deadline</label>
            <input
              style={inputStyle}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="e.g. 15 days"
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent)";
                e.target.style.boxShadow = "0 0 0 3px var(--glow)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--inp-border)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["active", "paused", "archived"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    borderRadius: 9,
                    border: `1px solid ${status === s ? STATUS_META[s].color : "var(--inp-border)"}`,
                    background:
                      status === s ? STATUS_META[s].bg : "var(--inp-bg)",
                    color: status === s ? STATUS_META[s].color : "var(--text2)",
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    fontFamily: "'Instrument Sans', sans-serif",
                    transition: "all 0.18s",
                  }}
                >
                  {STATUS_META[s].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 22,
            background:
              "linear-gradient(135deg, var(--accent), var(--accent2))",
            color: "#fff",
            border: "none",
            borderRadius: 11,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Instrument Sans', sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 4px 18px var(--glow)",
          }}
        >
          {loading ? (
            <span
              style={{
                width: 16,
                height: 16,
                border: "2px solid rgba(255,255,255,0.4)",
                borderTop: "2px solid #fff",
                borderRadius: "50%",
                animation: "spinR 0.7s linear infinite",
              }}
            />
          ) : null}
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </div>
  );
}

/* ── GRID CARD ── */
function ProjectCard({ project, onStar, onEdit, onDelete, style: s }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sm = STATUS_META[project.status];

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 22,
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        cursor: "default",
        animation: "fadeUp 0.4s ease both",
        ...s,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-h)";
        e.currentTarget.style.boxShadow = "var(--card-shadow)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
      onClick={() => (window.location.href = `/project/${project?.id}`)}
    >
      {/* color accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
          borderRadius: "16px 16px 0 0",
        }}
      />

      {/* top row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            background: `${project.color}18`,
            border: `1px solid ${project.color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          <I.Code style={{ color: project.color }} />
          <span style={{ color: project.color }}>
            <I.Code />
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => onStar(project.id)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--inp-bg)",
              color: project.starred ? "#fbbf24" : "var(--text3)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            <I.Star filled={project.starred} />
          </button>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen((m) => !m)}
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--inp-bg)",
                color: "var(--text2)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <I.Dots />
            </button>
            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 34,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 11,
                  padding: 5,
                  zIndex: 50,
                  minWidth: 130,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  animation: "popIn 0.15s ease",
                }}
                onMouseLeave={() => setMenuOpen(false)}
              >
                {[
                  {
                    icon: <I.Edit />,
                    label: "Edit",
                    action: () => {
                      onEdit(project);
                      setMenuOpen(false);
                    },
                  },
                  {
                    icon: <I.Star filled={project.starred} />,
                    label: project.starred ? "Unstar" : "Star",
                    action: () => {
                      onStar(project.id);
                      setMenuOpen(false);
                    },
                  },
                  {
                    icon: <I.Trash />,
                    label: "Delete",
                    action: () => {
                      onDelete(project.id);
                      setMenuOpen(false);
                    },
                    danger: true,
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "8px 10px",
                      background: "none",
                      border: "none",
                      color: item.danger ? "var(--err)" : "var(--text2)",
                      fontSize: 12.5,
                      fontWeight: 500,
                      cursor: "pointer",
                      borderRadius: 7,
                      fontFamily: "'Instrument Sans', sans-serif",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--surface2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* name + status */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 7,
        }}
      >
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.2px",
          }}
        >
          {project.name}
        </h3>
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: 99,
            // background: sm.bg,
            // color: sm.color,
            letterSpacing: 0.3,
            flexShrink: 0,
          }}
        >
          {/* {sm.label} */}
        </span>
      </div>

      {/* desc */}
      <p
        style={{
          fontSize: 12.5,
          color: "var(--text2)",
          lineHeight: 1.55,
          marginBottom: 14,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.desc}
      </p>

      {/* stack */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}
      >
        {project.stack.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 10.5,
              padding: "2px 8px",
              borderRadius: 6,
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              color: "var(--text2)",
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* progress */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <span
            style={{ fontSize: 11, color: "var(--text3)", fontWeight: 500 }}
          >
            Progress
          </span>
          <span
            style={{
              fontSize: 11,
              color: project.progress === 100 ? "var(--ok)" : "var(--text2)",
              fontWeight: 600,
            }}
          >
            {project.progress}%
          </span>
        </div>
        <div
          style={{
            height: 4,
            borderRadius: 99,
            background: "var(--surface2)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${project.progress}%`,
              borderRadius: 99,
              background:
                project.progress === 100
                  ? "var(--ok)"
                  : `linear-gradient(90deg, ${project.color}, ${project.color}cc)`,
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>

      {/* footer */}
      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 11.5,
            color: "var(--text3)",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <I.Activity /> {project.updated}
        </span>
        <button
          onClick={() => onEdit(project)}
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            color: "var(--accent)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "'Instrument Sans', sans-serif",
          }}
        >
          Open →
        </button>
      </div>
    </div>
  );
}

/* ── LIST ROW ── */
function ProjectRow({ project, onStar, onEdit, onDelete, style: s }) {
  const sm = STATUS_META[project.status];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 13,
        transition: "border-color 0.2s, background 0.2s",
        animation: "fadeUp 0.4s ease both",
        ...s,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-h)";
        e.currentTarget.style.background = "var(--surface2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.background = "var(--surface)";
      }}
    >
      {/* color dot */}
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: project.color,
          flexShrink: 0,
          boxShadow: `0 0 8px ${project.color}88`,
        }}
      />

      {/* name + desc */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 2,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>
            {project.name}
          </span>
          {project.starred && (
            <span style={{ color: "#fbbf24", fontSize: 11 }}>★</span>
          )}
        </div>
        <p
          style={{
            fontSize: 12,
            color: "var(--text2)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {project.desc}
        </p>
      </div>

      {/* stack (desktop) */}
      <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
        {project.stack.slice(0, 2).map((t) => (
          <span
            key={t}
            style={{
              fontSize: 10.5,
              padding: "2px 7px",
              borderRadius: 5,
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              color: "var(--text2)",
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
        {project.stack.length > 2 && (
          <span
            style={{
              fontSize: 10.5,
              padding: "2px 7px",
              borderRadius: 5,
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              color: "var(--text3)",
              fontWeight: 500,
            }}
          >
            +{project.stack.length - 2}
          </span>
        )}
      </div>

      {/* progress bar */}
      <div style={{ width: 80, flexShrink: 0 }}>
        <div
          style={{
            height: 4,
            borderRadius: 99,
            background: "var(--surface3)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${project.progress}%`,
              borderRadius: 99,
              background: `linear-gradient(90deg, ${project.color}, ${project.color}aa)`,
            }}
          />
        </div>
        <span
          style={{
            fontSize: 10,
            color: "var(--text3)",
            marginTop: 3,
            display: "block",
            textAlign: "right",
          }}
        >
          {project.progress}%
        </span>
      </div>

      {/* status */}
      <span
        style={{
          fontSize: 10.5,
          fontWeight: 600,
          padding: "3px 9px",
          borderRadius: 99,
          background: sm.bg,
          color: sm.color,
          flexShrink: 0,
        }}
      >
        {sm.label}
      </span>

      {/* updated */}
      <span
        style={{
          fontSize: 11.5,
          color: "var(--text3)",
          flexShrink: 0,
          minWidth: 60,
          textAlign: "right",
        }}
      >
        {project.updated}
      </span>

      {/* actions */}
      <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
        <button
          onClick={() => onStar(project.id)}
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            border: "1px solid var(--border)",
            background: "var(--inp-bg)",
            color: project.starred ? "#fbbf24" : "var(--text3)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <I.Star filled={project.starred} />
        </button>
        <button
          onClick={() => onEdit(project)}
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            border: "1px solid var(--border)",
            background: "var(--inp-bg)",
            color: "var(--text2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <I.Edit />
        </button>
        <button
          onClick={() => onDelete(project.id)}
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            border: "1px solid var(--border)",
            background: "var(--inp-bg)",
            color: "var(--text3)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <I.Trash />
        </button>
      </div>
    </div>
  );
}

/* ── SIDEBAR ── */
function Sidebar({ filter, setFilter, counts, dark, onToggleTheme }) {
  const navItems = [
    { id: "All", icon: <I.Folder />, label: "All Projects", count: counts.all },
    {
      id: "Active",
      icon: <I.Activity />,
      label: "Active",
      count: counts.active,
    },
    { id: "Paused", icon: <I.Bell />, label: "Paused", count: counts.paused },
    {
      id: "Archived",
      icon: <I.Archive />,
      label: "Archived",
      count: counts.archived,
    },
    {
      id: "Starred",
      icon: <I.Star filled />,
      label: "Starred",
      count: counts.starred,
    },
  ];

  return (
    <aside
      style={{
        width: "var(--sidebar-w)",
        flexShrink: 0,
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px 18px 16px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, var(--accent), var(--accent2))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: 18,
              color: "#fff",
              boxShadow: "0 0 0 0 var(--glow)",
              animation: "pulse 3s ease-in-out infinite",
            }}
          >
            N
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: 16,
                color: "var(--text)",
                lineHeight: 1.2,
              }}
            >
              Nexus{" "}
              <span
                style={{
                  fontStyle: "normal",
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                AI
              </span>
            </div>
            <div
              style={{ fontSize: 10.5, color: "var(--text3)", fontWeight: 500 }}
            >
              Projects
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            color: "var(--text3)",
            letterSpacing: 0.8,
            textTransform: "uppercase",
            padding: "0 8px",
            marginBottom: 6,
          }}
        >
          Workspace
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "9px 10px",
              borderRadius: 9,
              border: "none",
              background: filter === item.id ? "var(--subtle)" : "transparent",
              color: filter === item.id ? "var(--accent)" : "var(--text2)",
              fontSize: 13,
              fontWeight: filter === item.id ? 600 : 400,
              cursor: "pointer",
              fontFamily: "'Instrument Sans', sans-serif",
              transition: "all 0.18s",
              marginBottom: 2,
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              if (filter !== item.id) {
                e.currentTarget.style.background = "var(--surface2)";
                e.currentTarget.style.color = "var(--text)";
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== item.id) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text2)";
              }
            }}
          >
            <span
              style={{
                color: filter === item.id ? "var(--accent)" : "var(--text3)",
              }}
            >
              {item.icon}
            </span>
            <span style={{ flex: 1 }}>{item.label}</span>
            <span
              style={{
                fontSize: 11,
                padding: "1px 7px",
                borderRadius: 99,
                background:
                  filter === item.id ? "var(--accent)" : "var(--surface3)",
                color: filter === item.id ? "#fff" : "var(--text3)",
                fontWeight: 600,
              }}
            >
              {item.count}
            </span>
          </button>
        ))}

        <div
          style={{ height: 1, background: "var(--border)", margin: "12px 8px" }}
        />
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            color: "var(--text3)",
            letterSpacing: 0.8,
            textTransform: "uppercase",
            padding: "0 8px",
            marginBottom: 6,
          }}
        >
          Settings
        </div>
        {[
          { icon: <I.Settings />, label: "Preferences" },
          { icon: <I.Bell />, label: "Notifications" },
        ].map((item) => (
          <button
            key={item.label}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "9px 10px",
              borderRadius: 9,
              border: "none",
              background: "transparent",
              color: "var(--text2)",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Instrument Sans', sans-serif",
              transition: "all 0.18s",
              marginBottom: 2,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface2)";
              e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text2)";
            }}
          >
            <span style={{ color: "var(--text3)" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom user strip */}
      <div
        style={{
          padding: "12px 14px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Avatar name="Alex Johnson" size={30} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 12.5,
              fontWeight: 600,
              color: "var(--text)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Alex Johnson
          </div>
          <div style={{ fontSize: 10.5, color: "var(--text3)" }}>Pro Plan</div>
        </div>
        <button
          onClick={onToggleTheme}
          style={{
            width: 30,
            height: 30,
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--surface2)",
            color: "var(--text2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {dark ? <I.Sun /> : <I.Moon />}
        </button>
      </div>
    </aside>
  );
}

/* ── STATS BAR ── */
function StatsBar({ projects }) {
  const active = projects.filter((p) => p.status === "active").length;
  const avgProgress = Math.round(
    projects.reduce((a, p) => a + p.progress, 0) / Math.max(projects.length, 1),
  );
  const starred = projects.filter((p) => p.starred).length;

  const stats = [
    { label: "Total Projects", value: projects.length, color: "var(--accent)" },
    { label: "Active", value: active, color: "var(--ok)" },
    { label: "Starred", value: starred, color: "#fbbf24" },
    { label: "Avg. Progress", value: `${avgProgress}%`, color: "var(--info)" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 12,
        marginBottom: 24,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "16px 18px",
            animation: `fadeUp 0.4s ${i * 0.05}s ease both`,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              fontFamily: "'Instrument Sans', sans-serif",
              color: s.color,
              letterSpacing: "-0.5px",
              marginBottom: 2,
            }}
          >
            {s.value}
          </div>
          <div
            style={{ fontSize: 11.5, color: "var(--text2)", fontWeight: 500 }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── EMPTY STATE ── */
function EmptyState({ onNew }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px",
        gap: 14,
        animation: "fadeUp 0.4s ease",
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 16,
          background: "var(--subtle)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
          fontSize: 26,
        }}
      >
        <I.Folder />
      </div>
      <h3
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: "italic",
          fontSize: 20,
          color: "var(--text)",
        }}
      >
        No projects found
      </h3>
      <p
        style={{
          fontSize: 13.5,
          color: "var(--text2)",
          textAlign: "center",
          maxWidth: 280,
        }}
      >
        Start by creating your first project or adjust your filters.
      </p>
      <button
        onClick={onNew}
        style={{
          padding: "10px 22px",
          background: "linear-gradient(135deg, var(--accent), var(--accent2))",
          color: "#fff",
          border: "none",
          borderRadius: 11,
          fontSize: 13.5,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Instrument Sans', sans-serif",
          display: "flex",
          alignItems: "center",
          gap: 7,
          boxShadow: "0 4px 18px var(--glow)",
        }}
      >
        <I.Plus /> New Project
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════ */
export default function WorkSpace() {
  const [dark, setDark] = useState(true);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Last Updated");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [modal, setModal] = useState(null); // null | "new" | project object

  useEffect(() => {
    const fetchProjects = async () => {
      let res = await fetch("http://localhost:8000/api/v1/project/projects");
      let data = await res.json();
      setProjects(data);
    };

    fetchProjects();
  }, []); // ⭐ run only once

  /* derived data */
  const counts = {
    all: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    paused: projects.filter((p) => p.status === "paused").length,
    archived: projects.filter((p) => p.status === "archived").length,
    starred: projects.filter((p) => p.starred).length,
  };

  const filtered = projects
    .filter((p) => {
      if (filter === "Starred") return p.starred;
      if (filter !== "All") return p.status === filter.toLowerCase();
      return true;
    })
    .filter(
      (p) =>
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()) ||
        p.stack.some((s) => s.toLowerCase().includes(search.toLowerCase())),
    )
    .sort((a, b) => {
      if (sort === "Name") return a.name.localeCompare(b.name);
      if (sort === "Progress") return b.progress - a.progress;
      if (sort === "Status") return a.status.localeCompare(b.status);
      return 0; // Last Updated keeps original order
    });

  const handleSave = async (p) => {
    console.log(p);
    let form_data = {
      title: p.name,
      description: p.desc,
      deadline: p.deadline,
    };
    let result = await fetch(
      "http://localhost:8000/api/v1/user/create_project",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form_data),
      },
    );
    result = await result.json();
    console.log(result);
  };
  const handleStar = (id) =>
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, starred: !p.starred } : p)),
    );
  const handleDelete = (id) =>
    setProjects((prev) => prev.filter((p) => p.id !== id));

  return (
    <div
      className={dark ? "dark-root" : "light-root"}
      style={{ display: "flex", minHeight: "100vh", position: "relative" }}
    >
      <BgOrbs />

      {/* SIDEBAR */}
      <Sidebar
        filter={filter}
        setFilter={setFilter}
        counts={counts}
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
      />

      {/* MAIN */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: "28px 28px 40px",
          position: "relative",
          zIndex: 1,
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        {/* Page header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
            animation: "fadeUp 0.4s ease",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: 30,
                color: "var(--text)",
                letterSpacing: "-0.5px",
                marginBottom: 3,
              }}
            >
              My Projects
            </h1>
            <p style={{ fontSize: 13.5, color: "var(--text2)" }}>
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}{" "}
              {filter !== "All" ? `· ${filter}` : ""}
            </p>
          </div>
          <button
            onClick={() => setModal("new")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "10px 18px",
              background:
                "linear-gradient(135deg, var(--accent), var(--accent2))",
              color: "#fff",
              border: "none",
              borderRadius: 11,
              fontSize: 13.5,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Instrument Sans', sans-serif",
              boxShadow: "0 4px 18px var(--glow)",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1.5px)";
              e.currentTarget.style.boxShadow = "0 8px 28px var(--glow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 18px var(--glow)";
            }}
          >
            <I.Plus /> New Project
          </button>
        </div>

        {/* Stats */}
        <StatsBar projects={projects} />

        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 20,
            flexWrap: "wrap",
            alignItems: "center",
            animation: "fadeUp 0.4s 0.05s ease both",
          }}
        >
          {/* Search */}
          <div
            style={{
              flex: 1,
              minWidth: 200,
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 12,
                color: "var(--text3)",
                display: "flex",
                pointerEvents: "none",
              }}
            >
              <I.Search />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, stack, description…"
              style={{
                width: "100%",
                padding: "9px 14px 9px 36px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                color: "var(--text)",
                fontSize: 13.5,
                fontFamily: "'Instrument Sans', sans-serif",
                outline: "none",
                transition: "all 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent)";
                e.target.style.boxShadow = "0 0 0 3px var(--glow)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Filter pills */}

          {/* Sort */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowSortMenu((m) => !m)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 13px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                color: "var(--text2)",
                fontSize: 12.5,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'Instrument Sans', sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              <I.Sort /> {sort} <I.ChevronDown />
            </button>
            {showSortMenu && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 40,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 11,
                  padding: 5,
                  zIndex: 50,
                  minWidth: 150,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                  animation: "popIn 0.15s ease",
                }}
                onMouseLeave={() => setShowSortMenu(false)}
              >
                {SORT_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSort(s);
                      setShowSortMenu(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      background: sort === s ? "var(--subtle)" : "none",
                      border: "none",
                      color: sort === s ? "var(--accent)" : "var(--text2)",
                      fontSize: 13,
                      fontWeight: sort === s ? 600 : 400,
                      cursor: "pointer",
                      borderRadius: 7,
                      fontFamily: "'Instrument Sans', sans-serif",
                      textAlign: "left",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (sort !== s)
                        e.currentTarget.style.background = "var(--surface2)";
                    }}
                    onMouseLeave={(e) => {
                      if (sort !== s) e.currentTarget.style.background = "none";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View toggle */}
          <div
            style={{
              display: "flex",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: 3,
              gap: 3,
            }}
          >
            {[
              ["grid", <I.Grid />],
              ["list", <I.List />],
            ].map(([v, icon]) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 7,
                  border: "none",
                  background: viewMode === v ? "var(--accent)" : "transparent",
                  color: viewMode === v ? "#fff" : "var(--text2)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.18s",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Projects */}
        {filtered.length === 0 ? (
          <EmptyState onNew={() => setModal("new")} />
        ) : viewMode === "grid" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(290px,1fr))",
              gap: 16,
            }}
          >
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                onStar={handleStar}
                onEdit={setModal}
                onDelete={handleDelete}
                style={{ animationDelay: `${i * 0.04}s` }}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* list header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "6px 18px",
                color: "var(--text3)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              <div style={{ width: 10 }} />
              <div style={{ flex: 1 }}>Name / Description</div>
              <div style={{ width: 120 }}>Stack</div>
              <div style={{ width: 100 }}>Progress</div>

              <div style={{ width: 70 }}>Status</div>
              <div style={{ width: 70, textAlign: "right" }}>Updated</div>
              <div style={{ width: 96 }} />
            </div>
            {filtered.map((p, i) => (
              <ProjectRow
                key={p.id}
                project={p}
                onStar={handleStar}
                onEdit={setModal}
                onDelete={handleDelete}
                style={{ animationDelay: `${i * 0.03}s` }}
              />
            ))}
          </div>
        )}
      </main>

      {/* MODAL */}
      {modal && (
        <ProjectModal
          project={modal === "new" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
