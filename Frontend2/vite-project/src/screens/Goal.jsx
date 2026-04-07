// Goal.jsx — Our Mission page

import Orbs from "../components/Orbs/Orbs";

export default function Goal() {
    const pillars = [
        { label: "Science-Backed", desc: "Our methodology is grounded in cognitive psychology, behavioral economics, and years of career research.", color: "#22d3ee" },
        { label: "AI-Powered", desc: "We use LLM-based analysis to find non-obvious patterns between behavioral traits and long-term career success.", color: "#a78bfa" },
        { label: "Actually Useful", desc: "We don't just show you data — we give you an actionable roadmap with real tools, timelines, and milestones.", color: "#f472b6" },
    ];

    const team = [
        { initials: "AC", name: "Dr. Aisha Chen", role: "AI Research Lead" },
        { initials: "MR", name: "Marcus Rivera", role: "Behavioral Psychologist" },
        { initials: "SP", name: "Sofia Patel", role: "UX & Product Design" },
    ];

    return (
        <div style={{ minHeight: "100vh", padding: "88px 28px 80px", position: "relative" }}>
            <Orbs />
            <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", zIndex: 1 }}>

                {/* Hero */}
                <div style={{ textAlign: "center", marginBottom: 80, animation: "fadeUp .6s ease forwards" }}>
                    <h1 className="ff" style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
                        Our <span className="gt">Mission</span>
                    </h1>
                    <p style={{ color: "#94a3b8", fontSize: 19, maxWidth: 640, margin: "0 auto", lineHeight: 1.82 }}>
                        We believe every person has a unique cognitive signature — a distinct way of thinking and deciding. PathFinder exists to decode that signature and translate it into actionable, life-changing career direction.
                    </p>
                </div>

                {/* Pillars */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 22, marginBottom: 80 }}>
                    {pillars.map((p, i) => (
                        <div key={i} className="glass hs" style={{ padding: "34px 30px", animation: `fadeUp .6s ease ${i * .14}s both` }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${p.color}18`, border: `1px solid ${p.color}35`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} />
                            </div>
                            <h3 className="ff" style={{ fontWeight: 700, fontSize: 21, marginBottom: 12 }}>{p.label}</h3>
                            <p style={{ color: "#94a3b8", lineHeight: 1.75, fontSize: 15 }}>{p.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Problem statement */}
                <div className="glass" style={{ padding: "48px 44px", textAlign: "center", marginBottom: 80, borderTop: "1px solid rgba(244,114,182,.2)" }}>
                    <h2 className="ff" style={{ fontSize: 34, fontWeight: 700, marginBottom: 18 }}>
                        The Problem We're <span className="gt">Solving</span>
                    </h2>
                    <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.85, maxWidth: 660, margin: "0 auto" }}>
                        <strong style={{ color: "#f1f5f9" }}>70% of people end up in careers that don't match their cognitive style</strong> — not because they lack talent, but because no existing tool has ever measured them correctly. Traditional assessments ask "what do you like?" We ask "how do you think?" — and that changes everything.
                    </p>
                </div>

                {/* Team */}
                <div style={{ textAlign: "center" }}>
                    <h2 className="ff" style={{ fontSize: 36, fontWeight: 700, marginBottom: 40 }}>The <span className="gt">Team</span></h2>
                    <div style={{ display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap" }}>
                        {team.map((m, i) => (
                            <div key={i} className="glass hs" style={{ padding: "28px 34px", textAlign: "center", minWidth: 200 }}>
                                <div style={{
                                    width: 52, height: 52, borderRadius: "50%", margin: "0 auto 14px",
                                    background: "linear-gradient(135deg,#22d3ee,#a78bfa)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <span className="ff" style={{ fontWeight: 800, fontSize: 14, color: "#05030e" }}>{m.initials}</span>
                                </div>
                                <div className="ff" style={{ fontWeight: 700, fontSize: 18, marginBottom: 5 }}>{m.name}</div>
                                <div style={{ color: "#94a3b8", fontSize: 14 }}>{m.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
