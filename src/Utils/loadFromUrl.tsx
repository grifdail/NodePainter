import { SketchTemplate } from "../Data/templates";
import { useTree } from "../Hooks/useTree";

export async function loadFromUrl(encodedUrl: string | null) {
  if (!encodedUrl) {
    return null;
  }
  var request = await fetch(encodedUrl);
  if (request.ok) {
    var data = (await request.json()) as SketchTemplate;
    useTree.getState().loadTemplate(data);
    window.history.replaceState(null, "", "/");
  }
}
