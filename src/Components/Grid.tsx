import { useEffect, useRef } from "react";
import { GraphNode } from "./GraphNode";
import { useSpring, animated, Interpolation } from "@react-spring/web";
import { useMeasure } from "@uidotdev/usehooks";
import { MainExecuteId, PortType } from "../Data/NodeDefinition";
import { Edge } from "./Edge";

import { useSVGMapDrag } from "../Hooks/useSVGMapDrag";
import { useTree } from "../Hooks/useTree";
import { useGesturePrevention } from "../Hooks/useGesturePrevention";
import { usePortSelection } from "../Hooks/usePortSelection";
import { useEdgeCreation } from "../Hooks/useEdgeCreation";

type PortRefType = {
  [key: string]: {
    [key: string]: Interpolation<number[], number[]>;
  };
};

export function Grid() {
  useGesturePrevention();
  const tree = useTree();
  const portSelection = usePortSelection();
  const onClickPort = useEdgeCreation();
  const [ref, elementSize] = useMeasure();
  const [xyz, bind] = useSVGMapDrag();
  const [{ mousePosition }, mousePositionApi] = useSpring(() => ({
    mousePosition: [0, 0],
  }));

  useEffect(() => {
    var cb = (e: PointerEvent) => {
      var now = xyz.get();
      mousePositionApi.start({ mousePosition: [e.clientX * now[2] + now[0], e.clientY * now[2] + now[1]] });
    };
    window.addEventListener("pointermove", cb);
    return () => {
      window.removeEventListener("pointermove", cb);
    };
  }, [mousePositionApi, xyz]);

  const viewBoxStr = xyz.to((x, y, s) => `${x} ${y} ${(elementSize.width || 100) * s} ${(elementSize.height || 100) * s} `);

  const nodes = Object.values(tree.nodes).filter((node) => node.graph === tree.editedGraph);

  const edges = nodes.flatMap((node) => {
    return [
      ...Object.entries(node.inputs)
        .filter(([key, port]) => port.hasConnection)
        .map(([key, port]) => [port.connectedNode, port.connectedPort, node.id, key, port.type]),
      ...Object.entries(node.output)
        .filter(([key, connection]) => connection != null)
        .map(([key, port]) => [node.id, key, port, MainExecuteId, "execute"]),
    ];
  });

  var nodeRef = useRef<PortRefType>({});

  function getNodePort(nodeId: string, portId: string) {
    return nodeRef.current?.[nodeId]?.[portId];
  }

  return (
    <animated.svg ref={ref} width="100%" height="100%" viewBox={viewBoxStr} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <line x1="16" y1="0" x2="16" y2="32" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <line x1="0" y1="16" x2="32" y2="16" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <rect x="16" y="16" width="1" height="1" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        </pattern>
      </defs>
      <animated.rect x={xyz.to((x) => x)} y={xyz.to((x, y) => y)} {...bind()} width="100%" height="100%" fill="url(#grid)" style={{ touchAction: "none" }}></animated.rect>
      {edges.map((edge) => {
        return <Edge key={`${edge[0]}#${edge[1]} to ${edge[2]}#${edge[3]}`} start={getNodePort(edge[0] as string, edge[1] as string)} end={getNodePort(edge[2] as string, edge[3] as string)} type={edge[4] as PortType} />;
      })}
      {portSelection.hasSelection && <Edge key="edge-creation" start={getNodePort(portSelection.node, portSelection.port)} end={mousePosition} type={portSelection.type} reverse={portSelection.location === "inputData" || portSelection.location === "inputExecute"} />}
      {nodes.map((node) => {
        return (
          <GraphNode
            ref={(item) =>
              (nodeRef.current[node.id] = item as {
                [key: string]: Interpolation<number[], number[]>;
              })
            }
            node={node}
            key={node.id}
            onClickPort={onClickPort}
          />
        );
      })}
    </animated.svg>
  );
}
