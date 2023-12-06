import { forwardRef, useImperativeHandle } from "react";
import { useSpring, animated, Interpolation } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { OutPortView } from "./OutPortView";
import { PortView } from "./PortView";
import { MainExecuteId, PortType } from "../Data/NodeDefinition";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { NodeMenu } from "./NodeMenu";
import { useViewbox } from "../Hooks/useViewbox";
import { NodeData, useTree } from "../Hooks/useTree";
import { SettingComponents } from "./SettingsComponents";
import { SettingControl } from "./SettingControl";
import { NodeDefinition, PortRole } from "../Data/NodeDefinition";

function GetNodeHeight(node: NodeData, typeDef: NodeDefinition) {
  var inputCount = Object.keys(node.dataInputs).length;
  var outputCount = Object.keys(node.execOutputs).length + typeDef.dataOutputs.length;
  var sumSetting = typeDef.settings.reduce((prev, def) => SettingComponents[def.type].getSize(node.settings[def.id], def), 0);
  return 50 + 32 * Math.max(inputCount, outputCount) + 15 + sumSetting + typeDef.settings.length * 2;
}

export const GraphNode = forwardRef(function GraphNode(
  {
    node,
    onClickPort,
  }: {
    node: NodeData;
    onClickPort: (node: string, port: string, location: PortRole, type: PortType) => void;
  },
  ref
) {
  const viewPortScale = useViewbox((state) => state.scale);
  const setNodePosition = useTree((state) => state.setNodePosition);
  const getNodeTypeDefinition = useTree((state) => state.getNodeTypeDefinition);
  const inputCount = Object.keys(node.dataInputs).length;
  const executeOutputCount = Object.keys(node.execOutputs).length;
  const dataOutputCount = Object.keys(node.dataOutputs).length;
  const outputCount = executeOutputCount + dataOutputCount;

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
        ...definition.dataInputs.reduce(
          (old, port, i) => ({
            ...old,
            [port.id]: xy.to((x, y) => [x, y + 50 + 32 * i + 15]),
          }),
          start
        ),
        ...Object.entries(node.execOutputs).reduce(
          (old, [port, value], i) => ({
            ...old,
            [port]: xy.to((x, y) => [x + 300, y + 50 + 32 * i + 15]),
          }),
          start
        ),
        ...definition.dataOutputs.reduce(
          (old, port, i) => ({
            ...old,
            [port.id]: xy.to((x, y) => [x + 300, y + 50 + 15 + 32 * (i + executeOutputCount)]),
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

  const portHeight = 50 + 32 * Math.max(inputCount, outputCount);
  return (
    <animated.g transform={xy.to((x, y) => `translate(${x}, ${y})`)} className="node">
      <rect
        width="300"
        height={GetNodeHeight(node, definition)}
        fill="white"
        style={{
          boxShadow: "1px 1px 1px",
          touchAction: "none",
        }}
        stroke="black"
        rx="5"
        {...bind()}
      ></rect>
      {Icon && (
        <Icon
          x="20"
          y="18"
          {...bind()}
          style={{
            touchAction: "none",
          }}
        />
      )}
      <text
        x={!Icon ? 20 : 50}
        y="35"
        fill="black"
        fontSize="18"
        stroke="black"
        {...bind()}
        style={{
          touchAction: "none",
        }}
      >
        {node.type}
      </text>
      {!definition.IsUnique && <NodeMenu node={node} />}
      {definition.canBeExecuted ? <OutPortView x={0} y={15} key={MainExecuteId} id={MainExecuteId} hideLabel type="execute" onClick={() => onClickPort(node.id, MainExecuteId, "inputExecute", "execute")}></OutPortView> : null}
      {definition.dataInputs.map((item, i) => {
        return <PortView y={50 + 32 * i} key={item.id} portDefinition={item} portData={node.dataInputs[item.id]} onClick={() => onClickPort(node.id, item.id, "inputData", item.type)} onValueChange={(v) => setNodeInputValue(node.id, item.id, v)}></PortView>;
      })}
      {Object.entries(node.execOutputs).map(([id], i) => {
        return <OutPortView x={300} y={50 + 32 * i} key={id} id={id} type="execute" onClick={() => onClickPort(node.id, id, "outputExecute", "execute")}></OutPortView>;
      })}
      {definition.dataOutputs.map((item, i) => {
        return <OutPortView x={300} y={50 + 32 * (i + executeOutputCount)} key={item.id} id={item.id} type={item.type} onClick={() => onClickPort(node.id, item.id, "outputData", item.type)}></OutPortView>;
      })}
      {definition.settings.map((item, i) => (
        <SettingControl y={portHeight} value={node.settings[item.id]} onChange={(value) => setNodeSetting(node.id, item.id, value)} def={item} key={i} />
      ))}
    </animated.g>
  );
});
