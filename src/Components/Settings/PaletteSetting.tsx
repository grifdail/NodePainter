import { SettingDefinition } from "../../Types/SettingDefinition";
import { SettingComponent } from "./SettingsComponents";
import { ColorInput } from "../Inputs/ColorInput";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconAdjustments, IconArrowDown, IconArrowUp, IconTrash } from "@tabler/icons-react";
import { createColor } from "../../Types/vectorDataType";
import { PaletteMenu } from "./PaletteMenu";
import { Button } from "../Generics/Button";
import { Menu, MenuItem } from "@szhsin/react-menu";

const ColorList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: stretch;
  justify-content: start;
  padding: 0;
  margin: 0;

  & > li {
    padding: 0;
    margin: 0;
    height: 30px;
    flex: 0 0 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    gap: 2px;

    & > span {
      width: 50px;
      flex: 0 0 30px;
      text-align: center;
    }

    & > button {
      flex: 1 0 50px;
    }

    & > button.delete {
      flex: 0 0 30px;
      border: none;
      cursor: pointer;
    }
  }
`;

export const PaletteSetting: SettingComponent = function PaletteSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  var list = value as Array<any>;

  function onChangeColor(i: number, v: any): void {
    onChange([...list.slice(0, i), v, ...list.slice(i + 1, list.length)]);
  }

  function addNewColor(): void {
    onChange([...list, createColor()]);
  }

  function removeColor(i: number): void {
    if (list.length > 1) {
      onChange([...list.slice(0, i), ...list.slice(i + 1, list.length)]);
    }
  }

  function move(i: number, direction: "up" | "down") {
    if (direction === "up") {
      console.log([...list.slice(0, i - 1), list[i], list[i - 1], ...list.slice(i + 1, list.length)]);
      onChange([...list.slice(0, i - 1), list[i], list[i - 1], ...list.slice(i + 1, list.length)]);
    } else {
      onChange([...list.slice(0, i), list[i + 1], list[i], ...list.slice(i + 2, list.length)]);
    }
  }

  return (
    <div>
      <ColorList>
        {list.map((color: any, i: number) => (
          <li key={i}>
            <span>{i}</span>
            <ColorInput value={color} onChange={(v) => onChangeColor(i, v)}></ColorInput>
            <Menu
              menuButton={
                <button className="delete">
                  <IconAdjustments />
                </button>
              }>
              <MenuItem onClick={() => removeColor(i)} disabled={list.length <= 1}>
                <IconTrash></IconTrash> Delete
              </MenuItem>
              <MenuItem onClick={() => move(i, "up")} disabled={i === 0}>
                <IconArrowUp></IconArrowUp>Move Up
              </MenuItem>
              <MenuItem onClick={() => move(i, "down")} disabled={i === list.length - 1}>
                <IconArrowDown></IconArrowDown> Move Down
              </MenuItem>
            </Menu>
          </li>
        ))}
      </ColorList>

      <ButtonGroup>
        <Button label="Add" onClick={addNewColor} />
        <PaletteMenu onLoaded={(value) => onChange(value)} currentPalette={list}></PaletteMenu>
      </ButtonGroup>
    </div>
  );
};
PaletteSetting.getSize = function (value, def): number {
  return 32 * value.length + 70;
};
