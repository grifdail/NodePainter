import createClient from "json-url";
import { useTree } from "../../../Hooks/useTree";
import { SketchTemplate } from "../../../Types/SketchTemplate";
import { useRouter } from "../../../Hooks/useRouter";
import { Templates } from "../../../Data/templates";
import { useDialog } from "../../../Hooks/useDialog";

export async function loadExample(exampleName: any) {
  var id = exampleName.split("/");
  if (id.length < 2) {
    useDialog.getState().openError(`${exampleName} is not a valid example to load`, () => {
      window.history.replaceState(null, "", "/");
    });
  }
  const item = Templates[id[0]] && Templates[id[0]][id[1]];
  if (item) {
    item().then((code) => useTree.getState().loadTemplate(code));
    window.history.replaceState(null, "", "/");
    useRouter.getState().close();
  } else {
    useDialog.getState().openError(`${exampleName} is not a valid example to load`, () => {
      window.history.replaceState(null, "", "/");
    });
  }
}
