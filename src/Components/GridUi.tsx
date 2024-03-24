import { IconPlayerPlayFilled, IconPlayerStopFilled, IconPlus, IconSelectAll, IconSquareLetterX } from "@tabler/icons-react";
import { useToggle } from "@uidotdev/usehooks";

import { SketchPreview } from "./SketchPreview";
import { usePortSelection } from "../Hooks/usePortSelection";
import { useTree } from "../Hooks/useTree";
import { Toolbar } from "./StyledComponents/Toolbar";
import styled from "styled-components";
import { useRouter } from "../Hooks/useRouter";
import { WarningTrack } from "./StyledComponents/WarningTrack";
import { FullScreenDiv } from "./StyledComponents/FullScreenDiv";
import { useSelection } from "../Hooks/useSelection";
import { MainMenu } from "./MainMenu";
import { FunctionSubMenu } from "./FunctionSubMenu";

const BottomToolbar = styled(Toolbar)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export function GridUi() {
  const [showPreview, togglePreview] = useToggle(false);

  const portSelection = usePortSelection();
  const nodes = useTree((state) => state.nodes);
  const selectionActive = useSelection((state) => state.isInSelectionMode);

  const openModal = useRouter((state) => state.open);

  const toggleSelection = () => {
    useSelection.getState().toggleSetMode(null);
  };

  return (
    <FullScreenDiv>
      {portSelection.hasSelection && (
        <WarningTrack className={portSelection.type}>
          <div>{`${nodes[portSelection.node].type} # ${portSelection.port}`}</div>
        </WarningTrack>
      )}
      {showPreview && <SketchPreview></SketchPreview>}
      <BottomToolbar reversed>
        <button onClick={() => openModal("node-creation")}>
          <IconPlus></IconPlus>
        </button>
        <button onClick={() => togglePreview()}>{showPreview ? <IconPlayerStopFilled /> : <IconPlayerPlayFilled />}</button>
        <button onClick={() => toggleSelection()}>{selectionActive ? <IconSquareLetterX /> : <IconSelectAll />}</button>
        <FunctionSubMenu></FunctionSubMenu>
        <MainMenu></MainMenu>
      </BottomToolbar>
    </FullScreenDiv>
  );
}
