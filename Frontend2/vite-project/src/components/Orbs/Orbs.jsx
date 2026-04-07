// Orbs.jsx
// Decorative animated background blobs.
// position:fixed so they stay in place while the page scrolls.
// pointerEvents:none so they never block clicks.
// zIndex:0 so all page content sits on top.
// Each orb uses the "orb" keyframe from index.css — a slow
// floating drift that makes the background feel alive.

export default function Orbs() {
    const orbs = [
        { top: "8%", left: "2%", size: 500, color: "34,211,238", delay: 0 },
        { top: "45%", right: "3%", size: 400, color: "167,139,250", delay: 4 },
        { bottom: "5%", left: "25%", size: 450, color: "244,114,182", delay: 8 },
    ];

    return (
        <div style={{
            position: "fixed", inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
            zIndex: 0,
        }}>
            {orbs.map((o, i) => (
                <div key={i} style={{
                    position: "absolute",
                    top: o.top, left: o.left, right: o.right, bottom: o.bottom,
                    width: o.size, height: o.size,
                    borderRadius: "50%",
                    // radial gradient fades from a faint tinted center to transparent
                    background: `radial-gradient(circle, rgba(${o.color},.07), transparent 68%)`,
                    animation: `orb ${14 + i * 4}s ease-in-out infinite`,
                    animationDelay: `${o.delay}s`,
                }} />
            ))}
        </div>
    );
}
