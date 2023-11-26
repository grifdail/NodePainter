import { forwardRef, useImperativeHandle } from "react";
import "./Graph.css";
import { useSpring, animated, Interpolation } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { OutPortView } from "./OutPortView";
import { PortView } from "./PortView";
import { MainExecuteId, PortLocation } from "../Data/PortType";
import { NodeData, getNodeTypeDefinition, useTree } from "../Data/stores";

function GetNodeHeight(node: NodeData) {
  var typeDef = getNodeTypeDefinition(node);
  var inputCount = typeDef.inputPorts.length;
  var outputCount = typeDef.executeOutputPorts.length + typeDef.outputPorts.length;
  return 50 + 32 * Math.max(inputCount, outputCount) + 30 * typeDef.settings.length + 15;
}

export const GraphNode = forwardRef(function GraphNode(
  {
    node,
    viewportScale,
    onClickPort,
  }: {
    node: NodeData;
    viewportScale: number;
    onClickPort: (node: string, port: string, type: PortLocation) => void;
  },
  ref
) {
  var definition = getNodeTypeDefinition(node);
  const [{ xy }, api] = useSpring(() => ({
    xy: [node.positionX, node.positionY],
  }));

  const setNodePosition = useTree((state) => state.setNodePosition);
  const bind = useGesture({
    onDrag: ({ movement: [mx, my] }) => {
      api.start({ xy: [node.positionX + mx * viewportScale, node.positionY + my * viewportScale] });
    },
    onDragEnd: ({ movement: [mx, my] }) => {
      setNodePosition(node.id, node.positionX + mx * viewportScale, node.positionY + my * viewportScale);
    },
  });

  useImperativeHandle(
    ref,
    () => {
      var start: { [key: string]: Interpolation<number[], number[]> } = {};
      return {
        ...definition.inputPorts.reduce(
          (old, port, i) => ({
            ...old,
            [port.id]: xy.to((x, y) => [x, y + 50 + 32 * i + 15]),
          }),
          start
        ),
        ...definition.executeOutputPorts.reduce(
          (old, port, i) => ({
            ...old,
            [port]: xy.to((x, y) => [x + 300, y + 50 + 32 * i + 15]),
          }),
          start
        ),
        ...definition.outputPorts.reduce(
          (old, port, i) => ({
            ...old,
            [port.id]: xy.to((x, y) => [x + 300, y + 50 + 15 + 32 * (i + definition.executeOutputPorts.length)]),
          }),
          start
        ),
        [MainExecuteId]: xy.to((x, y) => [x, y + 25]),
      };
    },
    [xy, definition]
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
      {definition.execute ? <OutPortView x={0} y={25} key={MainExecuteId} id={MainExecuteId} hideLabel type="execute" onClick={() => onClickPort(node.id, MainExecuteId, PortLocation.InputExec)}></OutPortView> : null}
      {definition.inputPorts.map((item, i) => {
        return <PortView y={50 + 32 * i} key={item.id} portDefinition={item} portData={node.inputs[item.id]} onClick={() => onClickPort(node.id, item.id, PortLocation.InputData)}></PortView>;
      })}
      {definition.executeOutputPorts.map((id, i) => {
        return <OutPortView x={300} y={50 + 32 * i} key={id} id={id} type="execute" onClick={() => onClickPort(node.id, id, PortLocation.OutputExec)}></OutPortView>;
      })}
      {definition.outputPorts.map((item, i) => {
        return <OutPortView x={300} y={50 + 32 * (i + definition.executeOutputPorts.length)} key={item.id} id={item.id} type={item.type} onClick={() => onClickPort(node.id, item.id, PortLocation.OutputData)}></OutPortView>;
      })}
    </animated.g>
  );
});
