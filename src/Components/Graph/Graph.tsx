import { MouseEvent, useCallback, useEffect, useMemo } from "react";
import { GraphNodeUI } from "./GraphNodeUI";
import { useSpring, animated, useSprings, SpringValue } from "@react-spring/web";
import { useMeasure, useMediaQuery } from "@uidotdev/usehooks";
import { Edge } from "./Edge";
import { useGesturePrevention } from "../../Hooks/useGesturePrevention";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { usePortSelection } from "../../Hooks/usePortSelection";
import { useEdgeCreation } from "../../Hooks/useEdgeCreation";
import { useSVGMapDrag } from "../../Hooks/useSVGMapDrag";
import { PortType } from "../../Types/PortType";
import { useSelection } from "../../Hooks/useSelection";
import { ContextMenu, useContextMenu } from "./ContextMenu";
import { useColorScheme } from "@uiw/react-use-colorscheme";
import { useGraphHotkey } from "../../Hooks/useGraphHotkey";
import { EDGE_LINE_WIDTH, NODE_HEADER_HEIGHT, NODE_WIDTH, PORT_HEIGHT_WITH_SPACING } from "./NodeVisualConst";
import { PairingLine } from "./PairingLine";

function AreaSelectionRect({ areaSelection, mousePosition }: { areaSelection: [number, number]; mousePosition: SpringValue<number[]> }) {
  return (
    <animated.rect
      fill="light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.1))"
      stroke="var(--color-border)"
      strokeDasharray="4 10"
      strokeWidth={5}
      x={mousePosition.to((x, y) => Math.min(x, areaSelection[0]))}
      y={mousePosition.to((x, y) => Math.min(y, areaSelection[1]))}
      width={mousePosition.to((x, y) => Math.abs(x - areaSelection[0]))}
      height={mousePosition.to((x, y) => Math.abs(y - areaSelection[1]))}></animated.rect>
  );
}

export function Graph() {
  useGesturePrevention();
  const tree = useTree();
  const portSelection = usePortSelection();
  const { onClickPort, onClickNode: onClickNodeEdgeCreation } = useEdgeCreation();
  const [ref, elementSize] = useMeasure();
  const [xyz, bind] = useSVGMapDrag();
  const { nodes: selectedNode, hasArea, areaStart } = useSelection();
  const contextMenuData = useContextMenu();
  const [{ mousePosition }, mousePositionApi] = useSpring(() => ({
    mousePosition: [0, 0],
  }));
  var hasNoCursor = useMediaQuery("(hover: none)");

  useGraphHotkey();

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

  const nodes = useMemo(() => Object.values(tree.nodes).filter((node) => node.graph === tree.editedGraph), [tree.editedGraph, tree.nodes]);

  const edges = useMemo(
    () =>
      nodes.flatMap((node) => {
        return Object.entries(node.dataInputs)
          .filter(([key, port]) => port.hasConnection)
          .map(([key, port]) => [port.connectedNode, port.connectedPort, node.id, key, port.type]);
      }),
    [nodes]
  );

  const [nodePositionSpring, nodePositionSpringApi] = useSprings(
    nodes.length,
    (index) => {
      return {
        to: { xy: [nodes[index].positionX, nodes[index].positionY] },
      };
    },
    [nodes]
  );
  useEffect(() => {
    nodePositionSpringApi.set((index) => {
      return { xy: [nodes[index].positionX, nodes[index].positionY] };
    });
    //Disabling the warning as we INTENTIONALY want to trigger the imperative api when a node is deleted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tree.nodeDeletionCount]);

  const ports = useMemo(
    () =>
      Object.fromEntries(
        nodes.map((node, i) => {
          const outputCount = Object.values(node.dataOutputs).length;
          var xy = nodePositionSpring[i].xy;
          return [
            node.id,
            {
              "self-in": xy.to((x, y) => [x + 150, y + NODE_HEADER_HEIGHT / 2]),
              ...Object.fromEntries(Object.entries(node.dataInputs).map(([portId, port], i) => [`${portId}-in`, xy.to((x, y) => [x, y + NODE_HEADER_HEIGHT - EDGE_LINE_WIDTH * 0.5 + PORT_HEIGHT_WITH_SPACING * 0.5 + PORT_HEIGHT_WITH_SPACING * (i + outputCount)])])),
              ...Object.fromEntries(Object.entries(node.dataOutputs).map(([portId, port], i) => [`${portId}-out`, xy.to((x, y) => [x + NODE_WIDTH, y + NODE_HEADER_HEIGHT - EDGE_LINE_WIDTH * 0.5 + PORT_HEIGHT_WITH_SPACING * 0.5 + PORT_HEIGHT_WITH_SPACING * i])])),
            },
          ];
        })
      ),
    [nodePositionSpring, nodes]
  );

  const getNodePort = useCallback(
    function getNodePort(nodeId: string, portId: string, type = "in") {
      return (ports[nodeId] as any)?.[`${portId}-${type}`];
    },
    [ports]
  );

  const onTapNode = useCallback(
    function onTapNode(node: NodeData, e: MouseEvent<Element>): void {
      var selection = useSelection.getState();
      if (selection.isInSelectionMode || e.ctrlKey) {
        selection.toggleNode(node.id);
      } else {
        onClickNodeEdgeCreation(node);
      }
    },
    [onClickNodeEdgeCreation]
  );

  const onMoveNode = useCallback(
    function onMoveNode(i: number, x: number, y: number, isDefinitive: boolean = false): void {
      let selectedNode = useSelection.getState().nodes;
      if (selectedNode.length > 0 && !selectedNode.includes(nodes[i].id)) {
        selectedNode = [];
        useSelection.getState().clear();
      }
      if (selectedNode.length <= 0) {
        selectedNode = [nodes[i].id];
      }
      if (isDefinitive) {
        for (let selectionIndex = 0; selectionIndex < selectedNode.length; selectionIndex++) {
          const node = tree.nodes[selectedNode[selectionIndex]];
          tree.setNodePosition(selectedNode[selectionIndex], node.positionX + x, node.positionY + y);
        }
      } else {
        nodePositionSpringApi.start((i2) => {
          const node = nodes[i2];
          if (selectedNode.includes(node.id)) {
            return { xy: [node.positionX + x, node.positionY + y] };
          }
          return {};
        });
      }
    },
    [nodePositionSpringApi, nodes, tree]
  );

  const colorScheme = useColorScheme();

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <animated.svg
        ref={ref}
        width="100%"
        height="100%"
        viewBox={viewBoxStr}
        xmlns="http://www.w3.org/2000/svg"
        style={{ touchAction: "none" }}
        onContextMenu={contextMenuData.onContextMenu}>
        <defs>
          <pattern
            id="grid"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse">
            <line
              x1="16"
              y1="0"
              x2="16"
              y2="32"
              stroke={colorScheme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.1)"}
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="16"
              x2="32"
              y2="16"
              stroke={colorScheme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.1)"}
              strokeWidth="1"
            />
            <rect
              x="16"
              y="16"
              width="1"
              height="1"
              stroke={colorScheme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0,0,0,0.2)"}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <animated.rect
          x={xyz.to((x) => x)}
          y={xyz.to((x, y) => y)}
          {...bind()}
          width="100%"
          height="100%"
          fill="url(#grid)"
          style={{ touchAction: "none" }}></animated.rect>
        {nodes
          .filter((node) => node.pairedNode != undefined)
          .map((node) => {
            return (
              <PairingLine
                key={`${node.id}-pairing`}
                start={getNodePort(node.id, "self", "in")}
                end={getNodePort(node.pairedNode as string, "self", "in")}
              />
            );
          })}
        {edges.map((edge) => {
          return (
            <Edge
              key={`${edge[0]}#${edge[1]} to ${edge[2]}#${edge[3]}`}
              start={getNodePort(edge[0] as string, edge[1] as string, "out")}
              end={getNodePort(edge[2] as string, edge[3] as string, "in")}
              type={edge[4] as PortType}
            />
          );
        })}
        {portSelection.hasSelection && !hasNoCursor && (
          <Edge
            key="edge-creation"
            start={getNodePort(portSelection.node, portSelection.port, portSelection.location === "input" ? "in" : "out")}
            end={mousePosition}
            type={portSelection.type}
            reverse={portSelection.location === "input"}
          />
        )}
        {nodes.map((node, i) => {
          const nodeProps = {
            node,
            onClickPort,
            xy: nodePositionSpring[i].xy,
            isSelected: selectedNode.some((id) => id === node.id),
            onTap: (e: MouseEvent<Element>) => onTapNode(node, e),
            onMove: (x: number, y: number, definitive: boolean) => onMoveNode(i, x, y, definitive),
          };
          return (
            <GraphNodeUI
              key={node.id}
              {...nodeProps}
            />
          );
        })}
        {hasArea && (
          <AreaSelectionRect
            areaSelection={areaStart as [number, number]}
            mousePosition={mousePosition}></AreaSelectionRect>
        )}
      </animated.svg>
      {contextMenuData.state === "open" && <ContextMenu {...contextMenuData}></ContextMenu>}
    </div>
  );
}
