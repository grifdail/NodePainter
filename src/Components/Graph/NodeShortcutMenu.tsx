import { memo, MouseEvent, ReactElement, useCallback, useMemo } from "react";
import { StateNodes } from "../../Nodes/State";
import { useTree } from "../../Hooks/useTree";
import { useDebounce, useToggle, useWindowSize } from "@uidotdev/usehooks";
import { NodeData } from "../../Types/NodeData";
import { buildBoundingBoxAroundTreeNodes } from "../../Utils/ui/buildBoundingBox";
import { BoundingBox } from "../../Types/BoundingBox";
import { on } from "events";
import { useViewbox } from "../../Hooks/useViewbox";
import styled from "styled-components";
import { cp } from "fs";
import { lerp } from "three/src/math/MathUtils";
import { IconMap, IconTriangle } from "@tabler/icons-react";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { useShallow } from "zustand/react/shallow";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { idToNodeName } from "../../Utils/ui/idToNodeName";

const MenuDiv = styled.div`
  display: block;
  position: absolute;
  bottom: 0;
  right: 0px;
  left: 0px;
  width: 100%;
  pointer-events: auto;
  background-color: var(--color-background);
  padding: var(--padding-small);
  border-radius: 10px;
  transition: transform 0.5s ease;
  display: flex;
  gap: var(--padding-small);
  flex-wrap: nowrap;
  overflow-x: auto;

  & button {
    background: var(--color-background-button);
    color: var(--color-text);
    border: none;
    border-radius: var(--border-radius-small);
    padding: 10px;
    box-sizing: 10px;
    //aspect-ratio: 2;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
  }

  & .background {
    fill: none;
    stroke: none;
  }

  & .node {
    stroke: black;
  }

  & .viewbox {
    fill: rgba(0, 0, 0, 0.3);
    color: var(--color-selected);
  }
`;

export const NodeShortcutMenu = memo(() => {
  const menuVisible = usePlayerPref((state) => state.shortcutVisible);
  if (!menuVisible) {
    return null;
  }

  return <MenuContent />;
});

export const MenuContent = memo(() => {
  const favNodes = usePlayerPref((state) => state.favNodes);
  const sorting = useMemo(() => (a: NodeDefinition, b: NodeDefinition) => (b.featureLevel || 0) - (a.featureLevel || 0), []);
  const isShader = useTree((state) => state.getCustomNodeEditingType() === "shader");
  const treeNodeLibrary = useTree(useShallow((state) => state.getNodeLibrary()));

  const nodeLibrary = useMemo(
    () =>
      Object.values(treeNodeLibrary).filter((item) => {
        if (item.hideInLibrary) {
          return false;
        }
        return isShader ? item.getShaderCode !== undefined : item.getData !== undefined || item.executeAs != null;
      }),
    [treeNodeLibrary, isShader]
  );

  const getClickWorldPosition = useCallback((): [number, number] => {
    var view = useViewbox.getState();
    return [view.x + window.innerWidth * 0.5 * view.scale, view.y + window.innerHeight * 0.5 * view.scale];
  }, []);

  const onClick = useCallback(
    (node: NodeDefinition) => {
      useTree.getState().addNode(node.id, ...getClickWorldPosition());
      usePlayerPref.getState().markNodeAsUsed(node.id);
    },
    [getClickWorldPosition]
  );

  const favoritedNode = useMemo(() => {
    return (nodeLibrary.filter((node) => favNodes.includes(node.id)) as any).toSorted(sorting) as NodeDefinition[];
  }, [nodeLibrary, sorting, favNodes]);

  if (favoritedNode.length === 0) {
    return null;
  }
  return (
    <MenuDiv>
      {favoritedNode.map((item) => (
        <NodeMenuItem node={item} onClick={onClick} />
      ))}
    </MenuDiv>
  );
});

export function NodeMenuItem({ node, onClick }: { node: NodeDefinition; onClick: (node: NodeDefinition) => void }) {
  const Icon = node.icon;
  return (
    <button onClick={() => onClick(node)}>
      {Icon != null ? <Icon></Icon> : null}
      {node.label || idToNodeName(node.id)}
    </button>
  );
}
