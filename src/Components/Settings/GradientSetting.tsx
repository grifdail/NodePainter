import { SettingDefinition } from "../../Data/NodeDefinition";
import { SettingComponent } from "./SettingsComponents";
import { ColorInput } from "./ColorInput";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { Gradient, GradientStop, createColor, toHex } from "../../Nodes/Color";
import styled from "styled-components";
import { Menu, MenuButton, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { ColorPalette, DefaultPalettes } from "../../Data/Palettes";
import { NumberInput } from "./NumberInput";
import { usePlayerPref } from "../../Hooks/usePlayerPref";

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

    & > input {
      width: 100px;
      flex: 0 0 50px;
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

const GradientDiv = styled.div<{ gradient: string }>`
  display: block;
  width: calc(100% - 4px);
  height: 32px;
  border: 2px solid black;
  background: linear-gradient(to right, ${(props) => props.gradient});
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const GradientPreview = ({ gradient }: { gradient: Gradient }) => {
  var str = gradient.map((stop) => `${toHex(stop.color)} ${Math.floor(stop.pos * 100)}%`).join(",");
  return <GradientDiv gradient={str}></GradientDiv>;
};

export const GradientSetting: SettingComponent = function GradientSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  const list = value as Gradient;

  function onChangeColor(i: number, color: any): void {
    onChange([...list.slice(0, i), { ...list[i], color }, ...list.slice(i + 1, list.length)]);
  }
  function onChangePosition(i: number, pos: any): void {
    var newList = [...list.slice(0, i), { ...list[i], pos: Math.min(1, Math.max(pos, 0)) }, ...list.slice(i + 1, list.length)];
    newList.sort((a: GradientStop, b: GradientStop) => a.pos - b.pos);
    onChange(newList);
  }

  function addNewColor(event: any): void {
    var newList = [...list, { pos: 1, color: createColor() }];
    newList.sort((a: GradientStop, b: GradientStop) => a.pos - b.pos);
    onChange(newList);
  }

  function removeColor(i: number): void {
    if (list.length > 2) {
      onChange([...list.slice(0, i), ...list.slice(i + 1, list.length)]);
    }
  }

  function loadFromPalette(palette: ColorPalette) {
    onChange(
      palette.map((color, i) => ({
        pos: i / (palette.length - 1),
        color,
      }))
    );
  }

  function loadGradient(gradient: Gradient) {
    onChange(structuredClone(gradient));
  }

  const saveGradientToStore = usePlayerPref((pref) => pref.saveGradient);
  const ownGradients = usePlayerPref((pref) => pref.gradient);
  const ownPalettes = usePlayerPref((pref) => pref.palettes);

  function saveGradient() {
    var name = window.prompt("What to name your palette ?", "palette");
    if (name !== null || name !== "") {
      saveGradientToStore(name as string, value);
    }
  }

  return (
    <div>
      <GradientPreview gradient={list} />
      <ColorList>
        {list.map((stop: GradientStop, i: number) => (
          <li key={i}>
            <NumberInput value={stop.pos} onChange={(v) => onChangePosition(i, v)}></NumberInput>
            <ColorInput value={stop.color} onChange={(v) => onChangeColor(i, v)}></ColorInput>
            <button className="delete" onClick={() => removeColor(i)} disabled={list.length <= 1}>
              <IconX />
            </button>
          </li>
        ))}
      </ColorList>

      <ButtonGroup compact>
        <button onClick={addNewColor}>Add</button>
        <Menu
          portal
          menuButton={
            <MenuButton className={"icon"}>
              <IconMenu2></IconMenu2>
            </MenuButton>
          }
        >
          <MenuItem onClick={saveGradient}>Save Gradient</MenuItem>
          <MenuDivider></MenuDivider>
          <SubMenu label="Create from a default palette" overflow="auto">
            {Object.entries(DefaultPalettes).map(([key, value]) => (
              <MenuItem key={key} onClick={() => loadFromPalette(value)}>
                {key}
              </MenuItem>
            ))}
          </SubMenu>
          <SubMenu label="Create from a saved palette" overflow="auto">
            {Object.entries(ownPalettes).map(([key, value]) => (
              <MenuItem key={key} onClick={() => loadFromPalette(value)}>
                {key}
              </MenuItem>
            ))}
          </SubMenu>
          <SubMenu label="Saved Gradient" overflow="auto">
            {Object.entries(ownGradients).map(([key, value]) => (
              <MenuItem key={key} onClick={() => loadGradient(value)}>
                {key}
              </MenuItem>
            ))}
          </SubMenu>
        </Menu>
      </ButtonGroup>
    </div>
  );
};
GradientSetting.getSize = function (value, def): number {
  return 32 * value.length + 70 + 32 + 10;
};
