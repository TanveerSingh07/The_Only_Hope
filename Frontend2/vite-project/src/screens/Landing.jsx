// Landing.jsx
// The first screen users see. Goal: make them feel understood, not sold to.
// Sections: Hero → Ticker → Why Different → How It Works → Final CTA
//
// Interactivity:
//   - Hero text animates in on mount (fadeUp, staggered)
//   - Stat counters count up when they scroll into view
//   - Feature cards tilt on mouse move (3D perspective effect)
//   - Step items highlight as you hover
//   - CTA button has a breathing glow pulse

import { useState, useEffect, useRef } from "react";
import Orbs from "../components/Orbs/Orbs";
import { Btn } from "../components/common/UIPrimitives";

// ── Animated counter hook ─────────────────────────────────────
// Counts from 0 to `end` over `duration`ms once `active` is true
function useCounter(end, duration = 1800, active = false) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!active) return;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setVal(end); clearInterval(timer); }
            else setVal(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [active, end, duration]);
    return val;
}

// ── Tilt card ─────────────────────────────────────────────────
// Wraps children and applies a 3D tilt on mouse move
function TiltCard({ children, style }) {
    const ref = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const onMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
        setTilt({ x, y });
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
            style={{
                ...style,
                transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${hovered ? "translateY(-6px)" : "translateY(0)"}`,
                transition: hovered ? "transform 0.1s ease" : "transform 0.5s ease",
                boxShadow: hovered ? "0 28px 56px rgba(0,0,0,0.5)" : "none",
            }}
        >
            {children}
        </div>
    );
}

// ── Scroll reveal hook ────────────────────────────────────────
function useInView(threshold = 0.2) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
}

// ─────────────────────────────────────────────────────────────
export default function Landing({ onStart, onLogin }) {
    const [visible, setVisible] = useState(false);
    const [statsRef, statsInView] = useInView(0.3);
    const [hoveredStep, setHoveredStep] = useState(null);
    const [typedIndex, setTypedIndex] = useState(0);

    // Stagger the hero text in after 80ms
    useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

    // Typewriter cycling through career titles
    const careers = ["Software Engineer", "Data Scientist", "UX Designer", "Product Manager", "AI Researcher"];
    const [careerIdx, setCareerIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = careers[careerIdx];
        const speed = deleting ? 40 : 80;
        const timer = setTimeout(() => {
            if (!deleting && charIdx < current.length) {
                setCharIdx(c => c + 1);
            } else if (!deleting && charIdx === current.length) {
                setTimeout(() => setDeleting(true), 1400);
            } else if (deleting && charIdx > 0) {
                setCharIdx(c => c - 1);
            } else {
                setDeleting(false);
                setCareerIdx(i => (i + 1) % careers.length);
            }
        }, speed);
        return () => clearTimeout(timer);
    }, [charIdx, deleting, careerIdx]);

    // Stat counters — only start when scrolled into view
    const users = useCounter(12000, 2000, statsInView);
    const satisfaction = useCounter(94, 1600, statsInView);
    const domains = useCounter(50, 1400, statsInView);

    const features = [
        {
            icon: "brain",
            title: "Behavioral Intelligence",
            desc: "We watch how you think — not what you claim. Real tasks surface genuine cognitive patterns that self-reporting misses.",
            color: "#22d3ee",
            stat: "3x more accurate than personality tests",
        },
        {
            icon: "target",
            title: "Precision AI Matching",
            desc: "Your behavioral fingerprint gets mapped to career domains with explainable reasoning — not a black box score.",
            color: "#a78bfa",
            stat: "50+ career domains analyzed",
        },
        {
            icon: "map",
            title: "Actionable Roadmaps",
            desc: "Not just 'you'd be good at X'. You get a step-by-step learning path with tools, timelines, and real milestones.",
            color: "#f472b6",
            stat: "Avg. 12-month path to first role",
        },
    ];

    const steps = [
        { n: "01", icon: "01", title: "Quick Onboarding", desc: "3 smart questions about your interests, goals, and work style", color: "#22d3ee" },
        { n: "02", icon: "02", title: "Task Arena", desc: "2 behavioral challenges that reveal how you actually think under pressure", color: "#a78bfa" },
        { n: "03", icon: "03", title: "AI Deep Analysis", desc: "Our engine maps your cognitive fingerprint across 50+ career domains", color: "#f472b6" },
        { n: "04", icon: "04", title: "Your Career Map", desc: "Personalized paths, skill scores, and a step-by-step learning roadmap", color: "#4ade80" },
    ];

    return (
        <div style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
            <Orbs />

            <div style={{ position: "relative", zIndex: 1 }}>

                {/* ── HERO ──────────────────────────────────────────── */}
                <section style={{
                    maxWidth: 900, margin: "0 auto",
                    padding: "130px 28px 80px",
                    textAlign: "center",
                }}>
                    {/* Badge */}
                    <div style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.6s ease 0s",
                        display: "inline-flex", alignItems: "center", gap: 8,
                        background: "rgba(34,211,238,0.08)",
                        border: "1px solid rgba(34,211,238,0.25)",
                        borderRadius: 99, padding: "7px 18px",
                        marginBottom: 32, fontSize: 13, color: "#22d3ee", fontWeight: 600,
                    }}>
                        AI-Powered Career Intelligence · Free to explore
                    </div>

                    {/* Headline */}
                    <h1 className="ff" style={{
                        fontSize: "clamp(38px, 6.5vw, 80px)",
                        fontWeight: 800, lineHeight: 1.05,
                        letterSpacing: "-2px", marginBottom: 20,
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(28px)",
                        transition: "all 0.7s ease 0.1s",
                    }}>
                        Find your path as a<br />
                        <span className="gt" style={{ display: "inline-block", minWidth: 320 }}>
                            {careers[careerIdx].slice(0, charIdx)}
                            <span style={{
                                display: "inline-block", width: 3, height: "0.85em",
                                background: "#22d3ee", marginLeft: 2, verticalAlign: "middle",
                                animation: "pulse 0.8s ease-in-out infinite",
                            }} />
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p style={{
                        fontSize: 19, color: "#94a3b8",
                        maxWidth: 560, margin: "0 auto 48px",
                        lineHeight: 1.8,
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(28px)",
                        transition: "all 0.7s ease 0.2s",
                    }}>
                        Not another quiz. PathFinder analyzes your real behavioral patterns —
                        how you solve problems and decide under pressure — to reveal careers
                        you'll <em style={{ color: "#f1f5f9", fontStyle: "normal", fontWeight: 600 }}>genuinely love</em>.
                    </p>

                    {/* CTAs */}
                    <div style={{
                        display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap",
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(28px)",
                        transition: "all 0.7s ease 0.3s",
                    }}>
                        <Btn
                            onClick={onStart}
                            style={{
                                padding: "16px 44px", fontSize: 17, borderRadius: 12,
                                animation: "glow 3s ease-in-out infinite",
                            }}
                        >
                            Start My Journey →
                        </Btn>
                        <Btn variant="ghost" onClick={onLogin} style={{ padding: "16px 32px", fontSize: 16 }}>
                            Sign In
                        </Btn>
                    </div>

                    <p style={{
                        marginTop: 18, color: "#334155", fontSize: 13,
                        opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.4s",
                    }}>
                        Free to explore · No credit card · ~8 minutes
                    </p>
                </section>

                {/* ── STATS ─────────────────────────────────────────── */}
                <section ref={statsRef} style={{ maxWidth: 780, margin: "0 auto 96px", padding: "0 28px" }}>
                    <div style={{
                        display: "grid", gridTemplateColumns: "repeat(3,1fr)",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 20, overflow: "hidden",
                    }}>
                        {[
                            { val: users, suffix: "+", label: "Users Analyzed", color: "#22d3ee" },
                            { val: satisfaction, suffix: "%", label: "Satisfaction Rate", color: "#a78bfa" },
                            { val: domains, suffix: "+", label: "Career Domains", color: "#f472b6" },
                        ].map((s, i) => (
                            <div key={i} style={{
                                padding: "32px 16px", textAlign: "center",
                                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                                transition: "background 0.3s",
                            }}
                                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                                <div className="ff" style={{
                                    fontSize: 42, fontWeight: 800, color: s.color,
                                    marginBottom: 6, fontVariantNumeric: "tabular-nums",
                                }}>
                                    {s.val.toLocaleString()}{s.suffix}
                                </div>
                                <div style={{ color: "#94a3b8", fontSize: 14 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── WHY DIFFERENT ─────────────────────────────────── */}
                <section style={{ maxWidth: 1080, margin: "0 auto", padding: "0 28px 100px" }}>
                    <div style={{ textAlign: "center", marginBottom: 60 }}>
                        <h2 className="ff" style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, marginBottom: 14 }}>
                            Why PathFinder is <span className="gt">Different</span>
                        </h2>
                        <p style={{ color: "#94a3b8", fontSize: 18, maxWidth: 480, margin: "0 auto" }}>
                            Traditional tests ask what you like. We watch how you perform.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
                        {features.map((f, i) => (
                            <TiltCard key={i} style={{
                                background: "rgba(255,255,255,0.04)",
                                border: `1px solid rgba(255,255,255,0.08)`,
                                borderRadius: 20, padding: "38px 32px",
                                cursor: "default",
                            }}>
                                {/* Top accent line */}
                                <div style={{
                                    height: 3, borderRadius: 99,
                                    background: `linear-gradient(90deg, ${f.color}, transparent)`,
                                    marginBottom: 28,
                                }} />
                                <div style={{ fontSize: 44, marginBottom: 18, fontFamily: "var(--font-display)", color: f.color, fontWeight: 800 }}>{f.icon}</div>
                                <h3 className="ff" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "#f1f5f9" }}>
                                    {f.title}
                                </h3>
                                <p style={{ color: "#94a3b8", lineHeight: 1.78, fontSize: 15, marginBottom: 20 }}>
                                    {f.desc}
                                </p>
                                {/* Stat pill at bottom */}
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: 6,
                                    background: `${f.color}12`,
                                    border: `1px solid ${f.color}28`,
                                    borderRadius: 99, padding: "5px 14px",
                                    fontSize: 12, color: f.color, fontWeight: 600,
                                }}>
                                    ✦ {f.stat}
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </section>

                {/* ── HOW IT WORKS ──────────────────────────────────── */}
                <section style={{ maxWidth: 780, margin: "0 auto", padding: "0 28px 100px" }}>
                    <div style={{ textAlign: "center", marginBottom: 56 }}>
                        <h2 className="ff" style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, marginBottom: 14 }}>
                            Your <span className="gt">8-Minute</span> Journey
                        </h2>
                        <p style={{ color: "#94a3b8", fontSize: 17 }}>Four steps. One honest answer about your future.</p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                onMouseEnter={() => setHoveredStep(i)}
                                onMouseLeave={() => setHoveredStep(null)}
                                style={{
                                    display: "flex", gap: 22, alignItems: "center",
                                    padding: "22px 20px",
                                    borderRadius: 14,
                                    borderBottom: i < steps.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                                    background: hoveredStep === i ? "rgba(255,255,255,0.03)" : "transparent",
                                    transition: "background 0.25s",
                                    cursor: "default",
                                }}
                            >
                                {/* Icon box */}
                                <div style={{
                                    width: 58, height: 58, borderRadius: 14, flexShrink: 0,
                                    background: hoveredStep === i ? `${s.color}20` : `${s.color}10`,
                                    border: `1px solid ${hoveredStep === i ? s.color + "60" : s.color + "28"}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 26, fontFamily: "var(--font-display)",
                                    fontWeight: 800, color: s.color,
                                    transition: "all 0.25s",
                                    transform: hoveredStep === i ? "scale(1.1)" : "scale(1)",
                                }}>
                                    {s.icon}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        color: s.color, fontSize: 11, fontWeight: 700,
                                        letterSpacing: 2.5, marginBottom: 5,
                                    }}>
                                        STEP {s.n}
                                    </div>
                                    <div className="ff" style={{ fontSize: 19, fontWeight: 700, marginBottom: 4, color: "#f1f5f9" }}>
                                        {s.title}
                                    </div>
                                    <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</div>
                                </div>

                                {/* Arrow that appears on hover */}
                                <div style={{
                                    fontSize: 20, color: s.color,
                                    opacity: hoveredStep === i ? 1 : 0,
                                    transform: hoveredStep === i ? "translateX(0)" : "translateX(-8px)",
                                    transition: "all 0.25s",
                                }}>
                                    →
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── FINAL CTA ─────────────────────────────────────── */}
                <section style={{ maxWidth: 680, margin: "0 auto", padding: "0 28px 120px", textAlign: "center" }}>
                    <div style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 24, padding: "64px 48px",
                        position: "relative", overflow: "hidden",
                    }}>
                        {/* Background glow */}
                        <div style={{
                            position: "absolute", top: "50%", left: "50%",
                            transform: "translate(-50%,-50%)",
                            width: 400, height: 400, borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%)",
                            pointerEvents: "none",
                        }} />

                        <div style={{ position: "relative", zIndex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#22d3ee", letterSpacing: 2, marginBottom: 20 }}>PATHFINDER</div>
                            <h2 className="ff" style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 700, marginBottom: 16 }}>
                                Ready to find your <span className="gt">real path?</span>
                            </h2>
                            <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.75, marginBottom: 36, maxWidth: 440, margin: "0 auto 36px" }}>
                                Stop guessing. Stop settling. Eight minutes from now you'll know more about your career fit than most people learn in years.
                            </p>
                            <Btn
                                onClick={onStart}
                                style={{
                                    padding: "17px 52px", fontSize: 17, borderRadius: 12,
                                    animation: "glow 3s ease-in-out infinite",
                                }}
                            >
                                Begin My Analysis →
                            </Btn>
                            <p style={{ marginTop: 16, color: "#334155", fontSize: 13 }}>
                                Completely free · No account required to start
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
