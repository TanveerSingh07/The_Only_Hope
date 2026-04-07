// UIPrimitives.jsx
// Reusable micro-components used across every screen.
// Keeping them here avoids copy-pasting the same JSX everywhere.



// ── Btn ──────────────────────────────────────────────────────
// A single button component with 4 visual variants.
// Usage: <Btn variant="outline" onClick={fn}>Click me</Btn>
// variant options: "primary" | "outline" | "ghost" | "danger"
export function Btn({ children, variant = "primary", onClick, style: s, disabled }) {
    const base = {
        borderRadius: 10, fontSize: 15, fontWeight: 700,
        border: "none", transition: "all .22s",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "inherit",
    };

    // Each variant just changes background, text color, border, and padding
    const variants = {
        primary: { ...base, background: "linear-gradient(135deg,#22d3ee,#a78bfa)", color: "#05030e", padding: "12px 28px" },
        outline: { ...base, background: "transparent", color: "#22d3ee", border: "1.5px solid #22d3ee", padding: "11px 26px" },
        ghost: { ...base, background: "rgba(255,255,255,0.06)", color: "#f1f5f9", border: "1px solid rgba(255,255,255,0.1)", padding: "11px 24px" },
        danger: { ...base, background: "rgba(248,113,113,0.15)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)", padding: "11px 24px" },
    };

    return (
        <button onClick={onClick} disabled={disabled} style={{ ...variants[variant], ...s }}>
            {children}
        </button>
    );
}

// ── ProgressBar ──────────────────────────────────────────────
// A simple horizontal bar that fills to `value`% with a glow.
// Usage: <ProgressBar value={75} color="#22d3ee" />
export function ProgressBar({ value, color = "#22d3ee", h = 8 }) {
    return (
        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 99, height: h, overflow: "hidden", width: "100%" }}>
            <div style={{
                width: `${value}%`, height: "100%",
                background: color, borderRadius: 99,
                transition: "width 1.2s ease",
                boxShadow: `0 0 10px ${color}60`,  // 60 = 38% opacity in hex
            }} />
        </div>
    );
}

// ── Tag ──────────────────────────────────────────────────────
// A small pill badge. Used for "94% Match", "GUEST", trait labels, etc.
// Usage: <Tag color="#4ade80">Very High</Tag>
export function Tag({ children, color = "#22d3ee" }) {
    return (
        <span style={{
            background: `${color}18`,          // 18 hex = ~10% opacity
            border: `1px solid ${color}35`,    // 35 hex = ~21% opacity
            borderRadius: 99,
            padding: "4px 12px",
            fontSize: 13,
            color,
            fontWeight: 600,
        }}>
            {children}
        </span>
    );
}
