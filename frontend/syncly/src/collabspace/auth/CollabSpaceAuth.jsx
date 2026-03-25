import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      <div style={{ fontSize: 12, color: "#b0b0d0", marginBottom: 6 }}>
        {label}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  );
}

export default function CollabSpaceAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // login | signup

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const canSubmit = useMemo(() => {
    if (!email.trim() || !password.trim()) return false;
    if (mode === "signup" && !name.trim()) return false;
    return true;
  }, [email, password, name, mode]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    // Mock auth: no backend calls yet.
    await new Promise((r) => setTimeout(r, 400));

    localStorage.setItem("token", JSON.stringify(`mock_token_${Date.now()}`));
    setLoading(false);
    navigate("/collabspace");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: "100%",
          padding: 20,
          borderRadius: 16,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: 22, marginBottom: 6 }}>CollabSpace AI</h1>
        <p style={{ fontSize: 13, color: "#b0b0d0", marginBottom: 18 }}>
          Sign in to manage your collaboration projects.
        </p>

        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <button
            type="button"
            onClick={() => setMode("login")}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 10,
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.12)",
              background: mode === "login" ? "rgba(127,111,255,0.20)" : "transparent",
              color: "white",
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 10,
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.12)",
              background: mode === "signup" ? "rgba(127,111,255,0.20)" : "transparent",
              color: "white",
            }}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={onSubmit}>
          {mode === "signup" && (
            <Field label="Full Name" value={name} onChange={setName} type="text" />
          )}
          <Field label="Email" value={email} onChange={setEmail} type="email" />
          <Field
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
          />

          <button
            disabled={!canSubmit || loading}
            type="submit"
            style={{
              width: "100%",
              padding: "12px 12px",
              borderRadius: 12,
              border: "none",
              cursor: canSubmit && !loading ? "pointer" : "not-allowed",
              background: "linear-gradient(135deg, rgba(127,111,255,1), rgba(180,172,255,1))",
              color: "#0b0b12",
              fontWeight: 700,
            }}
          >
            {loading ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

