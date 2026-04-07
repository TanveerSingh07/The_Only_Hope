import React, { useState } from "react";
import Landing from "./screens/Landing";
import Onboarding from "./screens/Onboarding";
import TaskArena from "./screens/TaskArena";
import Processing from "./screens/Processing";
import Dashboard from "./screens/Dashboard.jsx?t=1";
import { computeScores } from "./utils";
import { GLOBAL_STYLES } from "./theme";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [taskData, setTaskData] = useState({});
  const [scores, setScores]    = useState({});

  const onTasksDone = (data) => {
    setTaskData(data);
    setScreen("processing");
  };

  const onProcessingDone = () => {
    setScores(computeScores(taskData));
    setScreen("dashboard");
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div className="pf">
        {screen === "landing"    && <Landing    onBegin={() => setScreen("onboarding")} />}
        {screen === "onboarding" && <Onboarding onDone={() => setScreen("tasks")} />}
        {screen === "tasks"      && <TaskArena  onDone={onTasksDone} />}
        {screen === "processing" && <Processing onDone={onProcessingDone} />}
        {screen === "dashboard"  && <Dashboard  scores={scores} />}
      </div>
    </>
  );
}