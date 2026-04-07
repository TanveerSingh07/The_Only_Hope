// TaskArena.jsx — Two behavioral tasks: number sequence + scenario decision

import { useState } from "react";
import Orbs from "../components/Orbs/Orbs";
import { Btn, Tag } from "../components/common/UIPrimitives";

const SEQUENCES = [
    { seq: [2, 4, 8, 14, 22], ans: 32, opts: [28, 30, 32, 34] },
    { seq: [1, 3, 7, 13, 21], ans: 31, opts: [27, 29, 31, 33] },
    { seq: [3, 6, 11, 18, 27], ans: 38, opts: [34, 36, 38, 40] },
];

const SCENARIOS = [
    {
        sit: "Your team is behind on a critical deadline. The manager wants a status update in 30 minutes.",
        opts: [
            { id: "A", text: "Quickly analyze what's remaining, calculate a realistic new ETA, present a data-backed plan", trait: "analytical" },
            { id: "B", text: "Propose a creative pivot — ship a slimmer version now, polish post-launch", trait: "creative" },
            { id: "C", text: "Rally the team, redistribute tasks, commit to an updated timeline together", trait: "leadership" },
            { id: "D", text: "Focus entirely on fixing blockers yourself right now, update the manager after", trait: "technical" },
        ],
    },
    {
        sit: "You discover a small but notable bug the night before a major product launch.",
        opts: [
            { id: "A", text: "Document it thoroughly, assess risk, make a data-driven patch vs. skip decision", trait: "analytical" },
            { id: "B", text: "Find a clever workaround that gracefully masks the issue for the launch", trait: "creative" },
            { id: "C", text: "Be transparent with the team — decide together whether to delay or proceed", trait: "leadership" },
            { id: "D", text: "Stay up all night and fix it — shipping with known bugs is unacceptable", trait: "technical" },
        ],
    },
];

const TRAIT_COLORS = { analytical: "#22d3ee", creative: "#f472b6", leadership: "#fbbf24", technical: "#4ade80" };

// ── Sequence Task ─────────────────────────────────────────────
function SequenceTask({ onComplete }) {
    const [qi, setQi] = useState(0);
    const [res, setRes] = useState([]);
    const [sel, setSel] = useState(null);
    const [fb, setFb] = useState(null);
    const [t0] = useState(Date.now());
    const [qt, setQt] = useState(Date.now());
    const q = SEQUENCES[qi];

    const pick = (opt) => {
        if (fb) return;
        setSel(opt);
        const ok = opt === q.ans;
        const secs = (Date.now() - qt) / 1000;
        setFb(ok ? "ok" : "no");
        setTimeout(() => {
            const nr = [...res, { correct: ok, time: secs }];
            setRes(nr); setFb(null); setSel(null);
            if (qi < SEQUENCES.length - 1) { setQi(qi + 1); setQt(Date.now()); }
            else onComplete({ type: "sequence", results: nr, totalTime: (Date.now() - t0) / 1000 });
        }, 750);
    };

    return (
        <div className="glass" style={{ padding: 44, animation: "fadeUp .4s ease forwards" }} key={qi}>
            <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 28, textAlign: "center" }}>
                Question {qi + 1} of {SEQUENCES.length} · Find the next number in the sequence
            </p>
            {/* Sequence display */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
                {q.seq.map((n, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                            width: 62, height: 62, borderRadius: 12,
                            background: "rgba(34,211,238,.1)", border: "1.5px solid rgba(34,211,238,.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <span className="ff" style={{ fontSize: 22, fontWeight: 700, color: "#22d3ee" }}>{n}</span>
                        </div>
                        <span style={{ color: "#475569", fontSize: 20 }}>→</span>
                    </span>
                ))}
                <div style={{
                    width: 62, height: 62, borderRadius: 12,
                    background: "rgba(167,139,250,.15)", border: "2px dashed rgba(167,139,250,.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <span className="ff" style={{ fontSize: 26, color: "#a78bfa" }}>?</span>
                </div>
            </div>
            {/* Options */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                {q.opts.map(opt => {
                    let bg = "rgba(255,255,255,.05)", bd = "rgba(255,255,255,.1)";
                    if (sel === opt) {
                        if (fb === "ok") { bg = "rgba(74,222,128,.15)"; bd = "#4ade80"; }
                        else if (fb === "no") { bg = "rgba(248,113,113,.15)"; bd = "#f87171"; }
                    }
                    return (
                        <button key={opt} onClick={() => pick(opt)} style={{
                            background: bg, border: `1.5px solid ${bd}`, borderRadius: 12,
                            padding: 20, textAlign: "center", cursor: "pointer", transition: "all .2s",
                        }}>
                            <span className="ff" style={{ fontSize: 30, fontWeight: 700, color: "#f1f5f9" }}>{opt}</span>
                        </button>
                    );
                })}
            </div>
            {fb && (
                <div style={{ textAlign: "center", marginTop: 20, fontSize: 15, fontWeight: 600, color: fb === "ok" ? "#4ade80" : "#f87171", animation: "fadeIn .3s ease" }}>
                    {fb === "ok" ? "Correct" : "Not quite — moving on"}
                </div>
            )}
        </div>
    );
}

// ── Scenario Task ─────────────────────────────────────────────
function ScenarioTask({ onComplete }) {
    const [si, setSi] = useState(0);
    const [choices, setChoices] = useState([]);
    const [t0] = useState(Date.now());
    const [st, setSt] = useState(Date.now());
    const [sel, setSel] = useState(null);
    const s = SCENARIOS[si];

    const pick = (opt) => {
        if (sel) return;
        setSel(opt.id);
        const secs = (Date.now() - st) / 1000;
        setTimeout(() => {
            const nc = [...choices, { trait: opt.trait, time: secs }];
            setChoices(nc); setSel(null);
            if (si < SCENARIOS.length - 1) { setSi(si + 1); setSt(Date.now()); }
            else onComplete({ type: "scenario", choices: nc, totalTime: (Date.now() - t0) / 1000 });
        }, 550);
    };

    return (
        <div style={{ animation: "fadeUp .4s ease forwards" }} key={si}>
            <div className="glass" style={{ padding: 32, marginBottom: 22, borderLeft: "3px solid #a78bfa" }}>
                <div style={{ color: "#a78bfa", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, marginBottom: 10 }}>
                    SCENARIO {si + 1} OF {SCENARIOS.length}
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.75, color: "#f1f5f9" }}>{s.sit}</p>
            </div>
            <p style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 16 }}>HOW WOULD YOU RESPOND?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {s.opts.map((opt, i) => {
                    const c = TRAIT_COLORS[opt.trait];
                    const isSel = sel === opt.id;
                    return (
                        <button key={opt.id} onClick={() => pick(opt)} style={{
                            background: isSel ? `${c}1a` : "rgba(255,255,255,.04)",
                            border: `1.5px solid ${isSel ? c : "rgba(255,255,255,.08)"}`,
                            borderRadius: 12, padding: "18px 22px", textAlign: "left",
                            cursor: "pointer", transition: "all .25s",
                            display: "flex", alignItems: "flex-start", gap: 14,
                        }}>
                            <div style={{
                                width: 30, height: 30, borderRadius: 7, flexShrink: 0,
                                background: `${c}1a`, border: `1px solid ${c}40`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 13, color: c, fontWeight: 700,
                            }}>
                                {String.fromCharCode(65 + i)}
                            </div>
                            <span style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.65 }}>{opt.text}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ── Arena Shell ───────────────────────────────────────────────
export default function TaskArena({ onComplete }) {
    const [step, setStep] = useState(-1);
    const [results, setResults] = useState([]);
    const tasks = [
        { name: "Pattern Decoder", type: "seq", color: "#22d3ee" },
        { name: "The Crossroads", type: "scenario", color: "#a78bfa" },
    ];

    const handleDone = (r) => {
        const all = [...results, r];
        setResults(all);
        if (step < tasks.length - 1) setStep(step + 1);
        else onComplete(all);
    };

    // Intro screen
    if (step === -1) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 28, position: "relative" }}>
            <Orbs />
            <div style={{ maxWidth: 580, textAlign: "center", position: "relative", zIndex: 1, animation: "fadeUp .6s ease forwards" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#22d3ee", letterSpacing: 2.5, marginBottom: 16 }}>TASK ARENA</div>
                <h1 className="ff" style={{ fontSize: "clamp(32px,5vw,54px)", fontWeight: 800, marginBottom: 18 }}>
                    Two <span className="gt">Behavioral Challenges</span>
                </h1>
                <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.75, marginBottom: 44 }}>
                    Don't overthink — there are no wrong answers. We're measuring <em style={{ color: "#f1f5f9", fontStyle: "normal" }}>how you think</em>, not what you know.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, marginBottom: 44 }}>
                    {tasks.map((t, i) => (
                        <div key={i} className="glass" style={{ padding: 28, border: `1px solid ${t.color}28` }}>
                            <div className="ff" style={{ fontWeight: 700, color: t.color, fontSize: 17, marginBottom: 8 }}>{t.name}</div>
                            <div style={{ color: "#94a3b8", fontSize: 13 }}>
                                {t.type === "seq" ? "Identify patterns in number sequences" : "Navigate real decision scenarios"}
                            </div>
                        </div>
                    ))}
                </div>
                <Btn onClick={() => setStep(0)} style={{ padding: "16px 52px", fontSize: 17 }}>I'm Ready — Let's Go</Btn>
            </div>
        </div>
    );

    return (
        <div style={{ minHeight: "100vh", padding: "80px 28px 48px", position: "relative" }}>
            <Orbs />
            {/* Progress bar */}
            <div style={{ position: "fixed", top: 60, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.06)", zIndex: 100 }}>
                <div style={{ height: "100%", background: `linear-gradient(90deg,#22d3ee,${tasks[step].color})`, width: `${(step / tasks.length) * 100}%`, transition: "width .5s ease" }} />
            </div>
            <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                    <Tag color={tasks[step].color}>TASK {step + 1} OF {tasks.length}</Tag>
                    <span className="ff" style={{ fontWeight: 700, fontSize: 18 }}>{tasks[step].name}</span>
                </div>
                {tasks[step].type === "seq" && <SequenceTask onComplete={handleDone} />}
                {tasks[step].type === "scenario" && <ScenarioTask onComplete={handleDone} />}
            </div>
        </div>
    );
}
