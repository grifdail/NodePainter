import { animated, SpringValue } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { PortView } from "./PortView";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { NodeMenu } from "./NodeMenu";
import { NodeData, useTree } from "../../Hooks/useTree";
import { MainExecuteId, NodeDefinition, PortRole, PortType } from "../../Data/NodeDefinition";
import { SettingComponents } from "../Settings/SettingsComponents";
import { useViewbox } from "../../Hooks/useViewbox";
import { OutPortView } from "./OutPortView";
import { SettingControl, getSettingHeight } from "./SettingControl";

export function GetNodeHeight(node: NodeData, typeDef: NodeDefinition) {
  var inputCount = Object.keys(node.dataInputs).length;
  var outputCount = Object.keys(node.execOutputs).length + Object.keys(node.dataOutputs).length;
  var sumSetting = typeDef.settings.reduce((prev, def) => prev + SettingComponents[def.type].getSize(node.settings[def.id], def, node), 0);
  return 50 + 32 * Math.max(inputCount, outputCount) + 15 + sumSetting + typeDef.settings.length * 2;
}

export const GraphNode = function GraphNode({ node, onClickPort, xy, setSpring }: { node: NodeData; xy: SpringValue<number[]>; setSpring: (x: number, y: number) => void; onClickPort: (node: string, port: string, location: PortRole, type: PortType) => void }) {
  const viewPortScale = useViewbox((state) => state.scale);
  const setNodePosition = useTree((state) => state.setNodePosition);
  const getNodeTypeDefinition = useTree((state) => state.getNodeTypeDefinition);
  const inputCount = Object.keys(node.dataInputs).length;
  const executeOutputCount = Object.keys(node.execOutputs).length;
  const dataOutputCount = Object.keys(node.dataOutputs).length;
  const outputCount = executeOutputCount + dataOutputCount;
  const definition = getNodeTypeDefinition(node);

  const bind = useGesture({
    onDrag: ({ movement: [mx, my] }) => {
      setSpring(node.positionX + mx * viewPortScale, node.positionY + my * viewPortScale);
    },
    onDragEnd: ({ movement: [mx, my] }) => {
      setNodePosition(node.id, node.positionX + mx * viewPortScale, node.positionY + my * viewPortScale);
    },
  });

  var setNodeInputValue = useTree((state) => state.setNodeInputValue);
  var setNodeSetting = useTree((state) => state.setNodeSetting);

  var Icon = definition.icon;

  const portHeight = 50 + 32 * Math.max(inputCount, outputCount);
  let settingOffset = portHeight;

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
      {!definition.IsUnique && <NodeMenu node={node} def={definition} />}
      {definition.canBeExecuted ? <OutPortView x={0} y={15} key={MainExecuteId} id={MainExecuteId} hideLabel type="execute" onClick={() => onClickPort(node.id, MainExecuteId, "inputExecute", "execute")}></OutPortView> : null}
      {Object.entries(node.dataInputs).map(([key, item], i) => {
        return <PortView y={50 + 32 * i} key={key} portData={item} onClick={() => onClickPort(node.id, key, "inputData", item.type)} onValueChange={(v) => setNodeInputValue(node.id, key, v)}></PortView>;
      })}
      {Object.entries(node.execOutputs).map(([id], i) => {
        return <OutPortView x={300} y={50 + 32 * i} key={id} id={id} type="execute" onClick={() => onClickPort(node.id, id, "outputExecute", "execute")}></OutPortView>;
      })}
      {Object.values(node.dataOutputs).map((item, i) => {
        return <OutPortView x={300} y={50 + 32 * (i + executeOutputCount)} key={item.id} id={item.id} type={item.type} onClick={() => onClickPort(node.id, item.id, "outputData", item.type)}></OutPortView>;
      })}
      {definition.settings.map((item, i) => {
        var n = <SettingControl y={settingOffset} value={node.settings[item.id]} onChange={(value) => setNodeSetting(node.id, item.id, value)} def={item} key={i} nodeData={node} />;
        settingOffset += getSettingHeight(node.settings[item.id], item, node);
        return n;
      })}
    </animated.g>
  );
};
