// CareerPaths.jsx — Detailed view of matched career paths

import { useState } from "react";
import { Btn, ProgressBar, Tag } from "../components/common/UIPrimitives";

const CHART_COLORS = ["#22d3ee", "#a78bfa", "#f472b6", "#4ade80", "#fbbf24", "#fb7185"];

export default function CareerPaths({ analysis, onNavigate }) {
    const [sel, setSel] = useState(0);

    if (!analysis?.topCareers) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 28, paddingTop: 88 }}>
            <div style={{ textAlign: "center" }}>
                <h2 className="ff" style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Complete Your Analysis First</h2>
                <Btn onClick={() => onNavigate("onboarding")}>Start Assessment →</Btn>
            </div>
        </div>
    );

    const c = analysis.topCareers[sel];

    return (
        <div style={{ minHeight: "100vh", padding: "88px 28px 60px" }}>
            <div style={{ maxWidth: 1060, margin: "0 auto" }}>

                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <h1 className="ff" style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: 800, marginBottom: 14 }}>
                        Career Paths <span className="gt">For You</span>
                    </h1>
                    <p style={{ color: "#94a3b8", fontSize: 18 }}>Matched through your behavioral fingerprint</p>
                </div>

                {/* Career selector tabs */}
                <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap", justifyContent: "center" }}>
                    {analysis.topCareers.map((ca, i) => (
                        <button key={i} onClick={() => setSel(i)} style={{
                            background: sel === i ? `${CHART_COLORS[i]}1a` : "rgba(255,255,255,.04)",
                            border: `1.5px solid ${sel === i ? CHART_COLORS[i] : "rgba(255,255,255,.08)"}`,
                            color: sel === i ? CHART_COLORS[i] : "#94a3b8",
                            padding: "12px 24px", borderRadius: 10, fontSize: 15, fontWeight: 600,
                            transition: "all .22s", cursor: "pointer",
                        }}>
                            {ca.title}
                        </button>
                    ))}
                </div>

                {/* Stats row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18, marginBottom: 28, animation: "fadeUp .4s ease forwards" }} key={sel}>
                    {[
                        [c.salary, "Salary Range", "#4ade80"],
                        [c.growth + " growth", "Job Growth (10yr)", "#22d3ee"],
                        [c.demand, "Demand Level", "#fbbf24"],
                        [c.match + "%", "Match Score", "#a78bfa"],
                    ].map(([v, l, cl]) => (
                        <div key={l} className="glass" style={{ padding: 24, textAlign: "center" }}>
                            <div className="ff" style={{ fontSize: 26, fontWeight: 800, color: cl, marginBottom: 4 }}>{v}</div>
                            <div style={{ color: "#475569", fontSize: 14 }}>{l}</div>
                        </div>
                    ))}
                </div>

                {/* Detail cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginBottom: 32, animation: "fadeUp .4s ease .1s both" }}>
                    <div className="glass" style={{ padding: 30 }}>
                        <h3 className="ff" style={{ fontSize: 19, fontWeight: 700, marginBottom: 14 }}>Why This Fits You</h3>
                        <p style={{ color: "#e2e8f0", lineHeight: 1.82, fontSize: 15 }}>{c.reason}</p>
                    </div>
                    <div className="glass" style={{ padding: 30 }}>
                        <h3 className="ff" style={{ fontSize: 19, fontWeight: 700, marginBottom: 18 }}>Match Score</h3>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 14 }}>
                            <div className="ff" style={{ fontSize: 60, fontWeight: 800, color: CHART_COLORS[sel], lineHeight: 1 }}>{c.match}%</div>
                            <div style={{ color: "#94a3b8", fontSize: 14, paddingBottom: 8, maxWidth: 160 }}>behavioral compatibility with this career domain</div>
                        </div>
                        <ProgressBar value={c.match} color={CHART_COLORS[sel]} h={10} />
                    </div>
                </div>

                <div style={{ textAlign: "center" }}>
                    <Btn onClick={() => onNavigate("learning")} style={{ padding: "16px 52px", fontSize: 17 }}>
                        Generate My Learning Roadmap →
                    </Btn>
                </div>
            </div>
        </div>
    );
}
