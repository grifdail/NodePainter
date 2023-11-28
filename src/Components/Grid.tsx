import { useEffect, useRef } from "react";
import { GraphNode } from "./GraphNode";
import { useSpring, animated, Interpolation } from "@react-spring/web";
import { useMeasure } from "@uidotdev/usehooks";
import { Vector2, useGesture } from "@use-gesture/react";
import { MainExecuteId, PortLocation, PortType } from "../Data/PortType";
import { Edge } from "./Edge";
import { useTree } from "../Data/useTree";
import { useEdgeCreation } from "./useEdgeCreation";
import { useGesturePrevention } from "./useGesturePrevention";
import { usePortSelection } from "../Data/usePortSelection";

type gridProps = {
  viewbox: { x: number; y: number; scale: number };
  setViewBox: (x: number, y: number, s: number) => void;
};

type PortRefType = {
  [key: string]: {
    [key: string]: Interpolation<number[], number[]>;
  };
};

export function Grid({ viewbox, setViewBox }: gridProps) {
  useGesturePrevention();
  const tree = useTree();

  const [ref, elementSize] = useMeasure();

  const [{ mousePosition }, mousePositionApi] = useSpring(() => ({
    mousePosition: [0, 0],
  }));
  const [{ xyz }, api] = useSpring(() => ({ xyz: [viewbox.x, viewbox.y, viewbox.scale] }));

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
    onWheel: ({ event: { pageX, pageY }, movement: [_, distance] }) => {
      api.start({ xyz: computeNewScale(viewbox, Math.exp(-distance / 1000), [pageX, pageY]) });
    },
    onWheelEnd: ({ event: { pageX, pageY }, movement: [_, distance] }) => {
      var [x, y, s] = computeNewScale(viewbox, Math.exp(-distance / 1000), [pageX, pageY]);
      setViewBox(x, y, s);
    },
  });

  const viewBoxStr = xyz.to((x, y, s) => `${x} ${y} ${(elementSize.width || 100) * s} ${(elementSize.height || 100) * s} `);

  const edges = Object.keys(tree.nodes).flatMap((key) => {
    var node = tree.nodes[key];
    return [
      ...Object.entries(node.inputs)
        .filter(([key, port]) => port.hasConnection)
        .map(([key, port]) => [port.connectedNode, port.connectedPort, node.id, key, port.type]),
      ...Object.entries(node.output)
        .filter(([key, connection]) => connection != null)
        .map(([key, port]) => [node.id, key, port, MainExecuteId, "execute"]),
    ];
  });

  var portSelection = usePortSelection();

  var onClickPort = useEdgeCreation();

  var nodeRef = useRef<PortRefType>({});

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
        return <Edge key={`${edge[0]}#${edge[1]} to ${edge[2]}#${edge[3]}`} start={getNodePort(edge[0] as string, edge[1] as string)} end={getNodePort(edge[2] as string, edge[3] as string)} type={edge[4] as PortType} />;
      })}
      {portSelection.hasSelection && <Edge key="edge-creation" start={getNodePort(portSelection.node, portSelection.port)} end={mousePosition} type={portSelection.type} reverse={portSelection.location === PortLocation.InputData || portSelection.location === PortLocation.InputExec} />}
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
            viewportScale={viewbox.scale}
            onClickPort={onClickPort}
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
