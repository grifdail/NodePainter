import { IconPlayerPlayFilled, IconPlayerStopFilled, IconPlus, IconSelectAll, IconSquareLetterX } from "@tabler/icons-react";
import { useToggle } from "@uidotdev/usehooks";

import { SketchPreview } from "./SketchPreview";
import { usePortSelection } from "../Hooks/usePortSelection";
import { useTree } from "../Hooks/useTree";
import { Toolbar } from "./StyledComponents/Toolbar";
import styled from "styled-components";
import { useRouter } from "../Hooks/useRouter";
import { WarningTrack, WarningTrackSelection } from "./StyledComponents/WarningTrack";
import { useSelection } from "../Hooks/useSelection";
import { MainMenu } from "./MainMenu";
import { FunctionSubMenu } from "./FunctionSubMenu";
import { Routes } from "../Types/Routes";
import { FullScreenDiv } from "./Modal";
import { useNodeSelectionModal } from "../Hooks/useNodeSelectionModal";
import { Minimap } from "./Graph/Minimap";

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

  const openModal = useRouter((state) => state.open);

  return (
    <FullScreenDiv $modal={false}>
      {portSelection.hasSelection && (
        <WarningTrack className={portSelection.type}>
          <div>{`${nodes[portSelection.node].type} # ${portSelection.port}`}</div>
        </WarningTrack>
      )}
      {selectionActive && <WarningTrackSelection></WarningTrackSelection>}
      {showPreview && <SketchPreview close={togglePreview}></SketchPreview>}
      <Minimap></Minimap>
      <BottomToolbar reversed>
        <button
          onClick={() => {
            useNodeSelectionModal.getState().clear();
            openModal(Routes.NodeCreation);
          }}
          data-tooltip-id="tooltip"
          data-tooltip-content="New node">
          <IconPlus></IconPlus>
        </button>
        <button
          onClick={() => togglePreview()}
          data-tooltip-id="tooltip"
          data-tooltip-content={showPreview ? "Preview" : "Stop Preview"}>
          {showPreview ? <IconPlayerStopFilled /> : <IconPlayerPlayFilled />}
        </button>
        <button
          onClick={() => toggleSelection()}
          data-tooltip-id="tooltip"
          data-tooltip-content={selectionActive ? "Cancel the selection" : "Start a selection"}>
          {selectionActive ? <IconSquareLetterX /> : <IconSelectAll />}
        </button>
        <FunctionSubMenu></FunctionSubMenu>
        <MainMenu showPreview={showPreview}></MainMenu>
      </BottomToolbar>
    </FullScreenDiv>
  );
}
