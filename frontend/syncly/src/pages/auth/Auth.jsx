import { useState, useEffect, useRef } from "react";

/* ── Google Fonts injection ── */
const FONT_LINK = document.createElement("link");
FONT_LINK.rel = "stylesheet";
FONT_LINK.href =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:ital,wdth,wght@0,75..100,400..700;1,75..100,400..700&display=swap";
document.head.appendChild(FONT_LINK);

/* ── Global styles ── */
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }

  :root {
    --ease: cubic-bezier(0.4, 0, 0.2, 1);
    --dur: 0.3s;
  }

  .dark-root {
    --bg:           #080810;
    --bg2:          #0e0e1a;
    --surface:      #13131f;
    --surface2:     #1a1a28;
    --border:       rgba(255,255,255,0.07);
    --border-h:     rgba(255,255,255,0.15);
    --text:         #7979ae;
    --text2:        #dddde7;
    --text3:        #3d3d60;
    --accent:       #7f6fff;
    --accent2:      #b4acff;
    --glow:         rgba(127,111,255,0.22);
    --subtle:       rgba(127,111,255,0.09);
    --err:          #ff4f72;
    --ok:           #34d399;
    --inp-bg:       rgba(255,255,255,0.035);
    --inp-border:   rgba(255,255,255,0.08);
    --card-shadow:  0 0 0 1px rgba(255,255,255,0.04), 0 24px 72px rgba(0,0,0,0.55);
  }
  .light-root {
    --bg:           #f2f0ff;
    --bg2:          #e8e5ff;
    --surface:      #ffffff;
    --surface2:     #f6f5ff;
    --border:       rgba(0,0,0,0.07);
    --border-h:     rgba(0,0,0,0.15);
    --text:         #131317;
    --text2:        #6464a0;
    --text3:        #b0b0d0;
    --accent:       #5a4fff;
    --accent2:      #9188ff;
    --glow:         rgba(90,79,255,0.18);
    --subtle:       rgba(90,79,255,0.07);
    --err:          #e03058;
    --ok:           #059669;
    --inp-bg:       rgba(0,0,0,0.02);
    --inp-border:   rgba(0,0,0,0.09);
    --card-shadow:  0 0 0 1px rgba(90,79,255,0.08), 0 24px 72px rgba(90,79,255,0.1);
  }

  body {
    font-family: 'Instrument Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    transition: background 0.35s var(--ease), color 0.35s var(--ease);
    overflow-x: hidden;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes spinR { to { transform: rotate(360deg); } }
  @keyframes orbA  { 0%,100%{ transform:translate(0,0) scale(1);      } 50%{ transform:translate(-60px,40px) scale(1.12); } }
  @keyframes orbB  { 0%,100%{ transform:translate(0,0) scale(1);      } 50%{ transform:translate(50px,-50px) scale(1.15); } }
  @keyframes orbC  { 0%,100%{ transform:translate(-50%,-50%) scale(1);} 50%{ transform:translate(-52%,-48%) scale(0.88); } }
  @keyframes pulse { 0%,100%{ box-shadow: 0 0 0 0 var(--glow); } 60%{ box-shadow: 0 0 0 6px transparent; } }
`;

function injectCSS(css) {
  const s = document.createElement("style");
  s.textContent = css;
  document.head.appendChild(s);
}
injectCSS(GLOBAL_CSS);

/* ─── tiny helpers ─── */
const cls = (...args) => args.filter(Boolean).join(" ");

/* ─── ICONS ─── */
const Icon = {
  Mail: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="2" y="4" width="20" height="16" rx="2.5" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  ),
  Lock: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  User: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  Eye: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  Arrow: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 12H5m0 0 7 7m-7-7 7-7" />
    </svg>
  ),
  Check: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Google: () => (
    <svg width="15" height="15" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  ),
  GitHub: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
};

/* ─── BACKGROUND ORBS ─── */
function BgOrbs() {
  const orbStyle = (a, b, c, d, anim, color) => ({
    position: "absolute",
    width: a,
    height: b,
    top: c,
    left: d,
    borderRadius: "50%",
    background: color,
    filter: "blur(90px)",
    opacity: 0.7,
    animation: `${anim} 20s ease-in-out infinite`,
    pointerEvents: "none",
  });
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
        style={orbStyle(
          640,
          640,
          -180,
          "auto",
          "orbA",
          "radial-gradient(circle, rgba(127,111,255,0.16) 0%, transparent 70%)",
        )}
      />
      <div
        style={orbStyle(
          480,
          480,
          "auto",
          -80,
          "orbB",
          "radial-gradient(circle, rgba(180,172,255,0.1) 0%, transparent 70%)",
        )}
      />
      <div
        style={{
          ...orbStyle(
            320,
            320,
            "40%",
            "50%",
            "orbC",
            "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)",
          ),
          transform: "translate(-50%,-50%)",
        }}
      />
    </div>
  );
}

/* ─── LOGO ─── */
function Logo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 28,
        animation: "fadeUp 0.45s ease both",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          background: "linear-gradient(135deg, var(--accent), var(--accent2))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Instrument Serif', serif",
          fontSize: 20,
          color: "#fff",
          boxShadow: "0 4px 20px var(--glow)",
          animation: "pulse 3s ease-in-out infinite",
          position: "relative",
        }}
      >
        <span style={{ fontStyle: "italic", lineHeight: 1 }}>N</span>
      </div>
      <span
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 22,
          letterSpacing: "-0.2px",
          color: "var(--text)",
          fontStyle: "italic",
        }}
      >
        Nexus
        <span
          style={{
            fontStyle: "normal",
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          {" "}
          AI
        </span>
      </span>
    </div>
  );
}

/* ─── FIELD ─── */
function Field({
  label,
  type = "text",
  placeholder,
  icon,
  rightLabel,
  rightAction,
  id,
  onChange,
  value,
}) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  return (
    <div style={{ marginBottom: 14 }}>
      {(label || rightLabel) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 7,
          }}
        >
          {label && (
            <label
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: "var(--text2)",
                letterSpacing: 0.2,
                textTransform: "uppercase",
              }}
            >
              {label}
            </label>
          )}
          {rightLabel && (
            <span
              onClick={rightAction}
              style={{
                fontSize: 12.5,
                color: "var(--accent)",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              {rightLabel}
            </span>
          )}
        </div>
      )}
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <span
          style={{
            position: "absolute",
            left: 13,
            color: "var(--text3)",
            display: "flex",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {icon}
        </span>
        <input
          id={id}
          type={isPw ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "11px 14px 11px 40px",
            background: "var(--inp-bg)",
            border: "1px solid var(--inp-border)",
            borderRadius: 11,
            color: "var(--text)",
            fontSize: 14,
            fontFamily: "'Instrument Sans', sans-serif",
            outline: "none",
            transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--accent)";
            e.target.style.background = "var(--subtle)";
            e.target.style.boxShadow = "0 0 0 3px var(--glow)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--inp-border)";
            e.target.style.background = "var(--inp-bg)";
            e.target.style.boxShadow = "none";
          }}
        />
        {isPw && (
          <button
            onClick={() => setShow((s) => !s)}
            style={{
              position: "absolute",
              right: 12,
              background: "none",
              border: "none",
              color: "var(--text3)",
              cursor: "pointer",
              display: "flex",
              padding: 2,
            }}
          >
            {show ? <Icon.EyeOff /> : <Icon.Eye />}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── SOCIAL BUTTON ─── */
function SocialBtn({ icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "10px 12px",
        background: hov ? "var(--surface2)" : "var(--inp-bg)",
        border: `1px solid ${hov ? "var(--border-h)" : "var(--inp-border)"}`,
        borderRadius: 10,
        color: "var(--text)",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "'Instrument Sans', sans-serif",
        transition: "all 0.2s",
        transform: hov ? "translateY(-1px)" : "none",
        whiteSpace: "nowrap",
        flex: 1,
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ─── DIVIDER ─── */
function Divider({ label = "or" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "18px 0",
        color: "var(--text3)",
        fontSize: 11.5,
        letterSpacing: 1,
        textTransform: "uppercase",
      }}
    >
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      {label}
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

/* ─── CHECKBOX ─── */
function Checkbox({ checked, onChange, children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 9,
        marginBottom: 18,
        cursor: "pointer",
      }}
      onClick={onChange}
    >
      <div
        style={{
          width: 17,
          height: 17,
          borderRadius: 5,
          flexShrink: 0,
          marginTop: 1,
          border: `1.5px solid ${checked ? "var(--accent)" : "var(--inp-border)"}`,
          background: checked ? "var(--accent)" : "var(--inp-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
        }}
      >
        {checked && (
          <svg width="9" height="9" viewBox="0 0 10 10">
            <path
              d="M1.5 5l2.5 2.5 5-5"
              stroke="#fff"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>
        {children}
      </span>
    </div>
  );
}

/* ─── PRIMARY BUTTON ─── */
function PrimaryBtn({ children, onClick, loading, style: s }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%",
        padding: "12.5px",
        background: "linear-gradient(135deg, var(--accent), var(--accent2))",
        color: "#fff",
        fontSize: 14.5,
        fontWeight: 700,
        border: "none",
        borderRadius: 11,
        cursor: loading ? "not-allowed" : "pointer",
        fontFamily: "'Instrument Sans', sans-serif",
        transition: "all 0.2s",
        boxShadow: hov ? "0 8px 32px var(--glow)" : "0 4px 18px var(--glow)",
        transform: hov && !loading ? "translateY(-1.5px)" : "none",
        opacity: loading ? 0.75 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        position: "relative",
        overflow: "hidden",
        ...s,
      }}
    >
      {loading && (
        <span
          style={{
            width: 16,
            height: 16,
            border: "2px solid rgba(255,255,255,0.35)",
            borderTop: "2px solid #fff",
            borderRadius: "50%",
            animation: "spinR 0.7s linear infinite",
            display: "inline-block",
          }}
        />
      )}
      {loading ? "Please wait…" : children}
    </button>
  );
}

/* ─── CARD ─── */
function Card({ children, style: s }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 22,
        padding: "34px 32px",
        boxShadow: "var(--card-shadow)",
        position: "relative",
        overflow: "hidden",
        animation: "fadeUp 0.45s 0.05s ease both",
        ...s,
      }}
    >
      {/* top shimmer line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--accent2), transparent)",
          opacity: 0.45,
        }}
      />
      {children}
    </div>
  );
}

/* ─── PASSWORD STRENGTH ─── */
const strengthLevels = [
  { test: (v) => v.length === 0, label: "", score: 0, color: "" },
  { test: (v) => v.length < 6, label: "Too short", score: 1, color: "#ff4f72" },
  { test: (v) => v.length < 8, label: "Weak", score: 1, color: "#ff4f72" },
  {
    test: (v) => !/[A-Z]/.test(v) || !/[0-9]/.test(v),
    label: "Fair — add uppercase & numbers",
    score: 2,
    color: "#f59e0b",
  },
  {
    test: (v) => !/[^A-Za-z0-9]/.test(v),
    label: "Good — add a symbol",
    score: 3,
    color: "#34d399",
  },
];
function getStrength(v) {
  for (const l of strengthLevels) if (l.test(v)) return l;
  return { label: "Strong 💪", score: 4, color: "#60a5fa" };
}
function StrengthMeter({ value }) {
  const { label, score, color } = getStrength(value);
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 5 }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 99,
              background: i <= score ? color : "var(--border)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      {label && (
        <p
          style={{
            fontSize: 11,
            color,
            marginTop: 5,
            transition: "color 0.3s",
          }}
        >
          {label}
        </p>
      )}
    </div>
  );
}

/* ─── OTP INPUT ─── */
function OtpRow({ value, onChange }) {
  const refs = Array.from({ length: 6 }, () => useRef());
  const digits = value.padEnd(6, "").split("").slice(0, 6);
  const handleKey = (i, e) => {
    if (e.key === "Backspace") {
      const next = [...digits];
      next[i] = "";
      onChange(next.join("").trimEnd());
      if (i > 0) refs[i - 1].current.focus();
    }
  };
  const handleInput = (i, e) => {
    const ch = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = ch;
    onChange(next.join(""));
    if (ch && i < 5) refs[i + 1].current.focus();
  };
  return (
    <div
      style={{
        display: "flex",
        gap: 9,
        justifyContent: "center",
        margin: "22px 0",
      }}
    >
      {digits.map((d, i) => (
        <input
          key={i}
          ref={refs[i]}
          value={d}
          onKeyDown={(e) => handleKey(i, e)}
          onChange={(e) => handleInput(i, e)}
          maxLength={1}
          style={{
            width: 48,
            height: 56,
            textAlign: "center",
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "'Instrument Sans', sans-serif",
            background: d ? "var(--subtle)" : "var(--inp-bg)",
            border: `1px solid ${d ? "var(--accent)" : "var(--inp-border)"}`,
            borderRadius: 11,
            color: "var(--text)",
            outline: "none",
            transition: "all 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = "0 0 0 3px var(--glow)";
            e.target.style.borderColor = "var(--accent)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "none";
            if (!d) e.target.style.borderColor = "var(--inp-border)";
          }}
        />
      ))}
    </div>
  );
}

/* ─── THEME TOGGLE ─── */
function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        position: "fixed",
        top: 18,
        right: 18,
        zIndex: 100,
        width: 42,
        height: 42,
        borderRadius: 11,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        color: "var(--text2)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 17,
        transition: "all 0.2s",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--text2)";
      }}
      title="Toggle theme"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

/* ─── NAV TABS ─── */
function PageNav({ current, onChange }) {
  const tabs = [
    { id: "login", label: "Sign In" },
    { id: "signup", label: "Sign Up" },
    { id: "forgot", label: "Reset PW" },
  ];
  return (
    <div
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 4,
        zIndex: 100,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 13,
        padding: 4,
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            padding: "6px 14px",
            borderRadius: 9,
            border: "none",
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 700,
            fontSize: 12.5,
            cursor: "pointer",
            background: current === t.id ? "var(--accent)" : "transparent",
            color: current === t.id ? "#fff" : "var(--text2)",
            transition: "all 0.2s",
            letterSpacing: 0.1,
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ─── BACK LINK ─── */
function BackLink({ onClick, children = "Back to sign in" }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        color: "var(--text2)",
        fontSize: 13,
        fontWeight: 500,
        marginBottom: 22,
        width: "fit-content",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text2)")}
    >
      <Icon.Arrow />
      {children}
    </div>
  );
}

/* ─── SWITCH ROW ─── */
function SwitchRow({ text, linkText, onLink }) {
  return (
    <p
      style={{
        textAlign: "center",
        marginTop: 20,
        fontSize: 13.5,
        color: "var(--text2)",
        animation: "fadeUp 0.45s 0.1s ease both",
      }}
    >
      {text}{" "}
      <span
        onClick={onLink}
        style={{ color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}
      >
        {linkText} →
      </span>
    </p>
  );
}

/* ─── HEADER ─── */
function CardHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 28,
          fontStyle: "italic",
          letterSpacing: "-0.4px",
          color: "var(--text)",
          marginBottom: 6,
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.55 }}>
        {sub}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VIEWS
═══════════════════════════════════════════ */

function LoginView({ onNav }) {
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    let form_data = {
      email: email,
      password: pw,
      remember: remember,
    };

    let result = await fetch("http://localhost:8000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form_data),
    });

    result = await result.json();
    if (!result) {
      setLoading(false);
      return;
    }
    if (result?.success) {
      setLoading(false);
      window.location.href = "/";
      return;
    }
    setLoading(false);
    return "Error in login";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 16px",
        minHeight: "100vh",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Logo />
      <Card>
        <CardHeader
          title="Welcome back"
          sub="Sign in to continue your AI journey."
        />

        <div style={{ display: "flex", gap: 9, marginBottom: 0 }}>
          <SocialBtn icon={<Icon.Google />} label="Google" />
          <SocialBtn icon={<Icon.GitHub />} label="GitHub" />
        </div>
        <Divider />

        <Field
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={<Icon.Mail />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={<Icon.Lock />}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          rightLabel="Forgot password?"
          rightAction={() => onNav("forgot")}
        />

        <Checkbox checked={remember} onChange={() => setRemember((r) => !r)}>
          Remember me for 30 days
        </Checkbox>

        <PrimaryBtn onClick={handleSubmit} loading={loading}>
          Sign In
        </PrimaryBtn>
      </Card>
      <SwitchRow
        text="No account yet?"
        linkText="Create one free"
        onLink={() => onNav("signup")}
      />
    </div>
  );
}

function SignupView({ onNav }) {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = async () => {
    if (!agreed) return alert("Please select the checkbox");

    setLoading(true);
    console.log("Enters");

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            agreed,
            password: pw,
          }),
        },
      );
      console.log("Enterd");

      const result = await response.json();

      if (response.ok) {
        console.log("DOne");
        window.location.href = "/login";
      } else {
        alert(result.message || "Error in account creation");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
    console.log("Nothing Happendd");

    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 16px",
        minHeight: "100vh",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
        marginTop: "20px",
      }}
    >
      <Logo />
      <Card>
        <CardHeader
          title="Create account"
          sub="Join 200,000+ teams building with Nexus AI."
        />

        <div style={{ display: "flex", gap: 9 }}>
          <SocialBtn icon={<Icon.Google />} label="Google" />
          <SocialBtn icon={<Icon.GitHub />} label="GitHub" />
        </div>
        <Divider />

        <Field
          label="Full Name"
          type="text"
          placeholder="Alex Johnson"
          icon={<Icon.User />}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Field
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={<Icon.Mail />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ marginBottom: 6 }}>
          <Field
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            icon={<Icon.Lock />}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <StrengthMeter value={pw} />
        </div>

        <div style={{ marginTop: 14 }}>
          <Checkbox checked={agreed} onChange={() => setAgreed((a) => !a)}>
            I agree to the{" "}
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>
              Terms of Service
            </span>{" "}
            and{" "}
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>
              Privacy Policy
            </span>
          </Checkbox>
        </div>

        <PrimaryBtn onClick={handleSubmit} loading={loading}>
          Create Free Account
        </PrimaryBtn>

        {/* trust badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 18,
            marginTop: 18,
          }}
        >
          {["SOC 2 Type II", "GDPR Ready", "256-bit SSL"].map((b) => (
            <span
              key={b}
              style={{
                fontSize: 10.5,
                color: "var(--text3)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                stroke="var(--ok)"
                strokeWidth="2"
              >
                <path d="M1 6l3 3 7-6" />
              </svg>
              {b}
            </span>
          ))}
        </div>
      </Card>
      <SwitchRow
        text="Already have an account?"
        linkText="Sign in"
        onLink={() => onNav("login")}
      />
    </div>
  );
}

function ForgotView({ onNav }) {
  const [step, setStep] = useState(1); // 1 = email, 2 = otp, 3 = done
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const handleSend = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1800);
  };
  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1800);
  };
  const handleReset = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNav("login");
    }, 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 16px",
        minHeight: "100vh",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Logo />

      {/* STEP 1 */}
      {step === 1 && (
        <Card key="step1">
          <BackLink onClick={() => onNav("login")} />
          <CardHeader
            title="Forgot password?"
            sub="Enter your email and we'll send a reset code."
          />
          <Field
            label="Email"
            type="email"
            placeholder="you@example.com"
            icon={<Icon.Mail />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PrimaryBtn
            onClick={handleSend}
            loading={loading}
            style={{ marginTop: 6 }}
          >
            Send Reset Code
          </PrimaryBtn>
        </Card>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <Card key="step2">
          <BackLink onClick={() => setStep(1)} children="Change email" />
          {/* success notice */}
          <div
            style={{
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.22)",
              borderRadius: 11,
              padding: "13px 15px",
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              marginBottom: 22,
            }}
          >
            <span style={{ color: "var(--ok)", marginTop: 1, flexShrink: 0 }}>
              <Icon.Check />
            </span>
            <div>
              <p
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--ok)",
                  marginBottom: 2,
                }}
              >
                Email sent!
              </p>
              <p
                style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}
              >
                We sent a 6-digit code to{" "}
                <strong style={{ color: "var(--accent)" }}>{email}</strong>
              </p>
            </div>
          </div>
          <CardHeader
            title="Enter the code"
            sub="Check your inbox (and spam folder, just in case)."
          />
          <OtpRow value={otp} onChange={setOtp} />
          <PrimaryBtn onClick={handleVerify} loading={loading}>
            Verify Code
          </PrimaryBtn>
          <p
            style={{
              textAlign: "center",
              marginTop: 14,
              fontSize: 12.5,
              color: "var(--text3)",
            }}
          >
            Didn't get it?{" "}
            <span
              style={{
                color: "var(--accent)",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Resend in 0:55
            </span>
          </p>
        </Card>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <Card key="step3">
          <CardHeader
            title="New password"
            sub="Choose a strong password you haven't used before."
          />
          <div style={{ marginBottom: 6 }}>
            <Field
              label="New Password"
              type="password"
              placeholder="Min. 8 characters"
              icon={<Icon.Lock />}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <StrengthMeter value={pw} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <Field
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              icon={<Icon.Lock />}
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
            />
            {pw2 && pw !== pw2 && (
              <p style={{ fontSize: 11.5, color: "var(--err)", marginTop: 5 }}>
                Passwords don't match
              </p>
            )}
            {pw2 && pw === pw2 && pw.length >= 8 && (
              <p style={{ fontSize: 11.5, color: "var(--ok)", marginTop: 5 }}>
                ✓ Passwords match
              </p>
            )}
          </div>
          <PrimaryBtn onClick={handleReset} loading={loading}>
            Reset & Sign In
          </PrimaryBtn>
        </Card>
      )}

      {/* step indicators */}
      <div style={{ display: "flex", gap: 6, marginTop: 20 }}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              width: s === step ? 22 : 7,
              height: 7,
              borderRadius: 99,
              background: s === step ? "var(--accent)" : "var(--border)",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>

      <SwitchRow
        text="Remembered it?"
        linkText="Sign in"
        onLink={() => onNav("login")}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   Auth
═══════════════════════════════════════════ */
export default function Auth() {
  const [view, setView] = useState("login");
  const [dark, setDark] = useState(true);

  return (
    <div
      className={dark ? "dark-root" : "light-root"}
      style={{ minHeight: "100vh" }}
    >
      <BgOrbs />
      <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
      <PageNav current={view} onChange={setView} />

      {view === "login" && <LoginView onNav={setView} />}
      {view === "signup" && <SignupView onNav={setView} />}
      {view === "forgot" && <ForgotView onNav={setView} />}
    </div>
  );
}
