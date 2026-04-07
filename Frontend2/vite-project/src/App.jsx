// App.jsx — Root component and single source of truth.
//
// STATE OVERVIEW:
//   page          — which screen is rendered (string id)
//   user          — logged-in user object or null
//   showAuth      — whether the auth modal is open
//   authMode      — "login" or "signup" (controls modal heading)
//   obAnswers     — answers from the Onboarding screen
//   taskResults   — results array from the Task Arena
//   analysis      — final AI analysis object from Processing screen
//
// NAVIGATION PATTERN:
//   We use a simple page state string instead of React Router <Routes>.
//   Every screen receives `onNavigate` (or `onNav`) as a prop and calls
//   it with the target page id — e.g. onNavigate("dashboard").
//   This keeps all routing logic in one place (here).

import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Orbs from "./components/Orbs/Orbs";
import Landing from "./screens/Landing";
import Onboarding from "./screens/Onboarding";

// ── Page imports (each will be created in upcoming steps) ──
// We import them lazily with a fallback so the app doesn't crash
// before each screen is built. Replace the placeholders as we go.
const Placeholder = ({ name }) => (
  <div style={{
    minHeight: "100vh", display: "flex", alignItems: "center",
    justifyContent: "center", flexDirection: "column", gap: 16,
    paddingTop: 68,
  }}>
    <Orbs />
    <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
      <h2 className="ff" style={{ fontSize: 28, marginBottom: 8 }}>{name}</h2>
      <p style={{ color: "#94a3b8" }}>Coming in the next step</p>
    </div>
  </div>
);

export default function App() {
  // ── Global state ──────────────────────────────────────────
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("signup");
  const [obAnswers, setObAnswers] = useState(null);
  const [taskResults, setTaskResults] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  // ── Navigation helper ─────────────────────────────────────
  const nav = (p) => setPage(p);

  // ── Auth handlers ─────────────────────────────────────────
  // Called when user submits the auth modal
  const handleAuth = (userData) => {
    setUser(userData);
    setShowAuth(false);
    // After login, send them to onboarding if no analysis yet
    if (page === "landing") nav("onboarding");
  };

  // Called when "Start My Journey" is clicked on Landing
  const handleStart = () => {
    if (!user) {
      setAuthMode("signup");
      setShowAuth(true);
    } else if (analysis) {
      nav("dashboard");       // already has results → go to dashboard
    } else {
      nav("onboarding");      // first time → start the flow
    }
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#05030e", color: "#f1f5f9" }}>

      {/* Navbar is always visible */}
      <Navbar
        page={page}
        onNav={nav}
        user={user}
        onAuthClick={() => { setAuthMode("login"); setShowAuth(true); }}
      />

      {/* Auth modal placeholder — Step 4 will replace this */}
      {showAuth && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
          zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div className="glass" style={{ padding: 40, maxWidth: 400, width: "100%", margin: 24, textAlign: "center" }}>
            <h2 className="ff" style={{ marginBottom: 8 }}>Auth Modal</h2>
            <p style={{ color: "#94a3b8", marginBottom: 24 }}>Coming in Step 4</p>
            {/* Temp: quick login for testing */}
            <button
              onClick={() => handleAuth({ name: "Alex", email: "alex@test.com", mode: "authenticated" })}
              style={{
                background: "linear-gradient(135deg,#22d3ee,#a78bfa)",
                border: "none", borderRadius: 10, padding: "12px 28px",
                color: "#05030e", fontWeight: 700, fontSize: 15, cursor: "pointer",
                marginRight: 10,
              }}
            >
              Quick Login (test)
            </button>
            <button
              onClick={() => setShowAuth(false)}
              style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "12px 28px", color: "#f1f5f9",
                fontWeight: 700, fontSize: 15, cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Page Router ───────────────────────────────────── */}
      {/* Each condition renders one screen. Props flow down from here. */}

      {page === "landing" && (
        <Landing
          onStart={handleStart}
          onLogin={() => { setAuthMode("login"); setShowAuth(true); }}
        />
      )}

      {page === "onboarding" && (
        <Onboarding onComplete={(a) => { setObAnswers(a); nav("arena"); }} />
      )}

      {page === "arena" && (
        <Placeholder name="Task Arena — Step 6" />
      )}

      {page === "processing" && (
        <Placeholder name="Processing — Step 7" />
      )}

      {page === "dashboard" && (
        <Placeholder name="Dashboard — Step 8" />
      )}

      {page === "careers" && (
        <Placeholder name="Career Paths — Step 9" />
      )}

      {page === "learning" && (
        <Placeholder name="Learning Path — Step 10" />
      )}

      {page === "goal" && (
        <Placeholder name="Our Goal — Step 11" />
      )}
    </div>
  );
}
