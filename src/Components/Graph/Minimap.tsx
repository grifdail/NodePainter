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

const MinimapDiv = styled.div`
  display: block;
  position: absolute;
  top: 90px;
  right: 0px;
  width: 200px;
  height: 200px;
  pointer-events: auto;
  background-color: var(--color-background-card);
  padding: var(--padding-small);
  border-radius: 10px;
  transition: transform 0.5s ease;

  &.closed {
    transform: translateX(100%);
  }

  & button {
    position: absolute;
    top: 25px;
    left: 0%;
    transform: translateX(-100%);
    border: none;
    padding: var(--padding-small);
    border-radius: var(--padding-small) 0 0 var(--padding-small);
    cursor: pointer;
    background-color: var(--color-background-card);

    &:hover {
      background-color: var(--color-background-button);
    }
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

export const Minimap = memo(() => {
  const [isOpen, toggle] = useToggle(false);
  const onCLick = useCallback(() => toggle(), [toggle]);
  return (
    <MinimapDiv className={isOpen ? "open" : "closed"}>
      <button onClick={onCLick}>
        <IconMap></IconMap>
      </button>
      <MinimapContent />
    </MinimapDiv>
  );
});

export const MinimapContent = memo(() => {
  const [nodes, editedGraph] = useTree((state) => [state.nodes, state.editedGraph]);
  var debouncedNodes = useDebounce(nodes, 3000);
  const nodesOnThisGraph = useMemo(() => Object.values(debouncedNodes).filter((node) => node.graph === editedGraph), [editedGraph, debouncedNodes]);
  if (nodesOnThisGraph.length === 0) {
    return <></>;
  }
  const [viewboxX, viewboxY, viewBoxScale, set] = useViewbox((state) => [state.x, state.y, state.scale, state.set]);
  const { width: screenX, height: screenY } = useWindowSize();
  const nodesBB = useMemo(() => nodesOnThisGraph.map((node) => [buildApproximateBoundingBox(node), Object.values(node.dataOutputs)[0]?.type || "drawing2d"] as const), [nodesOnThisGraph]);
  const boundingBox = useMemo(() => makeSquare(nodesBB.reduce((oldbb, [node, type]) => oldbb.extend(node), nodesBB[0][0]).growAllSide(100)), [nodesBB]);
  console.log(nodesBB);
  const onClick = useCallback(
    (e: MouseEvent<SVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.x) / rect.width;
      const y = (e.clientY - rect.y) / rect.height;
      var nx = lerp(boundingBox.left, boundingBox.right, x);
      var ny = lerp(boundingBox.top, boundingBox.bottom, y);
      set(nx - (screenX || 100) * viewBoxScale * 0.5, ny - (screenY || 100) * viewBoxScale * 0.5, viewBoxScale);
    },
    [viewBoxScale, screenX, screenY, boundingBox]
  );
  return (
    <svg
      viewBox={`${boundingBox.left} ${boundingBox.top} ${boundingBox.width()} ${boundingBox.height()}`}
      onClick={onClick}>
      <rect
        className="background"
        x={boundingBox.left}
        y={boundingBox.top}
        width={boundingBox.width()}
        height={boundingBox.height()}
        fill="rgba(0,0,255,0.1)"
      />
      {useMemo(
        () =>
          nodesBB.map(([bb, type]) => (
            <rect
              className="node"
              x={bb.left}
              y={bb.top}
              width={bb.width()}
              height={bb.height()}
              fill={PortTypeDefinitions[type].color}
            />
          )),
        [nodesBB]
      )}
      <rect
        className="viewbox"
        x={viewboxX}
        y={viewboxY}
        width={(screenX || 100) * viewBoxScale}
        height={(screenY || 100) * viewBoxScale}
        stroke="green"
        strokeWidth={boundingBox.width() / 500}
      />
    </svg>
  );
});

const buildApproximateBoundingBox = (node: NodeData) => new BoundingBox(node.positionY, node.positionX + 300, node.positionY + 300, node.positionX);

const makeSquare = function (box: BoundingBox) {
  const width = box.width();
  const height = box.height();
  const [cx, cy] = box.center();
  if (height > width) {
    return new BoundingBox(box.top, cx + height * 0.5, box.bottom, cx - height * 0.5);
  } else {
    return new BoundingBox(cy - width * 0.5, box.right, cy + width * 0.5, box.left);
  }
};
