// AuthModal.jsx — Sign in / Sign up modal + guest option

import { useState } from "react";
import { Btn } from "../components/common/UIPrimitives";

const inp = {
    width: "100%", background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10,
    padding: "13px 16px", color: "#f1f5f9", fontSize: 15, outline: "none",
    fontFamily: "inherit", boxSizing: "border-box",
};

export default function AuthModal({ mode = "signup", onClose, onAuth }) {
    const [isLogin, setIsLogin] = useState(mode === "login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const submit = async () => {
        try {
            // Decide if we are hitting the login or register route
            const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
            
            const res = await fetch(`http://localhost:5000${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    name: name || "Explorer", 
                    email: email, 
                    password: pass 
                })
            });

            const data = await res.json();

            if (res.ok) {
                // IT WORKED! Save the token and tell React we are logged in
                localStorage.setItem("token", data.token);
                onAuth({ name: data.user.name, email: data.user.email, mode: "authenticated" });
            } else {
                // Backend sent an error (e.g., wrong password)
                alert(data.message || "Authentication failed.");
            }
        } catch (error) {
            console.error("Auth Error:", error);
            alert("Could not connect to the server. Make sure the backend is running!");
        }
    };

    return (
        <div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.72)", backdropFilter: "blur(14px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn .3s ease" }}
            onClick={onClose}
        >
            <div
                className="glass"
                style={{ width: "100%", maxWidth: 430, padding: 44, margin: 24, position: "relative", animation: "fadeUp .4s ease" }}
                onClick={e => e.stopPropagation()}
            >
                {/* Close */}
                <button onClick={onClose} style={{ position: "absolute", top: 14, right: 18, background: "none", border: "none", color: "#94a3b8", fontSize: 26, lineHeight: 1, cursor: "pointer" }}>×</button>

                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#22d3ee,#a78bfa)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="ff" style={{ fontWeight: 800, fontSize: 13, color: "#05030e" }}>PF</span>
                    </div>
                    <h2 className="ff" style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>
                        {isLogin ? "Welcome Back" : "Start Your Journey"}
                    </h2>
                    <p style={{ color: "#94a3b8", fontSize: 15 }}>
                        {isLogin ? "Continue your career exploration" : "Create your PathFinder account"}
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {!isLogin && (
                        <input style={inp} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                    )}
                    <input style={inp} placeholder="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input style={inp} placeholder="Password" type="password" value={pass} onChange={e => setPass(e.target.value)} />
                </div>

                <Btn onClick={submit} style={{ width: "100%", marginTop: 22, padding: 14, fontSize: 16, borderRadius: 11 }}>
                    {isLogin ? "Sign In" : "Create Account"}
                </Btn>

                <p style={{ textAlign: "center", marginTop: 14, color: "#94a3b8", fontSize: 14 }}>
                    {isLogin ? "No account? " : "Have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} style={{ background: "none", border: "none", color: "#22d3ee", fontSize: 14, cursor: "pointer" }}>
                        {isLogin ? "Sign Up" : "Sign In"}
                    </button>
                </p>

                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <button
                        onClick={() => onAuth({ name: "Guest Explorer", email: "", mode: "guest" })}
                        style={{ background: "none", border: "none", color: "#475569", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}
                    >
                        Continue as Guest (limited features)
                    </button>
                </div>
            </div>
        </div>
    );
}
