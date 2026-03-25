import React, { useMemo, useState } from "react";
import { generateChatReply } from "./mockAi";
import Panel from "../ui/Panel";

function ChatMessage({ role, content }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          whiteSpace: "pre-wrap",
          lineHeight: 1.55,
          fontSize: 13,
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.10)",
          background: isUser ? "rgba(127,111,255,0.22)" : "rgba(0,0,0,0.10)",
          color: isUser ? "white" : "#e7e7ff",
        }}
      >
        {content}
      </div>
    </div>
  );
}

export default function CollabSpaceAIChat({ project }) {
  const [messages, setMessages] = useState(() => [
    {
      role: "assistant",
      content: `Hi! I’m your CollabSpace AI assistant for "${project?.title || "this project"}". Ask me for a plan, a summary, or risks.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function onSend() {
    if (!canSend) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    setLoading(true);
    // Simulate API latency for a more realistic UX.
    await new Promise((r) => setTimeout(r, 550));

    setMessages((prev) => {
      const history = prev;
      const reply = generateChatReply({ project, message: userMessage, history });
      return [...prev, { role: "assistant", content: reply }];
    });
    setLoading(false);
  }

  async function copyTranscript() {
    const transcript = messages
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = transcript;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  }

  function onClear() {
    setMessages([
      {
        role: "assistant",
        content: `New chat started for "${project?.title || "this project"}". What do you want to do next?`,
      },
    ]);
    setInput("");
  }

  return (
    <Panel>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 900 }}>Chat</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            type="button"
            onClick={copyTranscript}
            disabled={loading}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              cursor: loading ? "not-allowed" : "pointer",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "white",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={loading}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              cursor: loading ? "not-allowed" : "pointer",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "white",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <div
        style={{
          maxHeight: 320,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          paddingRight: 6,
          marginBottom: 14,
        }}
      >
        {messages.map((m, idx) => (
          <ChatMessage key={idx} role={m.role} content={m.content} />
        ))}
        {loading && (
          <div style={{ color: "#b0b0d0", fontSize: 13 }}>AI is responding…</div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI… (e.g., “Give me a 3-step plan”)"
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            outline: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
        />
        <button
          type="button"
          onClick={onSend}
          disabled={!canSend}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            cursor: canSend ? "pointer" : "not-allowed",
            border: "1px solid rgba(255,255,255,0.12)",
            background: canSend ? "rgba(127,111,255,0.18)" : "rgba(255,255,255,0.05)",
            color: "white",
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          Send
        </button>
      </div>
    </Panel>
  );
}

