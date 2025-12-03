import { SketchSave } from "../Types/SketchTemplate";
import { useTree } from "./useTree";

const SAVE_ID = "nodepainter-last-active-sketch";

useTree.subscribe((state) => {
  var data = state.exportTemplate();
  localStorage.setItem(SAVE_ID, JSON.stringify(state.exportTemplate()));
});
let lastClosedSketch: SketchSave | null = null;

window.addEventListener("load", () => {
  try {
    lastClosedSketch = JSON.parse(localStorage.getItem(SAVE_ID) || "");
  } catch (error) { }
});

export function getLastSavedSketch() {
  return lastClosedSketch;
}

if (import.meta.hot) {
  import.meta.hot.on("vite:afterUpdate", (data) => {
    if (data.updates.some((item) => item.path.includes("useTree") || item.path.includes("App.tsx") || item.path.includes("Graph"))) {
      useTree.getState().loadTemplate(JSON.parse(localStorage.getItem(SAVE_ID) || ""));
    }
  });
}
