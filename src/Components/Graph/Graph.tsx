import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { GraphNodeUI } from "./GraphNodeUI";
import { useSpring, animated, useSprings, SpringValue, SpringRef, Interpolation } from "@react-spring/web";
import { useMeasure, useMediaQuery, usePrevious } from "@uidotdev/usehooks";
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
import { useGraphHotkey } from "../../Hooks/useGraphHotkey";
import { EDGE_LINE_WIDTH, NODE_HEADER_HEIGHT, NODE_WIDTH, PORT_HEIGHT_WITH_SPACING } from "./NodeVisualConst";
import { PairingLine } from "./PairingLine";
import { TreeStore } from "../../Types/TreeStore";
import { SVGGridPattern } from "./SVGGridPattern";
import { useCopyPasteGraph } from "./useCopyPasteGraph";
import { abs } from "mathjs";
import { GraphAreaRect } from "./GraphAreaRect";
import { useViewbox } from "../../Hooks/useViewbox";

function AreaSelectionRect({ areaSelection, mousePosition }: { areaSelection: [number, number]; mousePosition: SpringValue<[number, number]> }) {
  return (
    <animated.rect fill="var(--color-box-selection)" stroke="var(--color-border)" strokeDasharray="4 10" strokeWidth={5} x={mousePosition.to((x, y) => Math.min(x, areaSelection[0]))} y={mousePosition.to((x, y) => Math.min(y, areaSelection[1]))} width={mousePosition.to((x, y) => Math.abs(x - areaSelection[0]))} height={mousePosition.to((x, y) => Math.abs(y - areaSelection[1]))}></animated.rect>
  );
}

export function Graph() {
  useGesturePrevention();
  const tree = useTree();
  const portSelection = usePortSelection();
  const { onClickPort, onClickNode: onClickNodeEdgeCreation } = useEdgeCreation();
  const [ref, elementSize] = useMeasure();
  const [xyz, bind, screenBox, viewportScale] = useSVGMapDrag();
  const { nodes: selectedNode, hasArea, areaStart } = useSelection();
  const contextMenuData = useContextMenu();
  const [{ mousePosition }, mousePositionApi] = useSpring<{ mousePosition: [number, number] }>(() => ({ mousePosition: [0, 0] }));
  const hasNoCursor = useMediaQuery("(hover: none)");
  const viewBoxStr = xyz.to((x, y, s) => `${x} ${y} ${(elementSize.width || 100) * s} ${(elementSize.height || 100) * s} `);
  const nodesOnThisGraph = useMemo(() => Object.values(tree.nodes).filter((node) => node.graph === tree.editedGraph), [tree.editedGraph, tree.nodes]);
  const nodesToDraw = nodesOnThisGraph.map((node, index) => [node, index] as const); //useMemo(() => nodesOnThisGraph.map((node, index) => [node, index] as const).filter(([node]) => screenBox.contain(node.positionX, node.positionY)), [screenBox, nodesOnThisGraph]);
  const edges = useGraphEdge(nodesOnThisGraph);
  const [nodePositionSpring, nodePositionSpringApi] = useNodePositionSpring(nodesOnThisGraph, tree);
  const getNodePort = useGetNodePort(nodesOnThisGraph, nodePositionSpring);
  const onTapNode = useNodeTap(onClickNodeEdgeCreation);
  const onMoveNode = useMoveNode(nodesOnThisGraph, tree, nodePositionSpringApi);

  useCopyPasteGraph();
  useGraphHotkey();
  useMousePositionSpring(xyz, mousePositionApi);

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <animated.svg ref={ref} width="100%" height="100%" viewBox={viewBoxStr} xmlns="http://www.w3.org/2000/svg" style={{ touchAction: "none" }} onContextMenu={contextMenuData.onContextMenu}>
        <defs>
          <SVGGridPattern></SVGGridPattern>
        </defs>
        <animated.rect x={xyz.to((x) => x)} y={xyz.to((x, y) => y)} {...bind()} width="100%" height="100%" fill="url(#grid)" style={{ touchAction: "none" }}></animated.rect>
        {nodesOnThisGraph
          .filter((node) => node.settings?.grapharea)

          .map((node) => {
            return <GraphAreaRect key={`${node.id}-pairing`} base={getNodePort(node.id, "self", "in")} area={node.settings?.grapharea} node={node} />;
          })}
        {nodesOnThisGraph
          .filter((node) => node.pairedNode != undefined)
          .map((node) => {
            return <PairingLine key={`${node.id}-pairing`} start={getNodePort(node.id, "self", "in")} end={getNodePort(node.pairedNode as string, "self", "in")} />;
          })}
        {edges.map((edge) => {
          return <Edge key={`${edge[0]}#${edge[1]} to ${edge[2]}#${edge[3]}`} start={getNodePort(edge[0] as string, edge[1] as string, "out")} end={getNodePort(edge[2] as string, edge[3] as string, "in")} type={edge[4] as PortType} />;
        })}
        {portSelection.hasSelection && !hasNoCursor && <Edge key="edge-creation" start={getNodePort(portSelection.node, portSelection.port, portSelection.location === "input" ? "in" : "out")} end={mousePosition} type={portSelection.type} reverse={portSelection.location === "input"} />}
        {nodesToDraw.map(([node, i]) => {
          const nodeProps = {
            node,
            index: i,
            onClickPort,
            xy: nodePositionSpring[i].xy,
            isSelected: selectedNode.some((id) => id === node.id),
            onTap: onTapNode,
            onMove: onMoveNode,
          };
          return <GraphNodeUI key={node.id} {...nodeProps} />;
        })}
        {hasArea && <AreaSelectionRect areaSelection={areaStart as [number, number]} mousePosition={mousePosition}></AreaSelectionRect>}
      </animated.svg>
      {contextMenuData.state === "open" && <ContextMenu {...contextMenuData}></ContextMenu>}
    </div>
  );
}

function useMousePositionSpring(xyz: SpringValue<number[]>, mousePositionApi: SpringRef<{ mousePosition: [number, number] }>) {
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
}

function useGraphEdge(nodes: NodeData[]) {
  return useMemo(
    () =>
      nodes.flatMap((node) => {
        return Object.entries(node.dataInputs)
          .filter(([key, port]) => port.hasConnection)
          .map(([key, port]) => [port.connectedNode, port.connectedPort, node.id, key, port.type]);
      }),
    [nodes]
  );
}

function usePortPosition(nodes: NodeData[], nodePositionSpring: { xy: SpringValue<number[]> }[]) {
  return useMemo(
    () =>
      Object.fromEntries(
        nodes.map((node, i) => {
          const outputCount = Object.values(node.dataOutputs).length;
          var xy = nodePositionSpring[i].xy;
          return [
            node.id,
            {
              "self-in": xy.to((x, y) => [x + NODE_WIDTH * 0.5, y + NODE_HEADER_HEIGHT * 0.5]),
              ...Object.fromEntries(Object.entries(node.dataInputs).map(([portId, port], i) => [`${portId}-in`, xy.to((x, y) => [x, y + NODE_HEADER_HEIGHT - EDGE_LINE_WIDTH * 0.5 + PORT_HEIGHT_WITH_SPACING * 0.5 + PORT_HEIGHT_WITH_SPACING * (i + outputCount)])])),
              ...Object.fromEntries(Object.entries(node.dataOutputs).map(([portId, port], i) => [`${portId}-out`, xy.to((x, y) => [x + NODE_WIDTH, y + NODE_HEADER_HEIGHT - EDGE_LINE_WIDTH * 0.5 + PORT_HEIGHT_WITH_SPACING * 0.5 + PORT_HEIGHT_WITH_SPACING * i])])),
            },
          ];
        })
      ),
    [nodePositionSpring, nodes]
  );
}

function useGetNodePort(nodes: NodeData[], nodePositionSpring: { xy: SpringValue<number[]> }[]) {
  const ports = usePortPosition(nodes, nodePositionSpring);
  return useCallback(
    function getNodePort(nodeId: string, portId: string, type = "in") {
      return (ports[nodeId] as any)?.[`${portId}-${type}`];
    },
    [ports]
  );
}

function useMoveNode(displayedNode: NodeData[], tree: TreeStore, nodePositionSpringApi: SpringRef<{ xy: number[] }>) {
  return useCallback(
    function onMoveNode(i: number, x: number, y: number, isDefinitive: boolean = false, linear: boolean): void {
      const tree = useTree.getState();
      const viewPortscale = useViewbox.getState().scale;
      x *= viewPortscale;
      y *= viewPortscale;
      const allNodes = tree.nodes;
      let selectedNode = useSelection.getState().nodes;
      if (selectedNode.length > 0 && !selectedNode.includes(displayedNode[i].id)) {
        selectedNode = [];
        useSelection.getState().clear();
      }
      if (selectedNode.length <= 0) {
        selectedNode = [displayedNode[i].id];
      }
      if (linear) {
        if (abs(x) > abs(y)) {
          y = 0;
        } else {
          x = 0;
        }
      }
      if (isDefinitive) {
        for (let selectionIndex = 0; selectionIndex < selectedNode.length; selectionIndex++) {
          const node = tree.nodes[selectedNode[selectionIndex]];
          tree.setNodePosition(selectedNode[selectionIndex], node.positionX + x, node.positionY + y);
        }
      } else {
        nodePositionSpringApi.start((i2) => {
          const node = allNodes[displayedNode[i2].id];
          if (selectedNode.includes(node.id)) {
            return { xy: [node.positionX + x, node.positionY + y] };
          }
          return {};
        });
      }
    },
    [nodePositionSpringApi, Object.keys(displayedNode).join("-")]
  );
}

function useNodeTap(onClickNodeEdgeCreation: (node: NodeData) => void) {
  return useCallback(
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
}

function useNodePositionSpring(nodes: NodeData[], tree: TreeStore) {
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
  return [nodePositionSpring, nodePositionSpringApi] as const;
}
