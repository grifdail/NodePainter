import { IconPlayerPlayFilled, IconPlayerStopFilled, IconPlus, IconSelectAll, IconSquareLetterX } from "@tabler/icons-react";
import { useToggle } from "@uidotdev/usehooks";

import styled from "styled-components";
import { openNodeCreationModal } from "../Actions/navigationAction";
import { useNodeSelectionModal } from "../Hooks/useNodeSelectionModal";
import { usePortSelection } from "../Hooks/usePortSelection";
import { useSelection } from "../Hooks/useSelection";
import { useTree } from "../Hooks/useTree";
import { FunctionSubMenu } from "./FunctionSubMenu";
import { Minimap } from "./Graph/Minimap";
import { NodeShortcutMenu } from "./Graph/NodeShortcutMenu";
import { MainMenu } from "./MainMenu";
import { FullScreenDiv } from "./Modal";
import { SketchPreview } from "./SketchPreview";
import { Toolbar } from "./StyledComponents/Toolbar";
import { WarningTrack, WarningTrackSelection } from "./StyledComponents/WarningTrack";

const BottomToolbar = styled(Toolbar)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const toggleSelection = () => {
    useSelection.getState().toggleSetMode(null);
};

export function GridUi() {
    const [showPreview, togglePreview] = useToggle(false);

    const portSelection = usePortSelection();
    const nodes = useTree((state) => state.nodes);
    const selectionActive = useSelection((state) => state.isInSelectionMode);

    return (
        <FullScreenDiv $modal={false}>
            {portSelection.hasSelection && (
                <WarningTrack className={portSelection.type}>
                    <div>{`${nodes[portSelection.node].type} # ${portSelection.port}`}</div>
                </WarningTrack>
            )}
            {selectionActive && <WarningTrackSelection></WarningTrackSelection>}
            <Minimap></Minimap>
            <NodeShortcutMenu></NodeShortcutMenu>
            {showPreview && <SketchPreview close={togglePreview}></SketchPreview>}

            <BottomToolbar reversed>
                <button
                    onClick={() => {
                        useNodeSelectionModal.getState().clear();
                        openNodeCreationModal();
                    }}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="New node"
                >
                    <IconPlus></IconPlus>
                </button>
                <button onClick={() => togglePreview()} data-tooltip-id="tooltip" data-tooltip-content={showPreview ? "Preview" : "Stop Preview"}>
                    {showPreview ? <IconPlayerStopFilled /> : <IconPlayerPlayFilled />}
                </button>
                <button onClick={() => toggleSelection()} data-tooltip-id="tooltip" data-tooltip-content={selectionActive ? "Cancel the selection" : "Start a selection"}>
                    {selectionActive ? <IconSquareLetterX /> : <IconSelectAll />}
                </button>
                <FunctionSubMenu></FunctionSubMenu>
                <MainMenu showPreview={showPreview}></MainMenu>
            </BottomToolbar>
        </FullScreenDiv>
    );
}
