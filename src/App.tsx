import { useEffect } from "react";
import "./App.css";
import { Graph } from "./Components/Graph/Graph";

import { Router } from "./Components/Router";
import { useRouter } from "./Hooks/useRouter";
import { usePlayerPref } from "./Hooks/usePlayerPref";
import { Routes } from "./Types/Routes";

function App() {
  useEffect(() => {
    setTimeout(() => {
      if (!usePlayerPref.getState().hasSeenIntroPopup) {
        useRouter.getState().open(Routes.About);
        usePlayerPref.getState().setSeenIntro();
      }
    }, 1000);
  }, []);
  return (
    <div className="App">
      <Graph></Graph>
      <Router />
    </div>
  );
}

export default App;
