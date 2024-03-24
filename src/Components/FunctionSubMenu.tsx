import { IconFunctionFilled } from "@tabler/icons-react";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { CUSTOM_SHADER } from "../Nodes/Shaders/RenderShader";
import { CUSTOM_FUNCTION } from "../Nodes/CustomFunction/CustomFunction";
import { useCustomNodeCreationContext } from "../Hooks/useCustomNodeCreationContext";
import { useSelection } from "../Hooks/useSelection";
import { CUSTOM_SIMULATION } from "../Nodes/CustomFunction/CustomSimulation";
import { usePlayerPref } from "../Hooks/usePlayerPref";

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
  };
  const savedFunctions = Object.entries(usePlayerPref((state) => state.savedFunction));

  return (
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
      <MenuDivider></MenuDivider>
      {graph !== "main" && <MenuItem onClick={() => usePlayerPref.getState().saveFunction(useTree.getState().exportCustomeFunction(graph))}>Save</MenuItem>}
      {savedFunctions.some(([key]) => key === graph) && <MenuItem onClick={() => usePlayerPref.getState().removeFunction(graph)}>Remove</MenuItem>}
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
