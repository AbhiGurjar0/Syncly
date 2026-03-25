import React, { useState } from "react";
import { generateProjectSummary } from "./mockAi";

function Panel({ children }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 16,
        padding: 16,
      }}
    >
      {children}
    </div>
  );
}

export default function CollabSpaceAISummary({ project }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      // Basic fallback for environments without `navigator.clipboard`.
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  }

  async function onGenerate() {
    setLoading(true);
    // Simulate “thinking” so it feels real.
    await new Promise((r) => setTimeout(r, 500));
    const next = generateProjectSummary(project);
    setSummary(next);
    setLoading(false);
  }

  return (
    <Panel>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 900 }}>Summary</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            type="button"
            onClick={onGenerate}
            disabled={loading}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              cursor: loading ? "not-allowed" : "pointer",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(127,111,255,0.18)",
              color: "white",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {loading ? "Generating..." : "Generate summary"}
          </button>
          <button
            type="button"
            onClick={() => copyText(summary)}
            disabled={!summary || loading}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              cursor: !summary || loading ? "not-allowed" : "pointer",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "white",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {summary ? (
        <pre
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            lineHeight: 1.55,
            fontFamily: "inherit",
            color: "#e7e7ff",
            fontSize: 13,
          }}
        >
          {summary}
        </pre>
      ) : (
        <div style={{ fontSize: 13, color: "#b0b0d0", lineHeight: 1.6 }}>
          Click “Generate summary” to get an AI-style brief for this project.
        </div>
      )}
    </Panel>
  );
}

