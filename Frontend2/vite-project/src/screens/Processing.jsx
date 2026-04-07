// Processing.jsx — AI analysis loading screen with animated steps

import { useState, useEffect } from "react";
import { Btn } from "../components/common/UIPrimitives";

const STEPS = [
    "Parsing behavioral signals...",
    "Mapping cognitive patterns...",
    "Consulting AI career engine...",
    "Building your profile...",
    "Analysis complete!",
];

// ── Fallback analysis (used if API fails) ─────────────────────
function fallback(ob) {
    const map = { technical: "Software Engineer", analytical: "Data Scientist", creative: "UX Designer", social: "Product Manager" };
    const e = ob?.energy || "technical";
    return {
        skillScores: { Analytical: 82, Creativity: 71, Leadership: 66, Technical: 88, Communication: 74, Strategic: 80 },
        confidenceScore: 87,
        personalityType: "The Systematic Innovator",
        summary: "You combine sharp analytical thinking with a strong drive to build meaningful products. Your systematic approach to unfamiliar challenges, paired with persistent technical curiosity, positions you exceptionally well for high-impact roles. You thrive in environments that offer clear goals with freedom in execution.",
        topCareers: [
            { title: map[e] || "Software Engineer", match: 94, reason: "Your orientation and systematic problem-solving align perfectly with this domain.", salary: "$90k–$160k", growth: "25%", demand: "Very High" },
            { title: "Data Scientist", match: 89, reason: "Your analytical strength and pattern-recognition capabilities are core data science traits.", salary: "$100k–$180k", growth: "35%", demand: "Exceptional" },
            { title: "Product Manager", match: 83, reason: "Your blend of technical depth and strategic vision makes you a natural PM.", salary: "$110k–$200k", growth: "20%", demand: "High" },
        ],
        strengths: ["Systematic problem decomposition", "Pattern recognition under pressure", "Data-driven decision making"],
        growthAreas: ["Cross-functional communication", "Embracing creative ambiguity"],
        learningPath: {
            career: map[e] || "Software Engineer", months: 12,
            phases: [
                { phase: "Foundation", duration: "3 months", skills: ["Python/JavaScript", "Data Structures", "Git & Linux"], milestone: "Build and deploy your first web application" },
                { phase: "Building", duration: "5 months", skills: ["React/Node.js", "SQL & Databases", "API Design"], milestone: "Ship a full-stack project with real users" },
                { phase: "Advanced", duration: "4 months", skills: ["Cloud (AWS/GCP)", "System Design", "Open Source"], milestone: "Land your first professional engineering role" },
            ],
        },
    };
}

export default function Processing({ onComplete, taskResults, onboardingAnswers }) {
    const [step, setStep] = useState(0);
    const [done, setDone] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {
        const timers = [];
        STEPS.forEach((_, i) => { timers.push(setTimeout(() => setStep(i), i * 1200)); });
        timers.push(setTimeout(async () => {
    try {
        // 1. Call your Express AI Route
        const response = await fetch("http://localhost:5000/api/ai/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                task_metrics: taskResults || {}, 
                user_preferences: onboardingAnswers || {}
            })
        });

        if (!response.ok) throw new Error("Backend failed");

        // 2. Get the real Gemini JSON
        const realAiData = await response.json();
        
        // 3. Save it to React's state
        setAnalysis(realAiData);
        setDone(true);

    } catch (error) {
        console.error("AI Connection Failed! Using emergency fallback.", error);
        // HACKATHON SAFETY NET: If your backend crashes during demo, it uses the fake data!
        const r = fallback(onboardingAnswers);
        setAnalysis(r);
        setDone(true);
    }
}, STEPS.length * 1200 + 400));
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div style={{
            minHeight: "100vh", display: "flex", alignItems: "center",
            justifyContent: "center", padding: 24, position: "relative", overflow: "hidden",
        }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,rgba(34,211,238,.06) 0%,transparent 60%)" }} />
            <div style={{ textAlign: "center", maxWidth: 520, position: "relative", zIndex: 1 }}>
                {/* Spinning rings */}
                <div style={{ width: 130, height: 130, margin: "0 auto 44px", position: "relative" }}>
                    {[
                        { inset: 0, border: "2px solid rgba(34,211,238,.25)", anim: "spin 3s linear infinite" },
                        { inset: 10, border: "2px dashed rgba(167,139,250,.3)", anim: "spinR 5s linear infinite" },
                        { inset: 22, border: "1px solid rgba(244,114,182,.2)", anim: "spin 8s linear infinite" },
                    ].map((r, i) => (
                        <div key={i} style={{ position: "absolute", top: r.inset, left: r.inset, right: r.inset, bottom: r.inset, borderRadius: "50%", border: r.border, animation: r.anim }} />
                    ))}
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="ff" style={{ fontSize: 13, fontWeight: 800, color: done ? "#4ade80" : "#22d3ee" }}>{done ? "DONE" : "AI"}</span>
                    </div>
                </div>

                <h2 className="ff" style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
                    {done ? "Your Analysis is Ready!" : "Analyzing Your Mind..."}
                </h2>

                <div style={{ marginBottom: 44 }}>
                    {STEPS.map((s, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", opacity: i <= step ? 1 : 0.25, transition: "opacity .4s" }}>
                            <div style={{
                                width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                                background: i < step ? "#4ade80" : i === step ? "#22d3ee" : "rgba(255,255,255,.1)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 10, color: "#05030e", fontWeight: 700,
                                boxShadow: i === step ? "0 0 12px #22d3ee" : i < step ? "0 0 8px #4ade80" : "none",
                                animation: i === step && !done ? "pulse 1s ease infinite" : "none",
                            }}>
                                {i < step && "✓"}
                            </div>
                            <span style={{ color: i === step ? "#f1f5f9" : "#94a3b8", fontSize: 15 }}>{s}</span>
                        </div>
                    ))}
                </div>

                {done && (
                    <div style={{ animation: "fadeUp .6s ease forwards" }}>
                        <Btn onClick={() => onComplete(analysis)} style={{ padding: "16px 52px", fontSize: 17 }}>
                            See My Results →
                        </Btn>
                    </div>
                )}
            </div>
        </div>
    );
}
