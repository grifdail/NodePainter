import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import styled from "styled-components";
import { GraphAreaSettingDefinition, PathSettingDefinition } from "../../Types/SettingDefinition";
import { PathData } from "../../Types/PathData";
import { MouseEvent, useCallback, useState } from "react";
import { current } from "immer";
import { Fieldset } from "../StyledComponents/Fieldset";
import { BoolInput } from "../Generics/Inputs/BoolInput";
import { GraphArea } from "../../Types/GraphArea";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { Button } from "../Generics/Button";
import { ColorInput } from "../Generics/Inputs/ColorInput";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { relative } from "path";
import { TextInput } from "../Generics/Inputs/TextInput";
import { NODE_HEADER_HEIGHT, NODE_WIDTH } from "../Graph/NodeVisualConst";
import { useTree } from "../../Hooks/useTree";

export const GraphAreaSetting: SettingComponent<GraphAreaSettingDefinition> = function GraphAreaSetting({ onChange, value, def, node }: SettingProps<GraphAreaSettingDefinition>) {
  const area = value as GraphArea;

  const setWidth = useCallback(
    (value: number) => {
      onChange({ ...area, width: value, x: -value, relative: true });
    },
    [area]
  );
  const setHeight = useCallback(
    (value: number) => {
      onChange({ ...area, height: value, y: -value, relative: true });
    },
    [area]
  );
  const setColor = useCallback(
    (color: any) => {
      onChange({ ...area, color: color });
    },
    [area]
  );
  const setRelative = useCallback(
    (value: any) => {
      const n = useTree.getState().getNode(node.id);
      console.log(area.x, n.positionX);
      if (value) {
        onChange({ ...area, relative: value, x: area.x - (n.positionX + NODE_WIDTH * 0.5), y: area.y - (n.positionY + NODE_HEADER_HEIGHT * 0.5) });
      } else {
        onChange({ ...area, relative: value, x: n.positionX + NODE_WIDTH * 0.5 + area.x, y: n.positionY + NODE_HEADER_HEIGHT * 0.5 + area.y });
      }
    },
    [area]
  );
  const setName = useCallback(
    (value: any) => {
      onChange({ ...area, name: value });
    },
    [area]
  );
  return (
    <div>
      <Fieldset
        label={"Name"}
        input={TextInput}
        onChange={setName}
        value={area.name}></Fieldset>
      <Fieldset
        label={"Color"}
        input={ColorInput}
        onChange={setColor}
        value={area.color}></Fieldset>
      <Fieldset
        label={"Width"}
        input={NumberInput}
        onChange={setWidth}
        value={area.width}></Fieldset>
      <Fieldset
        label={"Height"}
        input={NumberInput}
        onChange={setHeight}
        value={area.height}></Fieldset>
      <Fieldset
        label={"Relative"}
        tooltip="Is the area relative to the position of this node"
        input={BoolInput}
        onChange={setRelative}
        value={area.relative}></Fieldset>
    </div>
  );
};
GraphAreaSetting.getSize = function (value, def): number {
  return 150;
};
