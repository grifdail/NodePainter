import React, { forwardRef, useImperativeHandle } from "react";
import { NodeData } from "../Data/NodeData";
import "./Graph.css";
import { IconArrowUpRightCircle, IconNumbers, IconPalette, IconPlayerPlayFilled, IconQuote } from "@tabler/icons-react";
import { useSpring, animated, FrameValue, Interpolation } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { Tree } from "../Data/Tree";
import { stringify } from "querystring";
import { OutPortView } from "./OutPortView";
import { PortView } from "./PortView";

export const PortColor = {
  execute: {
    color: "#2fb344",
    icon: IconPlayerPlayFilled,
  },
  number: {
    color: "#4299e1",
    icon: IconNumbers,
  },
  vector2: {
    color: "#ae3ec9",
    icon: IconArrowUpRightCircle,
  },
  color: {
    color: "#f76707",
    icon: IconPalette,
  },
  string: {
    color: "#d6336c",
    icon: IconQuote,
  },
};

function GetNodeHeight(node: NodeData) {
  var type = node.getType();
  var inputCount = type.inputPorts.length;
  var outputCount = type.executeOutputPorts.length + type.outputPorts.length;
  return 50 + 32 * Math.max(inputCount, outputCount) + 30 * type.settings.length + 15;
}

export const GraphNode = forwardRef(function GraphNode({ node, tree, viewportScale }: { node: NodeData; tree: Tree; viewportScale: number }, ref) {
  var type = node.getType();
  const [{ xy }, api] = useSpring(() => ({
    xy: [node.positionX, node.positionY],
  }));
  const bind = useGesture({
    onDrag: ({ movement: [mx, my] }) => {
      api.start({ xy: [node.positionX + mx * viewportScale, node.positionY + my * viewportScale] });
    },
    onDragEnd: ({ movement: [mx, my] }) => {
      tree.setNodePosition(node.id, node.positionX + mx * viewportScale, node.positionY + my * viewportScale);
    },
  });

  useImperativeHandle(
    ref,
    () => {
      var start: { [key: string]: Interpolation<number[], number[]> } = {};
      var mainExecute = {
        mainExecute: xy.to((x, y) => [x, y + 25]),
      };
      return {
        ...type.inputPorts.reduce(
          (old, port, i) => ({
            ...old,
            [port.id]: xy.to((x, y) => [x, y + 50 + 32 * i]),
          }),
          start
        ),
        ...type.executeOutputPorts.reduce(
          (old, port, i) => ({
            ...old,
            [port]: xy.to((x, y) => [x + 300, y + 50 + 32 * i]),
          }),
          start
        ),
        ...type.outputPorts.reduce(
          (old, port, i) => ({
            ...old,
            [port.id]: xy.to((x, y) => [x + 300, y + 50 + 32 * (i + type.executeOutputPorts.length)]),
          }),
          start
        ),
      };
    },
    [xy, type]
  );

  return (
    <animated.g transform={xy.to((x, y) => `translate(${x}, ${y})`)} {...bind()}>
      <rect
        width="300"
        height={GetNodeHeight(node)}
        fill="white"
        style={{
          boxShadow: "1px 1px 1px",
        }}
        stroke="black"
        rx="5"
      ></rect>
      <text x="20" y="35" fill="black" fontSize="18" stroke="black">
        {node.type}
      </text>
      {type.execute ? <OutPortView x={0} y={25} key="mainExecute" id="mainExecute" hideLabel type="execute"></OutPortView> : null}
      {type.inputPorts.map((item, i) => {
        return <PortView y={50 + 32 * i} key={item.id} portDefinition={item} portData={node.inputs[item.id]}></PortView>;
      })}
      {type.executeOutputPorts.map((id, i) => {
        return <OutPortView x={300} y={50 + 32 * i} key={id} id={id} type="execute"></OutPortView>;
      })}
      {type.outputPorts.map((item, i) => {
        return <OutPortView x={300} y={50 + 32 * (i + type.executeOutputPorts.length)} key={item.id} id={item.id} type={item.type}></OutPortView>;
      })}
    </animated.g>
  );
});
