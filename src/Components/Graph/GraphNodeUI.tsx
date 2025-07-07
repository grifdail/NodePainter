import { animated, SpringValue, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { InputPortView } from "./InputPortView";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { NodeMenu } from "./NodeMenu";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { PortRole } from "../../Types/PortRole";
import { PortType } from "../../Types/PortType";
import { useViewbox } from "../../Hooks/useViewbox";
import { OutputPortView } from "./OutputPortView";
import { SettingControl, getSettingHeight } from "./SettingControl";
import { memo, MouseEvent, useState } from "react";
import styled from "styled-components";
import { TypeSelectorUI } from "./TypeSelectorUI";
import { useSelection } from "../../Hooks/useSelection";
import { NODE_HEADER_HEIGHT, NODE_WIDTH, PORT_HEIGHT_WITH_SPACING } from "./NodeVisualConst";
import { GetNodeHeight } from "./GetNodeHeight";
import { camelCaseToWords } from "../../Utils/ui/camelCaseToWords";
import { idToNodeName } from "../../Utils/ui/idToNodeName";

const AnimatedG = animated(styled.g`
  color: var(--color-text);

  & > g > rect.main {
    //box-shadow: 0px 0px 10px #ffffff;
    touch-action: none;
    fill: var(--color-background-card);
    stroke: var(--color-border);
    stroke-width: var(--border-size);
    filter: drop-shadow(var(--card-shadow));
  }
`);

export type PortNodeCallback = (node: string, port: string, location: PortRole, type: PortType) => void;

export type GraphNodeProps = {
  node: NodeData;
  index: number;
  xy: SpringValue<number[]>;
  isSelected: boolean;
  onMove: (nodeId: number, x: number, y: number, definitive: boolean, linear: boolean) => void;
  onTap: (node: NodeData, e: MouseEvent<SVGRectElement>) => void;
  onClickPort: PortNodeCallback;
  viewPortScale: number;
};

export const GraphNodeUI = memo(function GraphNode({ node, onClickPort, xy, onMove, isSelected, onTap, viewPortScale, index }: GraphNodeProps) {
  const getNodeTypeDefinition = useTree((state) => state.getNodeTypeDefinition);
  const globalSettings = useTree((state) => state.globalSettings);
  const inputCount = Object.keys(node.dataInputs).length;
  const outputCount = Object.keys(node.dataOutputs).length;
  const definition = getNodeTypeDefinition(node);
  console.log("redraw node");
  const [dragged, setDragged] = useState(false);
  const bind = useGesture(
    {
      onDrag: ({ movement: [mx, my], tap, elapsedTime, cancel, shiftKey }) => {
        if (!tap) {
          onMove(index, mx * viewPortScale, my * viewPortScale, false, shiftKey);
          if (!dragged) {
            setDragged(true);
          }
        } else {
          if (elapsedTime > 1000) {
            useSelection.getState().toggleSetMode(true);
            useSelection.getState().toggleNode(node.id);
            //cancel();
          }
        }
      },
      onDragEnd: ({ movement: [mx, my], shiftKey }) => {
        onMove(index, mx * viewPortScale, my * viewPortScale, true, shiftKey);
        setDragged(false);
      },
    },
    { drag: { filterTaps: true } }
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
  const height = GetNodeHeight(node, definition);

  return (
    <AnimatedG
      transform={xy.to((x, y) => `translate(${x}, ${y}) scale(1)`)}
      className={isSelected ? `selected` : ""}
      onContextMenu={(e) => e.stopPropagation()}>
      <animated.g style={styles}>
        {isSelected && (
          <rect
            style={{}}
            x="-10"
            y="-10"
            width={NODE_WIDTH + 20}
            height={height + 20}
            fill="transparent"
            strokeDasharray="4 10"
            strokeWidth={5}
            stroke="var(--color-border)"></rect>
        )}
        {definition.availableTypes && (
          <TypeSelectorUI
            node={node}
            def={definition}
          />
        )}

        <rect
          className="main"
          width={NODE_WIDTH}
          height={height}
          style={{}}
          rx="5"
          {...bind()}
          onClick={(e) => onTap(node, e)}></rect>
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
            pointerEvents: "none",
          }}>
          {node.label || definition.label || idToNodeName(definition.id)}
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
});
