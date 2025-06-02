import { MenuItem } from "@szhsin/react-menu";
import { useSelection } from "../../Hooks/useSelection";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import IconCopy from "@tabler/icons-react/dist/esm/icons/IconCopy";
import { extractSnipet, validateSnipetJson } from "../../Utils/snipets";
import { useTree } from "../../Hooks/useTree";
import { IconClipboard, IconCut, IconTrash } from "@tabler/icons-react";
import { copyToClipboard } from "../../Utils/copyToClipboard";
import { useDialog } from "../../Hooks/useDialog";
import { useState } from "react";

export function SnippetSubMenu({ worldPosition }: { worldPosition: [number, number] }) {
  const selectionNodes = useSelection((state) => state.nodes);

  return (
    <>
      <MenuItem
        onClick={() => copySelection()}
        disabled={selectionNodes.length < 1}>
        <IconCopy /> Copy selection
      </MenuItem>
      <MenuItem onClick={() => readSnipetFromClipboard(worldPosition)}>
        <IconClipboard />
        Paste
      </MenuItem>
      <MenuItem
        onClick={() => {
          copySelection();
          useTree.getState().deleteNodes(selectionNodes);
          useSelection.getState().clear();
        }}
        disabled={selectionNodes.length < 1}>
        <IconCut /> Cut selection
      </MenuItem>
      <MenuItem
        onClick={() => {
          useTree.getState().deleteNodes(selectionNodes);
          useSelection.getState().clear();
        }}
        disabled={selectionNodes.length < 1}>
        <IconTrash /> Delete selection
      </MenuItem>
    </>
  );
}

export const copySelection = () => {
  var output = JSON.stringify(extractSnipet("test", useSelection.getState().nodes, useTree.getState()));
  copyToClipboard(output);
};

export const readSnipetFromClipboard = (worldPosition: [number, number]) => {
  navigator.clipboard.readText().then((clipText) => {
    parsePastedValue(clipText, worldPosition);
  });
};

export function parsePastedValue(text: string, worldPosition: [number, number] = [0, 0]) {
  try {
    console.log(text);
    const parsedData = JSON.parse(text);
    const item = validateSnipetJson(parsedData);
    if (item) {
      useTree.getState().loadSnipets(parsedData, worldPosition[0], worldPosition[1], (newNodes) => {
        console.log(Object.values(newNodes));
        useSelection.getState().setSelection(Object.values(newNodes));
      });
    } else {
      throw new Error(`copy data isn't valid copy data`);
    }
  } catch (err: any) {
    console.error(err);
    useDialog.getState().openError("What you're trying to past is not valid");
  }
}
