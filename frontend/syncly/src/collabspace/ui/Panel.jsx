import React from "react";

export default function Panel({ children }) {
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

