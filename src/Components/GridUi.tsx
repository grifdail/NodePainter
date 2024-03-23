import { IconFunctionFilled, IconMenu2, IconPlayerPlayFilled, IconPlayerStopFilled, IconPlus, IconSelectAll, IconSquareLetterX } from "@tabler/icons-react";
import { useToggle } from "@uidotdev/usehooks";

import { SketchPreview } from "./SketchPreview";
import { usePortSelection } from "../Hooks/usePortSelection";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { Toolbar } from "./StyledComponents/Toolbar";
import styled from "styled-components";
import { useRouter } from "../Hooks/useRouter";
import { CUSTOM_SHADER } from "../Nodes/Shaders/RenderShader";
import { CUSTOM_FUNCTION } from "../Nodes/CustomFunction/CustomFunction";
import { useCustomNodeCreationContext } from "../Hooks/useCustomNodeCreationContext";
import { WarningTrack } from "./StyledComponents/WarningTrack";
import { FullScreenDiv } from "./StyledComponents/FullScreenDiv";
import { resetCamera } from "../Utils/resetCamera";
import { useSelection } from "../Hooks/useSelection";
import { Templates } from "../Data/templates";
import { CUSTOM_SIMULATION } from "../Nodes/CustomFunction/CustomSimulation";

const BottomToolbar = styled(Toolbar)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export function GridUi() {
  const [showPreview, togglePreview] = useToggle(false);
  const openModal = useRouter((state) => state.open);

  const portSelection = usePortSelection();
  const nodes = useTree((state) => state.nodes);
  const reset = useTree((state) => state.reset);
  const loadTemplate = useTree((state) => state.loadTemplate);
  const graph = useTree((state) => state.editedGraph) || "main";
  const setEditedGraph = useTree((state) => state.setEditedGraph);
  const rawCustomNodes = useTree((state) => state.customNodes);
  const getNodeTypeDefinition = useTree((state) => state.getNodeTypeDefinition);
  const selectionActive = useSelection((state) => state.isInSelectionMode);
  const selectedNodes = useSelection((state) => state.nodes);
  const hasSelection = selectionActive && selectedNodes.length > 0;
  const customFunctionNodes = [
    "main",
    ...Object.values(rawCustomNodes)
      .filter((item) => item.executeAs === CUSTOM_FUNCTION)
      .map((node) => node.id),
  ];
  const customShaderNode = [
    ...Object.values(rawCustomNodes)
      .filter((item) => item.executeAs === CUSTOM_SHADER)
      .map((node) => node.id),
  ];
  const customSimulationNode = [
    ...Object.values(rawCustomNodes)
      .filter((item) => item.executeAs === CUSTOM_SIMULATION)
      .map((node) => node.id),
  ];
  const setGraph = (graph: string) => {
    setEditedGraph(graph === "main" ? undefined : graph);
  };

  const openEditModal = () => {
    useCustomNodeCreationContext.getState().openEdit(getNodeTypeDefinition(graph), useTree.getState().getCustomNodeEditingType());
  };
  const openCreateModal = () => {
    useCustomNodeCreationContext.getState().openCreate("function");
  };
  const openCreateShaderModal = () => {
    useCustomNodeCreationContext.getState().openCreate("shader");
  };
  const opencreateSimulation = () => {
    useCustomNodeCreationContext.getState().openCreate("simulation");
  };
  const toggleSelection = () => {
    useSelection.getState().toggleSetMode(null);
  };
  const createFunctionFromSelection = () => {
    var name = window.prompt("How should the function be named ?", "MyFunction");
    if (name !== null && useTree.getState().getNodeTypeDefinition(name) === undefined) {
      useTree.getState().createFunctionFromNodes(selectedNodes, name);
      useSelection.getState().toggleSetMode(false);
    }
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
        <Menu
          portal
          menuButton={
            <button>
              <IconFunctionFilled></IconFunctionFilled>
              <span>{graph}</span>
            </button>
          }>
          <MenuItem onClick={openEditModal} disabled={graph === "main"}>
            Edit
          </MenuItem>
          <MenuItem onClick={openCreateModal}>Create New Function</MenuItem>
          <MenuItem onClick={openCreateShaderModal}>Create New Shader</MenuItem>
          <MenuItem onClick={opencreateSimulation}>Create New Simulation</MenuItem>
          {hasSelection && <MenuItem onClick={createFunctionFromSelection}>Create New Function from selection</MenuItem>}
          <MenuDivider></MenuDivider>
          {customFunctionNodes.map((node) => (
            <MenuItem onClick={() => setGraph(node)} key={node}>
              {node}
            </MenuItem>
          ))}
          <MenuDivider></MenuDivider>
          {customShaderNode.map((node) => (
            <MenuItem onClick={() => setGraph(node)} key={node}>
              {node}
            </MenuItem>
          ))}
          <MenuDivider></MenuDivider>
          {customSimulationNode.map((node) => (
            <MenuItem onClick={() => setGraph(node)} key={node}>
              {node}
            </MenuItem>
          ))}
        </Menu>
        <button onClick={() => openModal("node-creation")}>
          <IconPlus></IconPlus>
        </button>
        <button onClick={() => togglePreview()}>{showPreview ? <IconPlayerStopFilled /> : <IconPlayerPlayFilled />}</button>
        <button onClick={() => toggleSelection()}>{selectionActive ? <IconSquareLetterX /> : <IconSelectAll />}</button>
        <Menu
          portal
          menuButton={
            <button>
              <IconMenu2></IconMenu2>
            </button>
          }>
          <MenuItem onClick={() => openModal("about")}>About</MenuItem>
          <MenuDivider></MenuDivider>
          <MenuItem onClick={reset}>New Graph</MenuItem>
          <MenuItem onClick={() => openModal("save")}>Save</MenuItem>
          <MenuItem onClick={() => openModal("load")}>Load</MenuItem>
          <MenuDivider></MenuDivider>
          {Object.entries(Templates).map(([key, value]) => (
            <MenuItem onClick={() => loadTemplate(value)}>New from template {key}</MenuItem>
          ))}
          <MenuDivider></MenuDivider>
          <MenuItem onClick={() => openModal("export-gif")}>Export gif</MenuItem>
          <MenuDivider></MenuDivider>
          <MenuItem onClick={resetCamera}>Reset camera</MenuItem>
        </Menu>
      </BottomToolbar>
    </FullScreenDiv>
  );
}
