import { useHotkeys } from "react-hotkeys-hook";
import { openNodeCreationModal } from "../Actions/navigationAction";
import { GetNodeHeight } from "../Components/Graph/GetNodeHeight";
import { NodeDefinition } from "../Types/NodeDefinition";
import { extractSnipet } from "../Utils/graph/modification/snippets";
import { saveSketchWithNamePrompt, useAllSavedSketch } from "./db";
import { useSelection } from "./useSelection";
import { toastSuccess } from "./useToast";
import { useTree } from "./useTree";

export const useGraphHotkey = () => {
  const [_, saveSketch] = useAllSavedSketch();
  useHotkeys("ctrl+alt+d", () => {
    var tree = useTree.getState();
    const nodeLibrary = Object.values(tree.getNodeLibrary()).filter((item) => {
      if (item.hideInLibrary) {
        return false;
      }
      return true;
    });
    const categories = nodeLibrary.reduce((old, value) => {
      var cat = /(?:([\w\/]+)\/)?\w+$/gi.exec(value.id)?.[1];
      if (!cat) {
        cat = "noCat";
      }
      if (old[cat] === undefined) {
        old[cat] = [value];
      } else {
        old[cat].push(value);
      }
      return old;
    }, {} as { [key: string]: NodeDefinition[] });

    let y = 400;
    for (let cat in categories) {
      let x = 0;
      let height = 400;
      for (var node of categories[cat]) {
        var nodeData = tree.addNode(node.id, x, y);
        height = Math.max(GetNodeHeight(nodeData, node) + 100, height);
        x += 400;
        if (x > 10000) {
          x = 0;
          y += height;
          height = 400;
        }
      }
      if (x > 0) {
        y += height + 200;
      }
    }
  });
  useHotkeys("shift+n", (e) => {
    e.preventDefault();
    openNodeCreationModal();
  });
  useHotkeys("delete", (e) => {
    e.preventDefault();
    useTree.getState().deleteNodes(useSelection.getState().nodes);
    useSelection.getState().clear();
  });
  useHotkeys("mod+d", (e) => {
    e.preventDefault();
    const snippet = extractSnipet("copy", useSelection.getState().nodes, useTree.getState());
    useTree.getState().loadSnipets(snippet, snippet.offset[0] + 100, snippet.offset[1] + 100, (newNodes) => {
      useSelection.getState().setSelection(Object.values(newNodes));
      toastSuccess("Selection successfully duplicated");
    });
  });
  useHotkeys("mod+a", (e) => {
    e.preventDefault();
    var state = useTree.getState();

    var toSelect = Object.values(state.nodes)
      .filter((node) => node.graph === state.editedGraph)
      .map((node) => node.id);

    useSelection.getState().setSelection(toSelect);
  });
  useHotkeys("mod+s", (e) => {
    e.preventDefault();
    saveSketchWithNamePrompt(saveSketch);
  });
};
