import { animated, SpringValue, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { PortView } from "./PortView";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { NodeMenu } from "./NodeMenu";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { MainExecuteId, NodeDefinition } from "../../Types/NodeDefinition";
import { PortRole } from "../../Types/PortRole";
import { PortType } from "../../Types/PortType";
import { SettingComponents } from "../Settings/SettingsComponents";
import { useViewbox } from "../../Hooks/useViewbox";
import { OutPortView } from "./OutPortView";
import { SettingControl, getSettingHeight } from "./SettingControl";
import { useState } from "react";
import styled from "styled-components";
import { TypeSelectorUI } from "./TypeSelectorUI";
import { useSelection } from "../../Hooks/useSelection";

const AnimatedG = animated(styled.g`
  color: light-dark(var(--color-text-light), var(--color-text-dark));

  & > g > rect {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
    touch-action: none;
    fill: light-dark(var(--color-background-node-light), var(--color-background-node-dark));
    stroke: light-dark(var(--color-border-light), var(--color-border-dark));
    stroke-width: 2px;
  }
  &.selected > g > rect {
    stroke: red;
  }
`);

export function GetNodeHeight(node: NodeData, typeDef: NodeDefinition) {
  var inputCount = Object.keys(node.dataInputs).length;
  var outputCount = Object.keys(node.execOutputs).length + Object.keys(node.dataOutputs).length;
  var sumSetting = typeDef.settings.reduce((prev, def) => prev + SettingComponents[def.type].getSize(node.settings[def.id], def), 0);
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
  const globalSettings = useTree((state) => state.globalSettings);
  const inputCount = Object.keys(node.dataInputs).length;
  const executeOutputCount = Object.keys(node.execOutputs).length;
  const dataOutputCount = Object.keys(node.dataOutputs).length;
  const outputCount = executeOutputCount + dataOutputCount;
  const definition = getNodeTypeDefinition(node);
  const [dragged, setDragged] = useState(false);

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx, my], tap, elapsedTime }) => {
        if (!tap) {
          onMove(mx * viewPortScale, my * viewPortScale, false);
          if (!dragged) {
            setDragged(true);
          }
        } else {
          if (elapsedTime > 1000) {
            useSelection.getState().toggleSetMode(true);
          }
        }
      },
      onDragEnd: ({ movement: [mx, my] }) => {
        onMove(mx * viewPortScale, my * viewPortScale, true);
        setDragged(false);
      },
    },
    { drag: { filterTaps: false } }
  );

  var setNodeInputValue = useTree((state) => state.setNodeInputValue);
  var setNodeSetting = useTree((state) => state.setNodeSetting);
  var setGlobvalSetting = useTree((state) => state.setGlobalSetting);

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
    <AnimatedG transform={xy.to((x, y) => `translate(${x}, ${y}) scale(1)`)} className={isSelected ? `selected` : ""} onContextMenu={(e) => e.stopPropagation()}>
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
          fill="currentColor"
          fontSize="18"
          //stroke="currentColor"
          {...bind()}
          style={{
            touchAction: "none",
          }}
          onClick={onTap}>
          {node.label || definition.label || definition.id}
        </text>
        {definition.availableTypes && <TypeSelectorUI node={node} def={definition} />}
        {!definition.IsUnique && <NodeMenu node={node} def={definition} />}
        {definition.canBeExecuted ? <OutPortView x={0} y={15} key={MainExecuteId} id={MainExecuteId} hideLabel type="execute" onClick={() => onClickPort(node.id, MainExecuteId, "inputExecute", "execute")} location="inputExecute" nodeId={node.id}></OutPortView> : null}
        {Object.entries(node.dataInputs).map(([key, item], i) => {
          return <PortView y={50 + 32 * i} key={key} portData={item} onClick={() => onClickPort(node.id, key, "inputData", item.type)} onValueChange={(v) => setNodeInputValue(node.id, key, v)} location="inputData" nodeId={node.id}></PortView>;
        })}
        {Object.entries(node.execOutputs).map(([id], i) => {
          return <OutPortView x={300} y={50 + 32 * i} key={id} id={id} label={id} type="execute" onClick={() => onClickPort(node.id, id, "outputExecute", "execute")} location="outputExecute" nodeId={node.id}></OutPortView>;
        })}
        {Object.values(node.dataOutputs).map((item, i) => {
          return <OutPortView x={300} y={50 + 32 * (i + executeOutputCount)} key={item.id} id={item.id} label={item.label || item.id} type={item.type} onClick={() => onClickPort(node.id, item.id, "outputData", item.type)} location="outputData" nodeId={node.id}></OutPortView>;
        })}
        {definition.settings.map((item, i) => {
          const isGlobal = item.globalKey !== undefined;

          const value = isGlobal ? (globalSettings[item.globalKey as string] === undefined ? item.defaultValue : globalSettings[item.globalKey as string]) : node.settings[item.id];
          const changeMethod = isGlobal ? (value: any) => setGlobvalSetting(item.globalKey as string, value) : (value: any) => setNodeSetting(node.id, item.id, value);
          var n = <SettingControl y={settingOffset} value={value} onChange={changeMethod} def={item} key={i} nodeData={node} />;
          settingOffset += getSettingHeight(node.settings[item.id], item, node);
          return n;
        })}
      </animated.g>
    </AnimatedG>
  );
};
