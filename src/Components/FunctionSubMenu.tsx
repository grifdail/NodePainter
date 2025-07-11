import { IconCube, IconFunction, IconFunctionFilled, IconPackage, IconPencil, IconPhotoScan, IconRepeat } from "@tabler/icons-react";
import { useTree } from "../Hooks/useTree";
import { Menu, MenuDivider, MenuHeader, MenuItem, SubMenu } from "@szhsin/react-menu";
import { CUSTOM_SHADER } from "../Nodes/Technical/ImageEffectShader/RenderShader";
import { useCustomNodeCreationContext } from "../Hooks/useCustomNodeCreationContext";
import { useSelection } from "../Hooks/useSelection";
import { ReactElement, useCallback, useMemo } from "react";
import { resetCamera } from "../Utils/ui/resetCamera";
import { useAllSavedFunction } from "../Hooks/db";
import { useShallow } from "zustand/react/shallow";
import { createStructTypeModal } from "../Hooks/createStructTypeModal";
import { CustomFunction } from "../Nodes/Technical/CustomFunction/CustomFunction";
import { ShaderMaterial } from "../Nodes/Technical/MaterialShader/ShaderMaterial";
import { CustomSimulation } from "../Nodes/Technical/Simulation/CustomSimulation";

const openCreateModal = () => {
  useCustomNodeCreationContext.getState().openCreate("function");
};
const openCreateShaderImageEffectModal = () => {
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
        .filter((item) => item.executeAs === CustomFunction.id)
        .map((node) => node.id),
    ],
    [rawCustomNodes]
  );
  const customShaderNode = useMemo(
    () => [
      ...Object.values(rawCustomNodes)
        .filter((item) => item.executeAs === CUSTOM_SHADER || item.executeAs === ShaderMaterial.id)
        .map((node) => node.id),
    ],
    [rawCustomNodes]
  );
  const customSimulationNode = useMemo(
    () => [
      ...Object.values(rawCustomNodes)
        .filter((item) => item.executeAs === CustomSimulation.id)
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
        <button
          data-tooltip-id="tooltip"
          data-tooltip-content="Functions">
          <IconFunctionFilled></IconFunctionFilled>
          <span>{graph}</span>
        </button>
      }>
      <MenuItem
        onClick={openEditModal}
        disabled={graph === "main"}>
        <IconPencil></IconPencil>
        Edit the current {editingType} settings
      </MenuItem>
      <MenuItem onClick={openCreateModal}>
        <IconFunction /> Create new Function
      </MenuItem>
      <MenuItem onClick={openCreateShaderImageEffectModal}>
        <IconPhotoScan /> Create new Image Effect Shader
      </MenuItem>
      <MenuItem onClick={openCreateShaderMaterialModal}>
        <IconCube /> Create new Material Shader
      </MenuItem>

      <MenuItem onClick={opencreateSimulation}>
        <IconRepeat /> Create new Simulation
      </MenuItem>
      <MenuItem onClick={() => createStructTypeModal("struct-1", [])}>
        <IconPackage /> Create new Structure type
      </MenuItem>
      {hasSelection && <MenuItem onClick={createFunctionFromSelection}>Create New Function from selection</MenuItem>}
      {customFunctionNodes.length > 0 && (
        <GraphSelector
          list={customFunctionNodes}
          setGraph={setGraph}
          name="Functions"></GraphSelector>
      )}
      {customShaderNode.length > 0 && (
        <GraphSelector
          list={customShaderNode}
          setGraph={setGraph}
          name="Shaders"></GraphSelector>
      )}
      {customSimulationNode.length > 0 && (
        <GraphSelector
          list={customSimulationNode}
          setGraph={setGraph}
          name="Simulations"></GraphSelector>
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
        <MenuItem
          onClick={() => setGraph(node)}
          key={node}>
          {node}
        </MenuItem>
      ))}
    </>
  );
}
