import { navigate } from "wouter/use-browser-location";
import { useTree } from "../../../Hooks/useTree";
import { SketchTemplate } from "../../../Types/SketchTemplate";
import { Routes } from "../../../Types/Routes";
import { closeAllPopup } from "../../../Actions/navigationAction";

export async function loadFromUrl(encodedUrl: string | null) {
  if (!encodedUrl) {
    return null;
  }
  var request = await fetch(encodedUrl);
  if (request.ok) {
    var data = (await request.json()) as SketchTemplate;
    useTree.getState().loadTemplate(data);
    window.history.replaceState(null, "", "/");
    closeAllPopup();
  }
}
