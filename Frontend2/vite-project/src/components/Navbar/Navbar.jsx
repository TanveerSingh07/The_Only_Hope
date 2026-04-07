// Navbar.jsx
// Fixed top navigation bar.
// Props:
//   page        — current active page id (string)
//   onNav       — fn(pageId) to navigate between pages
//   user        — user object { name, mode } or null
//   onAuthClick — fn() to open the auth modal

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

// These are the nav links. We filter them in the JSX:
// "Home" and "Our Goal" are always visible.
// Dashboard / Career Paths / Learning Path only show when logged in.
const LINKS = [
    { id: "landing", label: "Home" },
    { id: "dashboard", label: "Dashboard" },
    { id: "careers", label: "Career Paths" },
    { id: "learning", label: "Learning Path" },
    { id: "goal", label: "Our Goal" },
];

export default function Navbar({ page, onNav, user, onAuthClick }) {
    // scrolled — true once user scrolls past 10px, triggers glass effect
    const [scrolled, setScrolled] = useState(false);
    // menuOpen — controls mobile hamburger menu visibility
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll); // cleanup
    }, []);

    // Filter: always show Home + Goal; show the rest only when user is logged in
    const visibleLinks = LINKS.filter(
        (l) =>
            l.id === "landing" ||
            l.id === "goal" ||
            (user && ["dashboard", "careers", "learning"].includes(l.id))
    );

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.inner}>

                {/* ── LOGO ── */}
                <button
                    className={styles.logo}
                    onClick={() => onNav("landing")}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                    <span style={{ fontSize: 20 }}>🧭</span>
                    PathFinder
                </button>

                {/* ── DESKTOP LINKS ── */}
                <ul className={styles.desktopLinks}>
                    {visibleLinks.map((link) => (
                        <li key={link.id}>
                            <button
                                className={`${styles.navLink} ${page === link.id ? styles.activeLink : ""}`}
                                onClick={() => onNav(link.id)}
                                style={{ background: "none", border: "none", cursor: "pointer" }}
                            >
                                {link.label}
                                {/* Small dot indicator under the active link */}
                                {page === link.id && <span className={styles.activeDot} />}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* ── RIGHT SIDE: user info or sign-in button ── */}
                <div className={styles.authButtons}>
                    {user ? (
                        // Show user avatar + name when logged in
                        <div style={{
                            display: "flex", alignItems: "center", gap: 8,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 8, padding: "6px 14px"
                        }}>
                            {/* Avatar: first letter of user's name */}
                            <div style={{
                                width: 26, height: 26, borderRadius: "50%",
                                background: "linear-gradient(135deg,#22d3ee,#a78bfa)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 12, fontWeight: 700, color: "#05030e"
                            }}>
                                {user.name?.[0]?.toUpperCase()}
                            </div>
                            <span style={{ fontSize: 14, color: "#e2e8f0" }}>{user.name}</span>
                            {/* Show GUEST badge if user skipped sign-up */}
                            {user.mode === "guest" && (
                                <span style={{
                                    background: "#fbbf2418", border: "1px solid #fbbf2435",
                                    borderRadius: 99, padding: "3px 10px", fontSize: 12,
                                    color: "#fbbf24", fontWeight: 600
                                }}>GUEST</span>
                            )}
                        </div>
                    ) : (
                        <button className={styles.btnPrimary} onClick={onAuthClick}>
                            Sign In <span className={styles.btnArrow}>→</span>
                        </button>
                    )}
                </div>

                {/* ── HAMBURGER (mobile only, shown via CSS media query) ── */}
                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.bar} ${menuOpen ? styles.barTop : ""}`} />
                    <span className={`${styles.bar} ${menuOpen ? styles.barMid : ""}`} />
                    <span className={`${styles.bar} ${menuOpen ? styles.barBot : ""}`} />
                </button>
            </div>

            {/* ── MOBILE MENU (slides open when hamburger is clicked) ── */}
            {menuOpen && (
                <div className={styles.mobileMenu}>
                    <ul className={styles.mobileLinks}>
                        {visibleLinks.map((link) => (
                            <li key={link.id}>
                                <button
                                    className={`${styles.mobileLink} ${page === link.id ? styles.mobileLinkActive : ""}`}
                                    onClick={() => { onNav(link.id); setMenuOpen(false); }}
                                    style={{ background: "none", border: "none", width: "100%", textAlign: "left", cursor: "pointer" }}
                                >
                                    {link.label}
                                </button>
                            </li>
                        ))}
                        {!user && (
                            <li>
                                <button
                                    className={styles.mobileCta}
                                    onClick={() => { onAuthClick(); setMenuOpen(false); }}
                                    style={{ border: "none", width: "100%", cursor: "pointer" }}
                                >
                                    Sign In →
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}
