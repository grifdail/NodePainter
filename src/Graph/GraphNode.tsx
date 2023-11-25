import React from "react";
import { NodeData } from "../NodeData";
import { PortDefinition } from "../NodeDefinition";
import { PortConnection } from "../PortConnection";
import "./Graph.css";
import { IconArrowUpRightCircle, IconNumbers, IconPalette, IconPlayerPlayFilled, IconQuote } from "@tabler/icons-react";
import { PortType } from "../PortType";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { Tree } from "../Tree";

const PortColor = {
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

function PortView({ y, portDefinition, portData }: { y: number; portDefinition: PortDefinition; portData: PortConnection }) {
  var portDescription = PortColor[portDefinition.type];
  var Icon = portDescription.icon;
  return (
    <g transform={`translate(0, ${y})`} width="200" height="30" className="port">
      <rect x="0" y="0" width="200" height="30" fill="rgba(0,0,0,0.1)"></rect>
      <text fill="black" x="25" y="15" fontSize={15} alignmentBaseline="middle">
        {portDefinition.id}
      </text>
      <circle cx={0} cy={15} r={15} stroke={portDescription.color} fill="white" strokeWidth={2}></circle>
      <Icon color={portDescription.color} x="-12" y="3" scale={10}></Icon>
    </g>
  );
}

function OutPortView({ y, id, type }: { y: number; id: string; type: PortType }) {
  var portDescription = PortColor[type];
  var Icon = portDescription.icon;
  return (
    <g transform={`translate(300, ${y})`} width="200" height="30" className="port">
      <rect x="-98" y="0" width="98" height="30" fill="rgba(0,0,0,0.1)"></rect>
      <text fill="black" x="-25" y="15" fontSize={15} alignmentBaseline="middle" textAnchor="end">
        {id}
      </text>
      <circle cx={0} cy={15} r={15} stroke={portDescription.color} fill="white" strokeWidth={2}></circle>
      <Icon color={portDescription.color} x="-12" y="3" scale={10}></Icon>
    </g>
  );
}

export function GraphNode({ node, tree, viewportScale }: { node: NodeData; tree: Tree; viewportScale: number }) {
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
      {type.inputPorts.map((item, i) => {
        return <PortView y={50 + 32 * i} key={item.id} portDefinition={item} portData={node.inputs[item.id]}></PortView>;
      })}
      {type.executeOutputPorts.map((id, i) => {
        return <OutPortView y={50 + 32 * i} key={id} id={id} type="execute"></OutPortView>;
      })}
      {type.outputPorts.map((item, i) => {
        return <OutPortView y={50 + 32 * i} key={item.id} id={item.id} type={item.type}></OutPortView>;
      })}
    </animated.g>
  );
}
