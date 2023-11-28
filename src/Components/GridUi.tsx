import { IconMenu, IconMenu2, IconPlayerPlayFilled, IconPlayerStopFilled, IconPlus } from "@tabler/icons-react";
import { useToggle } from "@uidotdev/usehooks";

import { SketchPreview } from "./SketchPreview";
import { usePortSelection } from "../Hooks/usePortSelection";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { Toolbar } from "./StyledComponents/Toolbar";
import styled from "styled-components";

const BottomToolbar = styled(Toolbar)`
  position: absolute;
`;

export function GridUi({ openAddModal }: { openAddModal: () => void }) {
  const [showPreview, togglePreview] = useToggle(false);

  const portSelection = usePortSelection();
  const nodes = useTree((state) => state.nodes);

  return (
    <div className="full-screen-layout grid-ui">
      {portSelection.hasSelection && (
        <div className={`warning-track ${portSelection.type}`}>
          <div>{`${nodes[portSelection.node].type} # ${portSelection.port}`}</div>
          <button onClick={portSelection.reset}>cancel</button>
        </div>
      )}
      <BottomToolbar reversed>
        <button onClick={openAddModal}>
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
          <MenuItem>About</MenuItem>
          <MenuDivider></MenuDivider>
          <MenuItem>New Graph</MenuItem>
          <MenuItem>Save</MenuItem>
          <MenuItem>Load</MenuItem>
          <MenuDivider></MenuDivider>
          <MenuItem>Reset camera</MenuItem>
        </Menu>
      </BottomToolbar>

      {showPreview && <SketchPreview></SketchPreview>}
    </div>
  );
}
