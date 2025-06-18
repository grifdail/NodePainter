import { useRouter } from "../../../Hooks/useRouter";
import { useTree } from "../../../Hooks/useTree";
import { SketchTemplate } from "../../../Types/SketchTemplate";

export async function loadFromUrl(encodedUrl: string | null) {
  if (!encodedUrl) {
    return null;
  }
  var request = await fetch(encodedUrl);
  if (request.ok) {
    var data = (await request.json()) as SketchTemplate;
    useTree.getState().loadTemplate(data);
    window.history.replaceState(null, "", "/");
    useRouter.getState().close();
  }
}
