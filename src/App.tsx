import { useEffect } from "react";
import { Graph } from "./Components/Graph/Graph";

import { Tooltip } from "react-tooltip";
import { openAboutModal, openSketchMenu } from "./Actions/navigationAction";
import { initCodeBlockType } from "./CodeBlocks/CodeBlockTypes";
import { Router } from "./Components/Router";
import { ToastContainer } from "./Components/ToastContainer";
import { usePlayerPref } from "./Hooks/usePlayerPref";
import { PortStyle } from "./PortStyle";
import { loadExample } from "./Utils/graph/load/loadExample";
import { loadFromUrl } from "./Utils/graph/load/loadFromUrl";
import { loadJsonDecrypt } from "./Utils/graph/load/loadJsonDecrypt";
import { resetCamera } from "./Utils/ui/resetCamera";

initCodeBlockType();

function GraphCache() {
    const key = 0; //;useTree((state) => state.key);
    return <Graph key={key} />;
}

function App() {
    useAboutOnFirstLaunch();
    useParseUrl();
    useResetCamera();
    useTheme();

    return (
        <div className={`app`}>
            <PortStyle />
            <GraphCache />
            <Router />
            <Tooltip id="tooltip" />
            <ToastContainer />
        </div>
    );
}

export default App;

function useAboutOnFirstLaunch() {
    useEffect(() => {
        setTimeout(() => {
            if (usePlayerPref.getState().hasSeenIntroPopup) {
                openSketchMenu();
            } else {
                openAboutModal();
                usePlayerPref.getState().setSeenIntro();
            }
        }, 1000);
    }, []);
}

function useTheme() {
    const theme = usePlayerPref((state) => state.theme);

    useEffect(() => {
        const themeClass = `theme-${theme}`;
        document.body.classList.add(themeClass);
        return () => {
            document.body.classList.remove(themeClass);
        };
    }, [theme]);
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
            const search = new URLSearchParams(window.location.search);
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
    }, []);
}
