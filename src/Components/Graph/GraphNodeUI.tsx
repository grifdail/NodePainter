import { animated, SpringValue, useSpring } from "@react-spring/web";
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
import { useState } from "react";
import styled from "styled-components";
import { TypeSelectorUI } from "./TypeSelectorUI";

const AnimatedG = animated(styled.g`
  & > g > rect {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
    touch-action: none;
    fill: white;
    stroke: black;
    stroke-width: 2px;
  }
  &.selected > g > rect {
    stroke: red;
  }
`);

export function GetNodeHeight(node: NodeData, typeDef: NodeDefinition) {
  var inputCount = Object.keys(node.dataInputs).length;
  var outputCount = Object.keys(node.execOutputs).length + Object.keys(node.dataOutputs).length;
  var sumSetting = typeDef.settings.reduce((prev, def) => prev + SettingComponents[def.type].getSize(node.settings[def.id], def, node), 0);
  return 50 + 32 * Math.max(inputCount, outputCount) + 15 + sumSetting + typeDef.settings.length * 2;
}

export type PortNodeCallback = (node: string, port: string, location: PortRole, type: PortType) => void;

export type GraphNodeProps = {
  node: NodeData;
  xy: SpringValue<number[]>;
  isSelected: boolean;
  onMove: (x: number, y: number, definitive: boolean) => void;
  onTap: () => void;
  onClickPort: PortNodeCallback;
};

export const GraphNodeUI = function GraphNode({ node, onClickPort, xy, onMove, isSelected, onTap }: GraphNodeProps) {
  const viewPortScale = useViewbox((state) => state.scale);
  const getNodeTypeDefinition = useTree((state) => state.getNodeTypeDefinition);
  const inputCount = Object.keys(node.dataInputs).length;
  const executeOutputCount = Object.keys(node.execOutputs).length;
  const dataOutputCount = Object.keys(node.dataOutputs).length;
  const outputCount = executeOutputCount + dataOutputCount;
  const definition = getNodeTypeDefinition(node);
  const [dragged, setDragged] = useState(false);

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx, my], tap }) => {
        if (!tap) {
          onMove(mx * viewPortScale, my * viewPortScale, false);
          if (!dragged) {
            setDragged(true);
          }
        }
      },
      onDragEnd: ({ movement: [mx, my] }) => {
        onMove(mx * viewPortScale, my * viewPortScale, true);
        setDragged(false);
      },
    },
    { drag: { filterTaps: true } }
  );

  var setNodeInputValue = useTree((state) => state.setNodeInputValue);
  var setNodeSetting = useTree((state) => state.setNodeSetting);

  var Icon = definition.icon;

  const portHeight = 50 + 32 * Math.max(inputCount, outputCount);
  let settingOffset = portHeight;

  const styles = useSpring({
    from: {
      opacity: 0,
      scale: 0,
      boxShadow: `0px 0px 15px 0px rgba(0, 0, 0, 0.30)`,
      zIndex: 1,
    },
    to: {
      opacity: 1,
      scale: dragged ? 0.95 : 1,
      boxShadow: dragged ? `0px 0px 50px 0px rgba(0, 0, 0, 0.30)` : `0px 5px 15px 0px rgba(0, 0, 0, 0.30)`,
      zIndex: dragged ? -10 : 1,
    },
  });

  return (
    <AnimatedG transform={xy.to((x, y) => `translate(${x}, ${y}) scale(1)`)} className={isSelected ? `selected` : ""}>
      <animated.g style={styles}>
        <rect width="300" height={GetNodeHeight(node, definition)} style={{}} rx="5" {...bind()} onClick={onTap}></rect>
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
          onClick={onTap}
        >
          {definition.label || definition.id}
        </text>
        {definition.availableTypes && <TypeSelectorUI node={node} def={definition} />}
        {!definition.IsUnique && <NodeMenu node={node} def={definition} />}
        {definition.canBeExecuted ? <OutPortView x={0} y={15} key={MainExecuteId} id={MainExecuteId} hideLabel type="execute" onClick={() => onClickPort(node.id, MainExecuteId, "inputExecute", "execute")} location="inputExecute" nodeId={node.id}></OutPortView> : null}
        {Object.entries(node.dataInputs).map(([key, item], i) => {
          return <PortView y={50 + 32 * i} key={key} portData={item} onClick={() => onClickPort(node.id, key, "inputData", item.type)} onValueChange={(v) => setNodeInputValue(node.id, key, v)} location="inputData" nodeId={node.id}></PortView>;
        })}
        {Object.entries(node.execOutputs).map(([id], i) => {
          return <OutPortView x={300} y={50 + 32 * i} key={id} id={id} type="execute" onClick={() => onClickPort(node.id, id, "outputExecute", "execute")} location="outputExecute" nodeId={node.id}></OutPortView>;
        })}
        {Object.values(node.dataOutputs).map((item, i) => {
          return <OutPortView x={300} y={50 + 32 * (i + executeOutputCount)} key={item.id} id={item.id} type={item.type} onClick={() => onClickPort(node.id, item.id, "outputData", item.type)} location="outputData" nodeId={node.id}></OutPortView>;
        })}
        {definition.settings.map((item, i) => {
          var n = <SettingControl y={settingOffset} value={node.settings[item.id]} onChange={(value) => setNodeSetting(node.id, item.id, value)} def={item} key={i} nodeData={node} />;
          settingOffset += getSettingHeight(node.settings[item.id], item, node);
          return n;
        })}
      </animated.g>
    </AnimatedG>
  );
};
