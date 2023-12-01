import { IconMenu2, IconPlayerPlayFilled, IconPlayerStopFilled, IconPlus } from "@tabler/icons-react";
import { useToggle } from "@uidotdev/usehooks";

import { SketchPreview } from "./SketchPreview";
import { usePortSelection } from "../Hooks/usePortSelection";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { Toolbar } from "./StyledComponents/Toolbar";
import styled from "styled-components";
import { useRouter } from "../Hooks/useRouter";

const BottomToolbar = styled(Toolbar)`
  position: absolute;
`;

export function GridUi() {
  const [showPreview, togglePreview] = useToggle(false);
  const openModal = useRouter((state) => state.open);

  const portSelection = usePortSelection();
  const nodes = useTree((state) => state.nodes);
  const reset = useTree((state) => state.reset);

  return (
    <div className="full-screen-layout grid-ui">
      {portSelection.hasSelection && (
        <div className={`warning-track ${portSelection.type}`}>
          <div>{`${nodes[portSelection.node].type} # ${portSelection.port}`}</div>
          <button onClick={portSelection.reset}>cancel</button>
        </div>
      )}
      {showPreview && <SketchPreview></SketchPreview>}
      <BottomToolbar reversed>
        <button onClick={() => openModal("node-creation")}>
          <IconPlus></IconPlus>
        </button>
        <button onClick={() => togglePreview()}>{showPreview ? <IconPlayerStopFilled /> : <IconPlayerPlayFilled />}</button>
        <Menu
          portal
          menuButton={
            <button>
              <IconMenu2></IconMenu2>
            </button>
          }
        >
          <MenuItem onClick={() => openModal("about")}>About</MenuItem>
          <MenuDivider></MenuDivider>
          <MenuItem onClick={reset}>New Graph</MenuItem>
          <MenuItem onClick={() => openModal("save")}>Save</MenuItem>
          <MenuItem onClick={() => openModal("load")}>Load</MenuItem>
          <MenuItem onClick={() => openModal("export-gif")}>Export gif</MenuItem>
          <MenuDivider></MenuDivider>
          <MenuItem>Reset camera</MenuItem>
        </Menu>
      </BottomToolbar>
    </div>
  );
}
