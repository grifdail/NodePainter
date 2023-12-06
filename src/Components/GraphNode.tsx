import { forwardRef, useImperativeHandle } from "react";
import { useSpring, animated, Interpolation } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { OutPortView } from "./OutPortView";
import { PortView } from "./PortView";
import { MainExecuteId, PortLocation, PortType } from "../Data/PortType";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { NodeMenu } from "./NodeMenu";
import { useViewbox } from "../Hooks/useViewbox";
import { NodeData, useTree } from "../Hooks/useTree";
import { SettingComponents } from "./SettingsComponents";
import { SettingControl } from "./SettingControl";
import { NodeDefinition } from "../Data/NodeDefinition";

function GetNodeHeight(node: NodeData, typeDef: NodeDefinition) {
  var inputCount = Object.keys(node.inputs).length;
  var outputCount = typeDef.executeOutputPorts.length + typeDef.outputPorts.length;
  var sumSetting = typeDef.settings.reduce((prev, def) => SettingComponents[def.type].getSize(node.settings[def.id], def), 0);
  return 50 + 32 * Math.max(inputCount, outputCount) + 15 + sumSetting + typeDef.settings.length * 2;
}

export const GraphNode = forwardRef(function GraphNode(
  {
    node,
    onClickPort,
  }: {
    node: NodeData;
    onClickPort: (node: string, port: string, location: PortLocation, type: PortType) => void;
  },
  ref
) {
  const viewPortScale = useViewbox((state) => state.scale);
  const setNodePosition = useTree((state) => state.setNodePosition);
  const getNodeTypeDefinition = useTree((state) => state.getNodeTypeDefinition);

  const [{ xy }, api] = useSpring(() => ({
    xy: [node.positionX, node.positionY],
  }));

  const bind = useGesture({
    onDrag: ({ movement: [mx, my] }) => {
      api.start({ xy: [node.positionX + mx * viewPortScale, node.positionY + my * viewPortScale] });
    },
    onDragEnd: ({ movement: [mx, my] }) => {
      setNodePosition(node.id, node.positionX + mx * viewPortScale, node.positionY + my * viewPortScale);
    },
  });

  const definition = getNodeTypeDefinition(node);
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

  var setNodeInputValue = useTree((state) => state.setNodeInputValue);
  var setNodeSetting = useTree((state) => state.setNodeSetting);

  var Icon = definition.icon;
  console.log(Icon);

  var inputCount = definition.inputPorts.length;
  var outputCount = definition.executeOutputPorts.length + definition.outputPorts.length;
  const portHeight = 50 + 32 * Math.max(inputCount, outputCount);
  return (
    <animated.g transform={xy.to((x, y) => `translate(${x}, ${y})`)} className="node">
      <rect
        width="300"
        height={GetNodeHeight(node, definition)}
        fill="white"
        style={{
          boxShadow: "1px 1px 1px",
        }}
        stroke="black"
        rx="5"
        {...bind()}
      ></rect>
      {Icon && <Icon x="20" y="18" {...bind()} />}
      <text x={!Icon ? 20 : 50} y="35" fill="black" fontSize="18" stroke="black" {...bind()}>
        {node.type}
      </text>
      {!definition.IsUnique && <NodeMenu node={node} />}
      {definition.canBeExecuted ? <OutPortView x={0} y={15} key={MainExecuteId} id={MainExecuteId} hideLabel type="execute" onClick={() => onClickPort(node.id, MainExecuteId, PortLocation.InputExec, "execute")}></OutPortView> : null}
      {definition.inputPorts.map((item, i) => {
        return <PortView y={50 + 32 * i} key={item.id} portDefinition={item} portData={node.inputs[item.id]} onClick={() => onClickPort(node.id, item.id, PortLocation.InputData, item.type)} onValueChange={(v) => setNodeInputValue(node.id, item.id, v)}></PortView>;
      })}
      {definition.executeOutputPorts.map((id, i) => {
        return <OutPortView x={300} y={50 + 32 * i} key={id} id={id} type="execute" onClick={() => onClickPort(node.id, id, PortLocation.OutputExec, "execute")}></OutPortView>;
      })}
      {definition.outputPorts.map((item, i) => {
        return <OutPortView x={300} y={50 + 32 * (i + definition.executeOutputPorts.length)} key={item.id} id={item.id} type={item.type} onClick={() => onClickPort(node.id, item.id, PortLocation.OutputData, item.type)}></OutPortView>;
      })}
      {definition.settings.map((item, i) => (
        <SettingControl y={portHeight} value={node.settings[item.id]} onChange={(value) => setNodeSetting(node.id, item.id, value)} def={item} key={i} />
      ))}
    </animated.g>
  );
});
