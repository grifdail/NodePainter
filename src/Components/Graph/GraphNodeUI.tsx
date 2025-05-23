import { animated, SpringValue, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { InputPortView } from "./InputPortView";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { NodeMenu } from "./NodeMenu";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortRole } from "../../Types/PortRole";
import { PortType } from "../../Types/PortType";
import { SettingComponents } from "../Settings/SettingsComponents";
import { useViewbox } from "../../Hooks/useViewbox";
import { OutputPortView } from "./OutputPortView";
import { SettingControl, getSettingHeight } from "./SettingControl";
import { useState } from "react";
import styled from "styled-components";
import { TypeSelectorUI } from "./TypeSelectorUI";
import { useSelection } from "../../Hooks/useSelection";
import { NODE_FOOTER_HEIGHT, NODE_HEADER_HEIGHT, NODE_WIDTH, PORT_HEIGHT_WITH_SPACING } from "./NodeVisualConst";

const AnimatedG = animated(styled.g`
  color: var(--color-text);

  & > g > rect {
    //box-shadow: 0px 0px 10px #ffffff;
    touch-action: none;
    fill: var(--color-background-card);
    stroke: var(--color-border);
    stroke-width: var(--border-size);
    filter: drop-shadow(var(--card-shadow));
  }
  &.selected > g > rect {
    stroke: red;
  }
`);

export function GetNodeHeight(node: NodeData, typeDef: NodeDefinition) {
  var inputCount = Object.keys(node.dataInputs).length;
  var outputCount = Object.keys(node.dataOutputs).length;
  var sumSetting = typeDef.settings.reduce((prev, def) => prev + SettingComponents[def.type].getSize(node.settings[def.id], def as any, node), 0);
  return NODE_HEADER_HEIGHT + PORT_HEIGHT_WITH_SPACING * (inputCount + outputCount) + NODE_FOOTER_HEIGHT + sumSetting + typeDef.settings.length * 2;
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
  const outputCount = Object.keys(node.dataOutputs).length;
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

  const portHeight = NODE_HEADER_HEIGHT + PORT_HEIGHT_WITH_SPACING * (inputCount + outputCount);
  let settingOffset = portHeight;

  const styles = useSpring({
    from: {
      opacity: 0,
      transform: `translate(0, 0)`,
      zIndex: 1,
      filter: `drop-shadow(0 0px 0px rgba(73, 73, 73, 0.5))`,
    },
    to: {
      opacity: 1,
      transform: `translate(0px, ${dragged ? -10 : 0}px)`,
      zIndex: dragged ? -10 : 1,
      filter: dragged ? `drop-shadow(0 10px 10px rgba(59, 59, 59, 0.5))` : `drop-shadow(0 0px 0px rgba(57, 57, 57, 0.5))`,
    },
  });

  return (
    <AnimatedG
      transform={xy.to((x, y) => `translate(${x}, ${y}) scale(1)`)}
      className={isSelected ? `selected` : ""}
      onContextMenu={(e) => e.stopPropagation()}>
      <animated.g style={styles}>
        {definition.availableTypes && (
          <TypeSelectorUI
            node={node}
            def={definition}
          />
        )}
        <rect
          width={NODE_WIDTH}
          height={GetNodeHeight(node, definition)}
          style={{}}
          rx="5"
          {...bind()}
          onClick={onTap}></rect>
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

        {!definition.IsUnique && (
          <NodeMenu
            node={node}
            def={definition}
          />
        )}
        {Object.entries(node.dataInputs).map(([key, item], i) => {
          return (
            <InputPortView
              y={NODE_HEADER_HEIGHT + PORT_HEIGHT_WITH_SPACING * (i + outputCount)}
              key={key}
              portData={item}
              onClick={() => onClickPort(node.id, key, "input", item.type)}
              onValueChange={(v) => setNodeInputValue(node.id, key, v)}
              nodeId={node.id}></InputPortView>
          );
        })}
        {Object.values(node.dataOutputs).map((item, i) => {
          return (
            <OutputPortView
              x={NODE_WIDTH}
              y={NODE_HEADER_HEIGHT + PORT_HEIGHT_WITH_SPACING * i}
              key={item.id}
              id={item.id}
              label={item.label || item.id}
              type={item.type}
              onClick={() => onClickPort(node.id, item.id, "output", item.type)}
              nodeId={node.id}></OutputPortView>
          );
        })}
        {definition.settings.map((item, i) => {
          const isGlobal = item.globalKey !== undefined;

          const value = isGlobal ? (globalSettings[item.globalKey as string] === undefined && "defaultValue" in item ? item.defaultValue : globalSettings[item.globalKey as string]) : node.settings[item.id];
          const changeMethod = isGlobal ? (value: any) => setGlobvalSetting(item.globalKey as string, value) : (value: any) => setNodeSetting(node.id, item.id, value);
          var n = (
            <SettingControl
              y={settingOffset}
              value={value}
              onChange={changeMethod}
              def={item}
              key={i}
              nodeData={node}
            />
          );
          settingOffset += getSettingHeight(node.settings[item.id], item, node);
          return n;
        })}
      </animated.g>
    </AnimatedG>
  );
};
