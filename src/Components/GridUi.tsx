import { IconFunctionFilled, IconMenu2, IconPlayerPlayFilled, IconPlayerStopFilled, IconPlus } from "@tabler/icons-react";
import { useToggle } from "@uidotdev/usehooks";

import { SketchPreview } from "./SketchPreview";
import { usePortSelection } from "../Hooks/usePortSelection";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { Toolbar } from "./StyledComponents/Toolbar";
import styled from "styled-components";
import { useRouter } from "../Hooks/useRouter";
import { CUSTOM_FUNCTION } from "../Nodes/System";
import { useCustomNodeCreationContext } from "../Hooks/useCustomNodeCreationContext";

const BottomToolbar = styled(Toolbar)`
  position: absolute;
`;

export function GridUi() {
  const [showPreview, togglePreview] = useToggle(false);
  const openModal = useRouter((state) => state.open);

  const portSelection = usePortSelection();
  const nodes = useTree((state) => state.nodes);
  const reset = useTree((state) => state.reset);
  const graph = useTree((state) => state.editedGraph) || "main";
  const setEditedGraph = useTree((state) => state.setEditedGraph);
  const rawCustomNodes = useTree((state) => state.customNodes);
  const customFunctionNodes = [
    "main",
    ...Object.values(rawCustomNodes)
      .filter((item) => item.executeAs === CUSTOM_FUNCTION)
      .map((node) => node.id),
  ];
  const setGraph = (graph: string) => {
    setEditedGraph(graph === "main" ? undefined : graph);
  };

  const openEditModal = () => {
    useCustomNodeCreationContext.getState().openEdit(useTree.getState().getNodeTypeDefinition(graph));
  };
  const openCreateModal = () => {
    useCustomNodeCreationContext.getState().openCreate();
  };

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
        <Menu
          portal
          menuButton={
            <button>
              <IconFunctionFilled></IconFunctionFilled>
              <span>{graph}</span>
            </button>
          }
        >
          <MenuItem onClick={openEditModal} disabled={graph === "main"}>
            Edit
          </MenuItem>
          <MenuItem onClick={openCreateModal}>Create New Function</MenuItem>
          <MenuDivider></MenuDivider>
          {customFunctionNodes.map((node) => (
            <MenuItem onClick={() => setGraph(node)} key={node}>
              {node}
            </MenuItem>
          ))}
        </Menu>
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
