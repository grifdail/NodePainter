import { useEffect } from "react";
import { Graph } from "./Components/Graph/Graph";

import { Router } from "./Components/Router";
import { useRouter } from "./Hooks/useRouter";
import { usePlayerPref } from "./Hooks/usePlayerPref";
import { Routes } from "./Types/Routes";
import { Tooltip } from "react-tooltip";
import { loadFromUrl } from "./Utils/loadFromUrl";
import { loadJsonDecrypt } from "./Utils/loadJsonDecrypt";
import { useViewbox } from "./Hooks/useViewbox";
import { resetCamera } from "./Utils/resetCamera";
import { css } from "styled-components";
import { PortStyle } from "./PortStyle";
import { loadExample } from "./Utils/loadExample";

function GraphCache() {
  var key = 0; //;useTree((state) => state.key);
  return <Graph key={key} />;
}

function App() {
  useAboutOnFirstLaunch();
  useParseUrl();
  useResetCamera();
  return (
    <div className="app">
      <PortStyle />
      <GraphCache />
      <Router />
      <Tooltip id="tooltip"></Tooltip>
    </div>
  );
}

export default App;

function useAboutOnFirstLaunch() {
  useEffect(() => {
    setTimeout(() => {
      if (!usePlayerPref.getState().hasSeenIntroPopup) {
        useRouter.getState().open(Routes.About);
        usePlayerPref.getState().setSeenIntro();
      }
    }, 1000);
  }, []);
}

function useResetCamera() {
  useEffect(() => {
    setTimeout(() => {
      resetCamera();
    }, 500);
  }, []);
}

function useParseUrl() {
  useEffect(() => {
    setTimeout(() => {
      var search = new URLSearchParams(window.location.search);
      if (search.has("load")) {
        return loadFromUrl(search.get("load"));
      }
      if (search.has("parse")) {
        return loadJsonDecrypt(search.get("parse"));
      }
      if (search.has("loadexample")) {
        return loadExample(search.get("loadexample"));
      }
    }, 500);
  }, [window.location.search]);
}
