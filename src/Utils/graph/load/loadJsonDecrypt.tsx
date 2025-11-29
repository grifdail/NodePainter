import createClient from "json-url";
import { useTree } from "../../../Hooks/useTree";
import { SketchTemplate } from "../../../Types/SketchTemplate";
import { navigate } from "wouter/use-browser-location";
import { closeAllPopup } from "../../../Actions/navigationAction";

export async function loadJsonDecrypt(parse: any) {
  var codec = createClient("lzma");
  var result = await codec.decompress(parse);
  if (result) {
    useTree.getState().loadTemplate(result as SketchTemplate);
    window.history.replaceState(null, "", "/");
    closeAllPopup();
  }
}

export async function compressSketchJson(sketch: SketchTemplate): Promise<string> {
  var codec = createClient("lzma");
  return await codec.compress(sketch);
}
