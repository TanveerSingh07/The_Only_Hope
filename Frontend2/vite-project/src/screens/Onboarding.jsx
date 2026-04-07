// Onboarding.jsx
// 3-question screen to understand the user before the Task Arena.
// Each question has 4 option cards. User picks one and hits Next.
//
// Props:
//   onComplete(answers) — called with { energy, approach, goal } when done
//
// Interactivity:
//   - Progress bar fills as user advances
//   - Selected card glows and lifts
//   - Unselected cards dim slightly on selection
//   - Back button lets user change their mind
//   - Cards animate in fresh on each question change

import { useState } from "react";
import Orbs from "../components/Orbs/Orbs";
import { Btn } from "../components/common/UIPrimitives";

const QUESTIONS = [
    {
        id: "energy",
        label: "01",
        q: "What kind of work energizes you most?",
        sub: "Think about moments when you feel truly alive and focused",
        opts: [
            { id: "technical", label: "Technical Problem Solving", desc: "Coding, engineering, math" },
            { id: "creative", label: "Creative Expression", desc: "Design, art, storytelling" },
            { id: "social", label: "Human Connection", desc: "Leadership, mentoring, sales" },
            { id: "analytical", label: "Research & Analysis", desc: "Data, science, strategy" },
        ],
    },
    {
        id: "approach",
        label: "02",
        q: "How do you tackle an unfamiliar challenge?",
        sub: "Your first instinct reveals how your brain is wired",
        opts: [
            { id: "systematic", label: "Break it into steps", desc: "Plan methodically first" },
            { id: "experimental", label: "Jump in and learn", desc: "Try, fail, iterate fast" },
            { id: "collaborative", label: "Gather perspectives", desc: "Ask others, then decide" },
            { id: "intuitive", label: "Trust your gut", desc: "Pattern-match to experience" },
        ],
    },
    {
        id: "goal",
        label: "03",
        q: "What's your biggest career dream?",
        sub: "Your north star determines your best trajectory",
        opts: [
            { id: "product", label: "Build products at scale", desc: "Technology used by millions" },
            { id: "science", label: "Solve deep problems", desc: "Research & breakthroughs" },
            { id: "leadership", label: "Lead & grow people", desc: "Build and inspire teams" },
            { id: "impact", label: "Create real-world impact", desc: "Make the world better" },
        ],
    },
];

export default function Onboarding({ onComplete }) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selected, setSelected] = useState(null); // currently highlighted option
    const [animKey, setAnimKey] = useState(0);       // changing this re-triggers the card animation

    const q = QUESTIONS[step];
    const progress = ((step + 1) / QUESTIONS.length) * 100;

    const handleNext = () => {
        if (!selected) return;
        const updated = { ...answers, [q.id]: selected };
        setAnswers(updated);
        setSelected(null);

        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
            setAnimKey(k => k + 1); // re-trigger animation on new question
        } else {
            onComplete(updated); // all 3 answered → move to arena
        }
    };

    const handleBack = () => {
        if (step === 0) return;
        setStep(step - 1);
        // Restore previous answer as selected so user sees what they picked
        const prevQ = QUESTIONS[step - 1];
        setSelected(answers[prevQ.id] || null);
        setAnimKey(k => k + 1);
    };

    return (
        <div style={{
            minHeight: "100vh", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "24px", position: "relative",
        }}>
            <Orbs />

            {/* ── PROGRESS BAR (fixed at top) ── */}
            <div style={{
                position: "fixed", top: 0, left: 0, right: 0,
                height: 3, background: "rgba(255,255,255,0.06)", zIndex: 100,
            }}>
                <div style={{
                    height: "100%",
                    background: "linear-gradient(90deg,#22d3ee,#a78bfa)",
                    width: `${progress}%`,
                    transition: "width 0.45s ease",
                    boxShadow: "0 0 10px #22d3ee",
                }} />
            </div>

            {/* ── QUESTION CARD ── */}
            {/* animKey forces React to remount this div, replaying the animation */}
            <div
                key={animKey}
                style={{
                    width: "100%", maxWidth: 660,
                    position: "relative", zIndex: 1,
                    animation: "fadeUp 0.45s ease forwards",
                }}
            >
                {/* Step indicator + question */}
                <div style={{ textAlign: "center", marginBottom: 44 }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 14, margin: "0 auto 20px",
                        background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "#22d3ee",
                    }}>
                        {q.label}
                    </div>
                    <div style={{
                        color: "#475569", fontSize: 11, letterSpacing: 2.5,
                        fontWeight: 700, marginBottom: 12,
                    }}>
                        QUESTION {step + 1} OF {QUESTIONS.length}
                    </div>
                    <h2 className="ff" style={{
                        fontSize: "clamp(22px,4vw,34px)", fontWeight: 700,
                        marginBottom: 10, lineHeight: 1.25, color: "#f1f5f9",
                    }}>
                        {q.q}
                    </h2>
                    <p style={{ color: "#94a3b8", fontSize: 15 }}>{q.sub}</p>
                </div>

                {/* ── OPTION CARDS ── */}
                <div style={{
                    display: "grid", gridTemplateColumns: "repeat(2,1fr)",
                    gap: 14, marginBottom: 40,
                }}>
                    {q.opts.map((opt, i) => {
                        const isSelected = selected === opt.id;
                        const isDimmed = selected && !isSelected;
                        return (
                            <button
                                key={opt.id}
                                onClick={() => setSelected(opt.id)}
                                style={{
                                    background: isSelected ? "rgba(34,211,238,0.1)" : "rgba(255,255,255,0.04)",
                                    border: `1.5px solid ${isSelected ? "#22d3ee" : "rgba(255,255,255,0.08)"}`,
                                    borderRadius: 14, padding: "22px 20px",
                                    textAlign: "left", cursor: "pointer",
                                    transition: "all 0.22s",
                                    opacity: isDimmed ? 0.45 : 1,
                                    transform: isSelected ? "translateY(-4px)" : "translateY(0)",
                                    boxShadow: isSelected ? "0 0 24px rgba(34,211,238,0.18)" : "none",
                                    animation: `fadeUp 0.4s ease ${i * 0.07}s both`,
                                }}
                            >
                                <div className="ff" style={{
                                    color: isSelected ? "#22d3ee" : "#f1f5f9",
                                    fontWeight: 700, fontSize: 16, marginBottom: 4,
                                    transition: "color 0.2s",
                                }}>
                                    {opt.label}
                                </div>
                                <div style={{ color: "#64748b", fontSize: 13 }}>{opt.desc}</div>
                            </button>
                        );
                    })}
                </div>

                {/* ── NAVIGATION ── */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button
                        onClick={handleBack}
                        style={{
                            background: "none", border: "none", cursor: step > 0 ? "pointer" : "default",
                            color: step > 0 ? "#94a3b8" : "#1e293b", fontSize: 15,
                            transition: "color 0.2s",
                        }}
                    >
                        ← Back
                    </button>

                    <Btn onClick={handleNext} disabled={!selected}>
                        {step === QUESTIONS.length - 1 ? "Enter the Arena →" : "Next →"}
                    </Btn>
                </div>
            </div>
        </div>
    );
}
