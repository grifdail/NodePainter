import React, { useEffect, useRef, useState } from "react";
import { Tree } from "../Data/Tree";
import { GraphNode } from "./GraphNode";
import { useSpring, animated, useSprings, Interpolation } from "@react-spring/web";
import { useMeasure } from "@uidotdev/usehooks";
import { Vector2, useGesture } from "@use-gesture/react";
import { debug } from "console";
import { PortType } from "../Data/PortType";
import { Edge } from "./Edge";
import { IconAlignRight } from "@tabler/icons-react";
import { ThemeProvider } from "styled-components";

type gridProps = {
  tree: Tree;
  viewbox: { x: number; y: number; scale: number };
  setViewBox: (x: number, y: number, s: number) => void;
};
export function Grid({ tree, viewbox, setViewBox }: gridProps) {
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", preventDefault);
    document.addEventListener("gesturechange", preventDefault);

    return () => {
      document.removeEventListener("gesturestart", preventDefault);
      document.removeEventListener("gesturechange", preventDefault);
    };
  }, []);

  const [ref, elementSize] = useMeasure();

  const [{ xyz }, api] = useSpring(() => ({ xyz: [viewbox.x, viewbox.y, viewbox.scale] }));

  type PortSelection = {
    isCreating: boolean;
    startNode: string;
    startPort: string;
    startNodeType: string;
  };
  const [portCreationInfo, setPortCreationInfo] = useState<PortSelection>({
    isCreating: false,
    startNode: "",
    startPort: "",
    startNodeType: "",
  });

  function createDataNode(left: PortSelection, right: PortSelection) {
    var leftType = tree
      .getNode(left.startNode)
      .getType()
      .outputPorts.find((item) => item.id == left.startPort)?.type;

    var rightType = tree.getNode(right.startNode).inputs[right.startPort].type;
    if (leftType == rightType) {
      tree.AddJoin(left.startNode, left.startPort, right.startNode, right.startPort);
    }
  }

  function createExecNode(left: PortSelection, right: PortSelection) {}

  const onClickPort = function (node: string, port: string, type: string) {
    var right = { isCreating: false, startNode: node, startPort: port, startNodeType: type };
    if (portCreationInfo.isCreating) {
      var left = portCreationInfo;
      if (left.startNodeType == "inputData" && right.startNodeType == "outputData") {
        createDataNode(left, right);
      } else if (right.startNodeType == "inputData" && left.startNodeType == "outputData") {
        createDataNode(right, left);
      } else if (left.startNodeType == "inputExecute" && right.startNodeType == "outputExecute") {
        createExecNode(left, right);
      } else if (right.startNodeType == "inputExecute" && left.startNodeType == "outputExecute") {
        createExecNode(right, left);
      }

      setPortCreationInfo((state) => ({ ...state, isCreating: false }));
    } else {
      setPortCreationInfo((state) => right);
    }
  };

  // Set the drag hook and define component movement based on gesture data
  const bind = useGesture({
    onDrag: ({ pinching, movement: [mx, my], cancel }) => {
      if (pinching) return cancel();
      api.start({ xyz: [viewbox.x - mx * viewbox.scale, viewbox.y - my * viewbox.scale, viewbox.scale] });
    },
    onDragEnd: ({ movement: [mx, my] }) => {
      setViewBox(viewbox.x - mx * viewbox.scale, viewbox.y - my * viewbox.scale, viewbox.scale);
    },
    onPinch: ({ origin, movement: [scale] }) => {
      api.start({ xyz: computeNewScale(viewbox, scale, origin) });
    },
    onPinchEnd: ({ origin, movement: [scale] }) => {
      var [x, y, s] = computeNewScale(viewbox, scale, origin);
      setViewBox(x, y, s);
    },
  });

  const viewBoxStr = xyz.to((x, y, s) => `${x} ${y} ${(elementSize.width || 100) * s} ${(elementSize.height || 100) * s} `);

  const edges = Object.keys(tree.nodes).flatMap((key) => {
    var node = tree.nodes[key];
    var nodeType = node.getType();
    return [
      ...Object.entries(node.inputs)
        .filter(([key, port]) => port.hasConnection)
        .map(([key, port]) => [port.connectedNode, port.connectedPort, node.id, key, port.type]),
      ...Object.entries(node.output)
        .filter(([key, connection]) => connection != null)
        .map(([key, port]) => [node.id, key, port, "mainExecute", "execute"]),
    ];
  });

  type PortRefType = {
    [key: string]: {
      [key: string]: Interpolation<number[], number[]>;
    };
  };

  var nodeRef = useRef<PortRefType>({});

  console.log(nodeRef);

  function getNodePort(nodeId: string, portId: string) {
    return nodeRef.current?.[nodeId]?.[portId];
  }

  return (
    <animated.svg ref={ref} width="100%" style={{ touchAction: "none" }} height="100%" viewBox={viewBoxStr} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <line x1="16" y1="0" x2="16" y2="32" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <line x1="0" y1="16" x2="32" y2="16" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <rect x="16" y="16" width="1" height="1" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        </pattern>
      </defs>
      <animated.rect x={xyz.to((x) => x)} y={xyz.to((x, y) => y)} {...bind()} width="100%" height="100%" fill="url(#grid)"></animated.rect>
      {edges.map((edge) => {
        return <Edge start={getNodePort(edge[0] as string, edge[1] as string)} end={getNodePort(edge[2] as string, edge[3] as string)} type={edge[4] as PortType} />;
      })}
      {Object.keys(tree.nodes).map((treeId) => {
        return (
          <GraphNode
            ref={(item) =>
              (nodeRef.current[treeId] = item as {
                [key: string]: Interpolation<number[], number[]>;
              })
            }
            node={tree.getNode(treeId)}
            key={treeId}
            tree={tree}
            viewportScale={viewbox.scale}
          />
        );
      })}
    </animated.svg>
  );
}
function computeNewScale(viewbox: { x: number; y: number; scale: number }, scale: number, origin: Vector2): number[] {
  var scaleDiff = viewbox.scale - viewbox.scale / scale;
  return [viewbox.x + origin[0] * scaleDiff, viewbox.y + origin[1] * scaleDiff, viewbox.scale / scale];
}
