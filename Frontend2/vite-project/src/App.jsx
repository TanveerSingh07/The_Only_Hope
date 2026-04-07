import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Orbs from "./components/Orbs/Orbs";
import AuthModal from "./screens/AuthModal";
import Landing from "./screens/Landing";
import Onboarding from "./screens/Onboarding";
import TaskArena from "./screens/TaskArena";
import Processing from "./screens/Processing";
import Dashboard from "./screens/Dashboard";
import CareerPaths from "./screens/CareerPaths";
import LearningPath from "./screens/LearningPath";
import Goal from "./screens/Goal";

export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("signup");
  const [obAnswers, setObAnswers] = useState(null);
  const [taskResults, setTaskResults] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const nav = (p) => setPage(p);

  const handleAuth = (userData) => {
    setUser(userData);
    setShowAuth(false);
    if (page === "landing") nav("onboarding");
  };

  const handleStart = () => {
    if (!user) { setAuthMode("signup"); setShowAuth(true); }
    else if (analysis) nav("dashboard");
    else nav("onboarding");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#05030e", color: "#f1f5f9" }}>
      <Navbar
        page={page} onNav={nav} user={user}
        onAuthClick={() => { setAuthMode("login"); setShowAuth(true); }}
      />

      {showAuth && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuth(false)}
          onAuth={handleAuth}
        />
      )}

      {page === "landing" && <Landing onStart={handleStart} onLogin={() => { setAuthMode("login"); setShowAuth(true); }} />}
      {page === "onboarding" && <Onboarding onComplete={(a) => { setObAnswers(a); nav("arena"); }} />}
      {page === "arena" && <TaskArena onComplete={(r) => { setTaskResults(r); nav("processing"); }} />}
      {page === "processing" && <Processing onComplete={(r) => { setAnalysis(r); nav("dashboard"); }} taskResults={taskResults} onboardingAnswers={obAnswers} />}
      {page === "dashboard" && <Dashboard analysis={analysis} user={user} onNavigate={nav} />}
      {page === "careers" && <CareerPaths analysis={analysis} onNavigate={nav} />}
      {page === "learning" && <LearningPath analysis={analysis} onNavigate={nav} />}
      {page === "goal" && <Goal />}
    </div>
  );
}
