import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconAdjustments, IconArrowDown, IconArrowUp, IconTrash } from "@tabler/icons-react";
import { createColor } from "../../Types/vectorDataType";
import { PaletteMenu } from "./ChildComponents/PaletteMenu";
import { Button } from "../Generics/Button";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useListManipulator } from "../../Hooks/useListManipulator";
import { ColorInput } from "../Generics/Inputs/ColorInput";
import { PaletteSettingDefinition } from "../../Types/SettingDefinition";

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

export const PaletteSetting: SettingComponent<PaletteSettingDefinition> = {
    UI: function ({ onChange, value }: SettingProps<PaletteSettingDefinition>) {
        var list = value as Array<any>;

        const { change: onChangeColor, remove: removeColor, move, addNew: addNewColor } = useListManipulator(list, onChange, createColor, false);

        return (
            <div>
                <ColorList>
                    {list.map((color: any, i: number) => (
                        <li key={i}>
                            <span>{i}</span>
                            <ColorInput
                                value={color}
                                onChange={(v) => onChangeColor(i, v)}></ColorInput>
                            <Menu
                                menuButton={
                                    <button className="delete">
                                        <IconAdjustments />
                                    </button>
                                }>
                                <MenuItem
                                    onClick={() => removeColor(i)}
                                    disabled={list.length <= 1}>
                                    <IconTrash></IconTrash> Delete
                                </MenuItem>
                                <MenuItem
                                    onClick={() => move(i, "up")}
                                    disabled={i === 0}>
                                    <IconArrowUp></IconArrowUp>Move Up
                                </MenuItem>
                                <MenuItem
                                    onClick={() => move(i, "down")}
                                    disabled={i === list.length - 1}>
                                    <IconArrowDown></IconArrowDown> Move Down
                                </MenuItem>
                            </Menu>
                        </li>
                    ))}
                </ColorList>

                <ButtonGroup>
                    <Button
                        label="Add"
                        onClick={() => addNewColor()}
                    />
                    <PaletteMenu
                        onLoaded={(value) => onChange(value)}
                        currentPalette={list}></PaletteMenu>
                </ButtonGroup>
            </div>
        );
    },
    getSize: function (value, def): number {
        return 32 * value.length + 70;
    }
};
