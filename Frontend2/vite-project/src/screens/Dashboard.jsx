// Dashboard.jsx — Career Intelligence Report with charts and skill scores

import { useState } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { Btn, ProgressBar, Tag } from "../components/common/UIPrimitives";

const CHART_COLORS = ["#22d3ee", "#a78bfa", "#f472b6", "#4ade80", "#fbbf24", "#fb7185"];

export default function Dashboard({ analysis, user, onNavigate }) {
    const [tab, setTab] = useState("overview");

    if (!analysis) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 28, paddingTop: 88 }}>
            <div style={{ textAlign: "center" }}>
                <div className="ff" style={{ fontSize: 48, fontWeight: 800, color: "#22d3ee", marginBottom: 24 }}>?</div>
                <h2 className="ff" style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>No Analysis Yet</h2>
                <p style={{ color: "#94a3b8", marginBottom: 32, fontSize: 16 }}>Complete the PathFinder assessment to unlock your dashboard.</p>
                <Btn onClick={() => onNavigate("onboarding")}>Start Assessment →</Btn>
            </div>
        </div>
    );

    const skillData = Object.entries(analysis.skillScores).map(([k, v]) => ({ name: k, value: v }));
    const radarData = Object.entries(analysis.skillScores).map(([k, v]) => ({ skill: k, score: v }));

    return (
        <div style={{ minHeight: "100vh", padding: "88px 28px 60px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                {/* Header */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 36, animation: "fadeUp .6s ease forwards" }}>
                    <div>
                        <div style={{ color: "#94a3b8", marginBottom: 10, fontSize: 15 }}>
                            Welcome, <strong style={{ color: "#22d3ee" }}>{user?.name || "Explorer"}</strong>
                        </div>
                        <h1 className="ff" style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, marginBottom: 14 }}>
                            Career <span className="gt">Intelligence Report</span>
                        </h1>
                        <Tag color="#a78bfa">{analysis.personalityType}</Tag>
                    </div>
                    <div style={{ display: "flex", gap: 14 }}>
                        {[[analysis.confidenceScore + "%", "Confidence Score", "#22d3ee"], [analysis.topCareers?.[0]?.match + "%", "Top Match", "#4ade80"]].map(([v, l, c]) => (
                            <div key={l} className="glass" style={{ padding: "18px 26px", textAlign: "center" }}>
                                <div className="ff" style={{ fontSize: 40, fontWeight: 800, color: c }}>{v}</div>
                                <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="glass" style={{ padding: "24px 30px", marginBottom: 28, borderLeft: "3px solid #22d3ee", animation: "fadeUp .6s ease .08s both" }}>
                    <p style={{ color: "#e2e8f0", fontSize: 16, lineHeight: 1.85 }}>{analysis.summary}</p>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
                    {["overview", "skills", "careers"].map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{
                            background: tab === t ? "rgba(34,211,238,.14)" : "rgba(255,255,255,.04)",
                            border: `1px solid ${tab === t ? "rgba(34,211,238,.4)" : "rgba(255,255,255,.08)"}`,
                            color: tab === t ? "#22d3ee" : "#94a3b8",
                            padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600,
                            textTransform: "capitalize", transition: "all .2s", cursor: "pointer",
                        }}>
                            {t}
                        </button>
                    ))}
                </div>

                {/* Overview tab */}
                {tab === "overview" && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 22 }}>
                        <div className="glass" style={{ padding: 28 }}>
                            <h3 className="ff" style={{ fontWeight: 700, marginBottom: 18, fontSize: 17 }}>Skill Radar</h3>
                            <ResponsiveContainer width="100%" height={240}>
                                <RadarChart data={radarData}>
                                    <PolarGrid stroke="rgba(255,255,255,.07)" />
                                    <PolarAngleAxis dataKey="skill" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                                    <Radar dataKey="score" stroke="#22d3ee" fill="#22d3ee" fillOpacity={.18} strokeWidth={2} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="glass" style={{ padding: 28 }}>
                            <h3 className="ff" style={{ fontWeight: 700, marginBottom: 20, fontSize: 17 }}>Skill Scores</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {skillData.map((s, i) => (
                                    <div key={s.name}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                                            <span style={{ fontSize: 14, color: "#e2e8f0" }}>{s.name}</span>
                                            <span style={{ fontSize: 14, fontWeight: 700, color: CHART_COLORS[i % CHART_COLORS.length] }}>{s.value}</span>
                                        </div>
                                        <ProgressBar value={s.value} color={CHART_COLORS[i % CHART_COLORS.length]} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass" style={{ padding: 28 }}>
                            <h3 className="ff" style={{ fontWeight: 700, marginBottom: 20, fontSize: 17 }}>Strengths & Growth</h3>
                            <div style={{ marginBottom: 22 }}>
                                <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>YOUR STRENGTHS</div>
                                {analysis.strengths?.map((s, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
                                        <span style={{ fontSize: 14, color: "#e2e8f0" }}>{s}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>GROWTH AREAS</div>
                                {analysis.growthAreas?.map((g, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fbbf24", flexShrink: 0 }} />
                                        <span style={{ fontSize: 14, color: "#e2e8f0" }}>{g}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Skills tab */}
                {tab === "skills" && (
                    <div style={{ animation: "fadeUp .4s ease forwards" }}>
                        <div className="glass" style={{ padding: 32 }}>
                            <h3 className="ff" style={{ fontWeight: 700, marginBottom: 26, fontSize: 20 }}>Detailed Skill Breakdown</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={skillData} margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" />
                                    <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                                    <Tooltip contentStyle={{ background: "#0d0b1e", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "#f1f5f9" }} />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                        {skillData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
                                {skillData.map((s, i) => (
                                    <div key={i} style={{ padding: "14px 18px", background: "rgba(255,255,255,.03)", border: `1px solid ${CHART_COLORS[i % CHART_COLORS.length]}25`, borderRadius: 10 }}>
                                        <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 4 }}>{s.name}</div>
                                        <div className="ff" style={{ fontSize: 28, fontWeight: 800, color: CHART_COLORS[i % CHART_COLORS.length] }}>
                                            {s.value}<span style={{ fontSize: 14, opacity: .6 }}>/100</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Careers tab */}
                {tab === "careers" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeUp .4s ease forwards" }}>
                        {analysis.topCareers?.map((c, i) => (
                            <div key={i} className="glass hs" style={{ padding: "26px 30px", display: "flex", flexWrap: "wrap", gap: 22, alignItems: "center", borderLeft: `3px solid ${CHART_COLORS[i]}` }}>
                                <div style={{ flex: 1, minWidth: 200 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                                        <h3 className="ff" style={{ fontSize: 22, fontWeight: 700 }}>{c.title}</h3>
                                        <Tag color={CHART_COLORS[i]}>{c.match}% Match</Tag>
                                    </div>
                                    <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 14, lineHeight: 1.65 }}>{c.reason}</p>
                                    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                                        <span style={{ fontSize: 13, color: "#4ade80" }}>Salary: {c.salary}</span>
                                        <span style={{ fontSize: 13, color: "#22d3ee" }}>Growth: {c.growth}</span>
                                        <span style={{ fontSize: 13, color: "#fbbf24" }}>Demand: {c.demand}</span>
                                    </div>
                                </div>
                                <Btn variant="outline" onClick={() => onNavigate("learning")}>View Roadmap →</Btn>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
