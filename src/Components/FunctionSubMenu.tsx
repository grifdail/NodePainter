import { IconFunction, IconFunctionFilled, IconPhotoScan, IconRepeat } from "@tabler/icons-react";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuHeader, MenuItem, SubMenu } from "@szhsin/react-menu";
import { CUSTOM_SHADER } from "../Nodes/Shaders/RenderShader";
import { CUSTOM_FUNCTION } from "../Nodes/CustomFunction/CustomFunction";
import { useCustomNodeCreationContext } from "../Hooks/useCustomNodeCreationContext";
import { useSelection } from "../Hooks/useSelection";
import { CUSTOM_SIMULATION } from "../Nodes/CustomFunction/CustomSimulation";
import { usePlayerPref } from "../Hooks/usePlayerPref";
import { ReactElement } from "react";
import { resetCamera } from "../Utils/resetCamera";

export function FunctionSubMenu() {
  const rawCustomNodes = useTree((state) => state.customNodes);
  const getNodeTypeDefinition = useTree((state) => state.getNodeTypeDefinition);

  const selectionActive = useSelection((state) => state.isInSelectionMode);
  const selectedNodes = useSelection((state) => state.nodes);
  const hasSelection = selectionActive && selectedNodes.length > 0;

  const graph = useTree((state) => state.editedGraph) || "main";

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
  const createFunctionFromSelection = () => {
    var name = window.prompt("How should the function be named ?", "MyFunction");
    if (name !== null && useTree.getState().getNodeTypeDefinition(name) === undefined) {
      useTree.getState().createFunctionFromNodes(selectedNodes, name);
      useSelection.getState().toggleSetMode(false);
    }
  };

  const setEditedGraph = useTree((state) => state.setEditedGraph);
  const setGraph = (graph: string) => {
    setEditedGraph(graph === "main" ? undefined : graph);
    resetCamera();
  };
  const savedFunctions = Object.entries(usePlayerPref((state) => state.savedFunction));

  return (
    <Menu
      portal
      menuButton={
        <button data-tooltip-id="tooltip" data-tooltip-content="Functions">
          <IconFunctionFilled></IconFunctionFilled>
          <span>{graph}</span>
        </button>
      }>
      <MenuItem onClick={openEditModal} disabled={graph === "main"}>
        Edit
      </MenuItem>
      <MenuItem onClick={openCreateModal}>
        <IconFunction /> Create New Function
      </MenuItem>
      <MenuItem onClick={openCreateShaderModal}>
        <IconPhotoScan /> Create New Shader
      </MenuItem>
      <MenuItem onClick={opencreateSimulation}>
        <IconRepeat /> Create New Simulation
      </MenuItem>
      {hasSelection && <MenuItem onClick={createFunctionFromSelection}>Create New Function from selection</MenuItem>}
      {customFunctionNodes.length > 0 && <GraphSelector list={customFunctionNodes} setGraph={setGraph} name="Functions"></GraphSelector>}
      {customShaderNode.length > 0 && <GraphSelector list={customShaderNode} setGraph={setGraph} name="Shaders"></GraphSelector>}
      {customSimulationNode.length > 0 && <GraphSelector list={customSimulationNode} setGraph={setGraph} name="Simulations"></GraphSelector>}

      <MenuDivider></MenuDivider>
      {graph !== "main" && <MenuItem onClick={() => usePlayerPref.getState().saveFunction(useTree.getState().exportCustomeFunction(graph))}>Save function globaly</MenuItem>}
      {savedFunctions.some(([key]) => key === graph) && <MenuItem onClick={() => usePlayerPref.getState().removeFunction(graph)}>Remove function from global data</MenuItem>}
      {savedFunctions.length > 0 && (
        <SubMenu label="load">
          {savedFunctions.map(([key, data]) => (
            <MenuItem onClick={() => useTree.getState().loadCustomeFunction(data)}>{key}</MenuItem>
          ))}
        </SubMenu>
      )}
    </Menu>
  );
}

function GraphSelector({ list, setGraph, name, icon }: { list: string[]; icon?: ReactElement; setGraph: (p: string) => void; name: string }) {
  return (
    <>
      <MenuDivider></MenuDivider>
      <MenuHeader>
        {icon}
        {name}
      </MenuHeader>
      {list.map((node) => (
        <MenuItem onClick={() => setGraph(node)} key={node}>
          {node}
        </MenuItem>
      ))}
    </>
  );
}
