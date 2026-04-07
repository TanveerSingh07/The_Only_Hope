// App.jsx — Root component.
// Holds all global state (current page, logged-in user, etc.)
// and passes it down to child components via props.
// We use manual page state instead of React Router <Routes>
// because the original design uses a single-page "page switcher" pattern.

import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  // page — which screen is currently visible
  const [page, setPage] = useState("landing");
  // user — null when logged out, { name, mode } when logged in
  const [user, setUser] = useState(null);

  const nav = (p) => setPage(p);

  return (
    <div style={{ minHeight: "100vh", background: "#05030e", color: "#f1f5f9" }}>
      <Navbar
        page={page}
        onNav={nav}
        user={user}
        onAuthClick={() => console.log("auth modal — coming soon")}
      />

      {/* Placeholder content so you can see the navbar in context */}
      <div style={{ paddingTop: 68, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🧭</div>
          <h1 style={{ fontFamily: "sans-serif", fontSize: 32, marginBottom: 12 }}>PathFinder</h1>
          <p style={{ color: "#94a3b8" }}>Current page: <strong style={{ color: "#22d3ee" }}>{page}</strong></p>
          {/* Temp buttons to test navbar active state */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
            {["landing", "goal"].map((p) => (
              <button key={p} onClick={() => nav(p)}
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#f1f5f9", padding: "8px 18px", borderRadius: 8, cursor: "pointer" }}>
                Go to {p}
              </button>
            ))}
            {/* Simulate login to test user state in navbar */}
            <button onClick={() => setUser(user ? null : { name: "Alex", mode: "authenticated" })}
              style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.3)", color: "#22d3ee", padding: "8px 18px", borderRadius: 8, cursor: "pointer" }}>
              {user ? "Log out (test)" : "Log in (test)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
