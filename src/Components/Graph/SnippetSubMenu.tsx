import { MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { useSelection } from "../../Hooks/useSelection";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import IconCopy from "@tabler/icons-react/dist/esm/icons/IconCopy";
import { extractSnipet, loadSnippet, validateSnipetJson } from "../../Utils/snippets";
import { useTree } from "../../Hooks/useTree";
import { IconClipboard, IconCode, IconCut, IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import { copyToClipboard } from "../../Utils/copyToClipboard";
import { useDialog } from "../../Hooks/useDialog";
import { useState } from "react";
import { usePlayerPref } from "../../Hooks/usePlayerPref";

export function SnippetSubMenu({ worldPosition }: { worldPosition: [number, number] }) {
  const selectionNodes = useSelection((state) => state.nodes);
  const snippets = usePlayerPref((state) => state.snippets);

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
      <MenuDivider></MenuDivider>
      <MenuItem
        disabled={selectionNodes.length < 1}
        onClick={() => saveSelectionAsSnippet()}>
        <IconDeviceFloppy></IconDeviceFloppy>
        Save as snippet
      </MenuItem>
      <SubMenu
        disabled={Object.values(snippets).length === 0}
        label={
          <>
            <IconCode></IconCode> Snippet
          </>
        }>
        {Object.values(snippets).map((snip) => (
          <MenuItem
            key={snip.name}
            onClick={() => useTree.getState().loadSnipets(snip, ...worldPosition, () => {})}>
            {snip.name}
          </MenuItem>
        ))}
      </SubMenu>
    </>
  );
}

function saveSelectionAsSnippet(): void {
  useDialog.getState().openPrompt((name) => {
    usePlayerPref.getState().saveSnippet(name, extractSnipet(name, useSelection.getState().nodes, useTree.getState()));
  });
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
