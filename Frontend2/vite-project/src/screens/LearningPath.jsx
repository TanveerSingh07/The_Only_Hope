// LearningPath.jsx — Phase-by-phase learning roadmap

import { useState } from "react";
import { Btn, ProgressBar } from "../components/common/UIPrimitives";

const PHASE_COLORS = ["#22d3ee", "#a78bfa", "#f472b6"];

export default function LearningPath({ analysis, onNavigate }) {
    const [ph, setPh] = useState(0);

    if (!analysis?.learningPath) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 28, paddingTop: 88 }}>
            <div style={{ textAlign: "center" }}>
                <h2 className="ff" style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Complete Assessment First</h2>
                <Btn onClick={() => onNavigate("onboarding")}>Start Assessment →</Btn>
            </div>
        </div>
    );

    const lp = analysis.learningPath;

    return (
        <div style={{ minHeight: "100vh", padding: "88px 28px 60px" }}>
            <div style={{ maxWidth: 860, margin: "0 auto" }}>

                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <h1 className="ff" style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: 800, marginBottom: 20 }}>
                        Your <span className="gt">Learning Roadmap</span>
                    </h1>
                    {/* Summary strip */}
                    <div style={{ display: "inline-flex", gap: 0, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, overflow: "hidden" }}>
                        {[[lp.career, "Target Role", "#22d3ee"], [lp.months + " months", "Timeline", "#4ade80"], [lp.phases.length + " phases", "Structure", "#a78bfa"]].map(([v, l, c], i, a) => (
                            <div key={l} style={{ padding: "18px 28px", textAlign: "center", borderRight: i < a.length - 1 ? "1px solid rgba(255,255,255,.08)" : "none" }}>
                                <div className="ff" style={{ fontSize: 20, fontWeight: 700, color: c }}>{v}</div>
                                <div style={{ color: "#475569", fontSize: 13, marginTop: 3 }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Phase tabs */}
                <div style={{ display: "flex", gap: 0, marginBottom: 36, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,.07)" }}>
                    {lp.phases.map((p, i) => (
                        <button key={i} onClick={() => setPh(i)} style={{
                            flex: 1, padding: "18px 14px",
                            background: ph === i ? `${PHASE_COLORS[i]}18` : "rgba(255,255,255,.025)",
                            border: "none", borderRight: i < lp.phases.length - 1 ? "1px solid rgba(255,255,255,.07)" : "none",
                            cursor: "pointer", transition: "all .22s", textAlign: "center",
                        }}>
                            <div style={{ fontSize: 11, color: PHASE_COLORS[i], fontWeight: 700, letterSpacing: 2, marginBottom: 5 }}>PHASE {i + 1}</div>
                            <div className="ff" style={{ fontSize: 15, fontWeight: 700, color: ph === i ? PHASE_COLORS[i] : "#f1f5f9", marginBottom: 3 }}>{p.phase}</div>
                            <div style={{ fontSize: 12, color: "#475569" }}>{p.duration}</div>
                        </button>
                    ))}
                </div>

                {/* Active phase detail */}
                {lp.phases.map((p, i) => ph === i && (
                    <div key={i} style={{ animation: "fadeUp .4s ease forwards" }}>
                        <div className="glass" style={{ padding: 38, borderTop: `3px solid ${PHASE_COLORS[i]}` }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 18, marginBottom: 32 }}>
                                <div>
                                    <div style={{ color: PHASE_COLORS[i], fontSize: 11, fontWeight: 700, letterSpacing: 2.5, marginBottom: 8 }}>
                                        PHASE {i + 1} · {p.duration.toUpperCase()}
                                    </div>
                                    <h3 className="ff" style={{ fontSize: 30, fontWeight: 700 }}>{p.phase}</h3>
                                </div>
                                <div style={{ background: `${PHASE_COLORS[i]}12`, border: `1px solid ${PHASE_COLORS[i]}28`, borderRadius: 12, padding: "16px 22px", maxWidth: 280 }}>
                                    <div style={{ fontSize: 11, color: PHASE_COLORS[i], fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>MILESTONE</div>
                                    <div style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.6 }}>{p.milestone}</div>
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>SKILLS TO ACQUIRE</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                    {p.skills.map((s, j) => (
                                        <div key={j} style={{ background: `${PHASE_COLORS[i]}10`, border: `1px solid ${PHASE_COLORS[i]}28`, borderRadius: 8, padding: "9px 18px", fontSize: 14, color: PHASE_COLORS[i], fontWeight: 500 }}>
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="glass" style={{ padding: "20px 28px", marginTop: 16, display: "flex", alignItems: "center", gap: 20 }}>
                            <div style={{ color: "#94a3b8", fontSize: 14, flexShrink: 0 }}>Overall progress</div>
                            <div style={{ flex: 1 }}><ProgressBar value={((i + 1) / lp.phases.length) * 100} color={PHASE_COLORS[i]} h={6} /></div>
                            <div style={{ color: PHASE_COLORS[i], fontWeight: 700, fontSize: 14, flexShrink: 0 }}>Phase {i + 1}/{lp.phases.length}</div>
                        </div>
                    </div>
                ))}

                <div style={{ textAlign: "center", marginTop: 44 }}>
                    <Btn variant="ghost" onClick={() => onNavigate("dashboard")}>← Back to Dashboard</Btn>
                </div>
            </div>
        </div>
    );
}
