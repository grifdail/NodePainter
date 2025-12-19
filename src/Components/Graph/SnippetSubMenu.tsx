import { MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { IconClipboard, IconCode, IconCut, IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import IconCopy from "@tabler/icons-react/dist/esm/icons/IconCopy";
import { useDialog } from "../../Hooks/useDialog";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { useSelection } from "../../Hooks/useSelection";
import { toastError } from "../../Hooks/useToast";
import { useTree } from "../../Hooks/useTree";
import { START_NODE } from "../../Nodes/StartNode";
import { extractSnipet, validateSnipet, validateSnipetJson } from "../../Utils/graph/modification/snippets";
import { copyToClipboard } from "../../Utils/ui/copyToClipboard";

export function SnippetSubMenu({ worldPosition }: { worldPosition: [number, number] }) {
    const selectionNodes = useSelection((state) => state.nodes);
    const snippets = usePlayerPref((state) => state.snippets);
    const tree = useTree();
    const isValid = validateSnipet(selectionNodes, tree);
    return (
        <>
            <MenuItem
                onClick={() => copySelection()}
                disabled={selectionNodes.length < 1 || !isValid}>
                <IconCopy /> Copy selection
            </MenuItem>
            <MenuItem
                onClick={() => {
                    duplicateSelection(worldPosition);
                }}
                disabled={selectionNodes.length < 1 || selectionNodes.includes(START_NODE)}>
                <IconCopy /> Duplicate selection
            </MenuItem>
            <MenuItem onClick={() => readSnipetFromClipboard(worldPosition)}>
                <IconClipboard />
                Paste
            </MenuItem>
            <MenuItem
                onClick={cutSelection}
                disabled={selectionNodes.length < 1 || !isValid}>
                <IconCut /> Cut selection
            </MenuItem>
            <MenuItem
                onClick={() => {
                    useTree.getState().deleteNodes(selectionNodes);
                    useSelection.getState().clear();
                }}
                disabled={selectionNodes.length < 1 || selectionNodes.includes(START_NODE)}>
                <IconTrash /> Delete selection
            </MenuItem>
            <MenuDivider></MenuDivider>
            <MenuItem
                disabled={selectionNodes.length < 1 || !isValid}
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
                        onClick={() =>
                            useTree.getState().loadSnipets(snip, ...worldPosition, (newNodes) => {
                                useSelection.getState().setSelection(Object.values(newNodes));
                            })
                        }>
                        {snip.name}
                    </MenuItem>
                ))}
            </SubMenu>
        </>
    );
}

export const cutSelection = () => {
    var result = copySelection();
    if (!result) {
        return;
    }
    useTree.getState().deleteNodes(useSelection.getState().nodes);
    useSelection.getState().clear();
};

function saveSelectionAsSnippet(): void {
    useDialog.getState().openPrompt((name) => {
        usePlayerPref.getState().saveSnippet(name, extractSnipet(name, useSelection.getState().nodes, useTree.getState()));
    });
}

export const copySelection = () => {
    var selection = useSelection.getState().nodes;
    const tree = useTree.getState();
    if (!validateSnipet(selection, tree)) {
        return false;
    }
    var output = JSON.stringify(extractSnipet("test", selection, tree));
    copyToClipboard(output);
    return true;
};

export const duplicateSelection = (worldPosition: [number, number] = [0, 0]) => {
    var selection = useSelection.getState().nodes;
    const tree = useTree.getState();
    if (selection.includes(START_NODE)) {
        return;
    }
    var snippet = extractSnipet("test", selection, tree);
    tree.loadSnipets(snippet, worldPosition[0], worldPosition[1], (newNodes) => {
        useSelection.getState().setSelection(Object.values(newNodes));
    });
};
export const readSnipetFromClipboard = (worldPosition: [number, number]) => {
    navigator.clipboard.readText().then((clipText) => {
        parsePastedValue(clipText, worldPosition);
    });
};

export function parsePastedValue(text: string, worldPosition: [number, number] = [0, 0]) {
    try {
        const parsedData = JSON.parse(text);
        const item = validateSnipetJson(parsedData);
        if (item) {
            useTree.getState().loadSnipets(parsedData, worldPosition[0], worldPosition[1], (newNodes) => {
                useSelection.getState().setSelection(Object.values(newNodes));
            });
        } else {
            throw new Error(`copy data isn't valid copy data`);
        }
    } catch (err: any) {
        console.error(err);
        toastError("What you're trying to past is not valid");
    }
}
