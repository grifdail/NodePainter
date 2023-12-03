import { SettingDefinition } from "../Data/NodeDefinition";
import { SettingComponent } from "./SettingsComponents";
import { ColorInput } from "./ColorInput";
import { ButtonGroup } from "./StyledComponents/ButtonGroup";
import { createColor } from "../Nodes/Color";
import styled from "styled-components";
import { Menu, MenuButton, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ColorPalette, DefaultPalettes, PaletteCollection } from "../Data/Palettes";

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

export const PaletteSetting: SettingComponent = function PaletteSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  var list = value as Array<any>;
  function onChangeColor(i: number, v: any): void {
    onChange([...list.slice(0, i), v, ...list.slice(i + 1, list.length)]);
  }

  function addNewColor(event: any): void {
    onChange([...list, createColor()]);
  }

  function removeColor(i: number): void {
    if (list.length > 1) {
      onChange([...list.slice(0, i), ...list.slice(i + 1, list.length)]);
    }
  }

  function loadPalette(palette: ColorPalette) {
    onChange([...palette]);
  }

  function savePalette() {
    var name = window.prompt("What to name your palette ?", "palette");
    if (name !== null || name !== "") {
      setSavedPalette({
        ...savedPalette,
        [name as string]: value,
      });
    }
  }

  var [savedPalette, setSavedPalette] = useLocalStorage("nodepainter-saved-palette", {} as PaletteCollection);

  return (
    <div>
      <ColorList>
        {list.map((color: any, i: number) => (
          <li key={i}>
            <span>{i}</span>
            <ColorInput value={color} onChange={(v) => onChangeColor(i, v)}></ColorInput>
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
          <MenuItem onClick={savePalette}>Save Palette</MenuItem>
          <MenuDivider></MenuDivider>
          <SubMenu label="defaultPalette">
            {Object.entries(DefaultPalettes).map(([key, value]) => (
              <MenuItem key={key} onClick={() => loadPalette(value)}>
                {key}
              </MenuItem>
            ))}
          </SubMenu>
          {Object.entries(savedPalette).map(([key, value]) => (
            <MenuItem key={key} onClick={() => loadPalette(value)}>
              {key}
            </MenuItem>
          ))}
        </Menu>
      </ButtonGroup>
    </div>
  );
};
PaletteSetting.getSize = function (value, def): number {
  return 32 * value.length + 70;
};
