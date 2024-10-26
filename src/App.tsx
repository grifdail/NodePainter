import { useEffect } from "react";
import { Graph } from "./Components/Graph/Graph";

import { Router } from "./Components/Router";
import { useRouter } from "./Hooks/useRouter";
import { usePlayerPref } from "./Hooks/usePlayerPref";
import { Routes } from "./Types/Routes";
import { Tooltip } from "react-tooltip";

function GraphCache() {
  var key = 0; //;useTree((state) => state.key);
  return <Graph key={key} />;
}

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
    <div className="app">
      <GraphCache />
      <Router />
      <Tooltip id="tooltip"></Tooltip>
    </div>
  );
}

export default App;
