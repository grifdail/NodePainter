import { IconFunction, IconFunctionFilled, IconPencil, IconPhotoScan, IconRepeat } from "@tabler/icons-react";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuHeader, MenuItem, SubMenu } from "@szhsin/react-menu";
import { CUSTOM_SHADER } from "../Nodes/Shaders/RenderShader";
import { CUSTOM_FUNCTION } from "../Nodes/CustomFunction/CustomFunction";
import { useCustomNodeCreationContext } from "../Hooks/useCustomNodeCreationContext";
import { useSelection } from "../Hooks/useSelection";
import { CUSTOM_SIMULATION } from "../Nodes/CustomFunction/CustomSimulation";
import { ReactElement, useCallback, useMemo } from "react";
import { resetCamera } from "../Utils/resetCamera";
import { SHADER_MATERIAL } from "../Nodes/Shaders/ShaderMaterial";
import { useAllSavedFunction } from "../Hooks/db";
import { useShallow } from "zustand/react/shallow";

const openCreateModal = () => {
  useCustomNodeCreationContext.getState().openCreate("function");
};
const openCreateShaderModal = () => {
  useCustomNodeCreationContext.getState().openCreate("shader");
};
const openCreateShaderMaterialModal = () => {
  useCustomNodeCreationContext.getState().openCreate("shaderMaterial", "shader");
};
const opencreateSimulation = () => {
  useCustomNodeCreationContext.getState().openCreate("simulation");
};

export function FunctionSubMenu() {
  const rawCustomNodes = useTree(useShallow((state) => state.customNodes));
  const getNodeTypeDefinition = useTree((state) => state.getNodeTypeDefinition);

  const selectionActive = useSelection((state) => state.isInSelectionMode);
  const selectedNodes = useSelection(useShallow((state) => state.nodes));
  const hasSelection = selectionActive && selectedNodes.length > 0;

  const graph = useTree((state) => state.editedGraph) || "main";
  const [savedFunction, saveFunction] = useAllSavedFunction();
  const editingType = useTree((state) => state.getCustomNodeEditingType());

  const customFunctionNodes = useMemo(
    () => [
      "main",
      ...Object.values(rawCustomNodes)
        .filter((item) => item.executeAs === CUSTOM_FUNCTION)
        .map((node) => node.id),
    ],
    [rawCustomNodes]
  );
  const customShaderNode = useMemo(
    () => [
      ...Object.values(rawCustomNodes)
        .filter((item) => item.executeAs === CUSTOM_SHADER || item.executeAs === SHADER_MATERIAL)
        .map((node) => node.id),
    ],
    [rawCustomNodes]
  );
  const customSimulationNode = useMemo(
    () => [
      ...Object.values(rawCustomNodes)
        .filter((item) => item.executeAs === CUSTOM_SIMULATION)
        .map((node) => node.id),
    ],
    [rawCustomNodes]
  );

  const openEditModal = useCallback(() => {
    useCustomNodeCreationContext.getState().openEdit(getNodeTypeDefinition(graph), useTree.getState().getCustomNodeEditingType());
  }, [getNodeTypeDefinition, graph]);

  const createFunctionFromSelection = useCallback(() => {
    var name = window.prompt("How should the function be named ?", "MyFunction");
    if (name !== null && useTree.getState().getNodeTypeDefinition(name) === undefined) {
      useTree.getState().createFunctionFromNodes(selectedNodes, name);
      useSelection.getState().toggleSetMode(false);
    }
  }, [selectedNodes]);

  const setEditedGraph = useTree((state) => state.setEditedGraph);

  const setGraph = useCallback(
    (graph: string) => {
      setEditedGraph(graph === "main" ? undefined : graph);
      resetCamera();
    },
    [setEditedGraph]
  );

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
        <IconPencil></IconPencil>
        Edit the current {editingType} settings
      </MenuItem>
      <MenuItem onClick={openCreateModal}>
        <IconFunction /> Create New Function
      </MenuItem>
      <MenuItem onClick={openCreateShaderModal}>
        <IconPhotoScan /> Create New Shader
      </MenuItem>
      <MenuItem onClick={openCreateShaderMaterialModal}>
        <IconPhotoScan /> Create new Shader Material
      </MenuItem>
      <MenuItem onClick={opencreateSimulation}>
        <IconRepeat /> Create New Simulation
      </MenuItem>
      {hasSelection && <MenuItem onClick={createFunctionFromSelection}>Create New Function from selection</MenuItem>}
      {customFunctionNodes.length > 0 && <GraphSelector list={customFunctionNodes} setGraph={setGraph} name="Functions"></GraphSelector>}
      {customShaderNode.length > 0 && <GraphSelector list={customShaderNode} setGraph={setGraph} name="Shaders"></GraphSelector>}
      {customSimulationNode.length > 0 && <GraphSelector list={customSimulationNode} setGraph={setGraph} name="Simulations"></GraphSelector>}

      <MenuDivider></MenuDivider>
      {graph !== "main" && <MenuItem onClick={() => saveFunction(graph, useTree.getState().exportCustomeFunction(graph))}>Save function globaly</MenuItem>}
      {savedFunction && savedFunction.length > 0 && (
        <SubMenu label="Import from a saved function">
          {savedFunction.map((data) => (
            <MenuItem onClick={() => useTree.getState().loadCustomeFunction(JSON.parse(data.content))} key={data.name}>
              {data.name}
            </MenuItem>
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
