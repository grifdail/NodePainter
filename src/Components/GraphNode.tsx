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
import { NodeData, getNodeTypeDefinition, useTree } from "../Hooks/useTree";
import { SettingDefinition } from "../Data/NodeDefinition";
import { SettingComponents } from "./StyledComponents/SettingsComponents";

function GetNodeHeight(node: NodeData) {
  var typeDef = getNodeTypeDefinition(node);
  var inputCount = typeDef.inputPorts.length;
  var outputCount = typeDef.executeOutputPorts.length + typeDef.outputPorts.length;
  return 50 + 32 * Math.max(inputCount, outputCount) + 30 * typeDef.settings.length + 15;
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
  var definition = getNodeTypeDefinition(node);
  const [{ xy }, api] = useSpring(() => ({
    xy: [node.positionX, node.positionY],
  }));

  const viewPortScale = useViewbox((state) => state.scale);

  const setNodePosition = useTree((state) => state.setNodePosition);

  const bind = useGesture({
    onDrag: ({ movement: [mx, my] }) => {
      api.start({ xy: [node.positionX + mx * viewPortScale, node.positionY + my * viewPortScale] });
    },
    onDragEnd: ({ movement: [mx, my] }) => {
      setNodePosition(node.id, node.positionX + mx * viewPortScale, node.positionY + my * viewPortScale);
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

  var setNodeInputValue = useTree((state) => state.setNodeInputValue);
  var setNodeSetting = useTree((state) => state.setNodeSetting);

  var Icon = definition.icon;

  var typeDef = getNodeTypeDefinition(node);
  var inputCount = typeDef.inputPorts.length;
  var outputCount = typeDef.executeOutputPorts.length + typeDef.outputPorts.length;
  const portHeight = 50 + 32 * Math.max(inputCount, outputCount);

  const SettingControl = ({ y, value, def, onChange }: { y: number; value: any; def: SettingDefinition; onChange: (params: any) => void }) => {
    var DefinedComponent = SettingComponents[def.type];

    return (
      <foreignObject x="25" y={y} height="40" width="250">
        <DefinedComponent value={value} def={def} onChange={onChange} />
      </foreignObject>
    );
  };

  return (
    <animated.g transform={xy.to((x, y) => `translate(${x}, ${y})`)} className="node">
      <rect
        width="300"
        height={GetNodeHeight(node)}
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
      {definition.execute ? <OutPortView x={0} y={15} key={MainExecuteId} id={MainExecuteId} hideLabel type="execute" onClick={() => onClickPort(node.id, MainExecuteId, PortLocation.InputExec, "execute")}></OutPortView> : null}
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
