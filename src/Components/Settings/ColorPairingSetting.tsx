import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconAdjustments, IconArrowDown, IconArrowUp, IconTrash } from "@tabler/icons-react";
import { ColorPairing, createColor } from "../../Types/vectorDataType";
import { PaletteMenu } from "./ChildComponents/PaletteMenu";
import { Button } from "../Generics/Button";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useListManipulator } from "../../Hooks/useListManipulator";
import { ColorInput } from "../Generics/Inputs/ColorInput";
import { ColorPairingSettingDefinition, PaletteSettingDefinition } from "../../Types/SettingDefinition";
import { ColorPairingMenu } from "./ChildComponents/PairingMenu";

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

export const ColorPairingSetting: SettingComponent<ColorPairingSettingDefinition> = {
    UI: function ({ onChange, value }: SettingProps<ColorPairingSettingDefinition>) {
        var list = value as ColorPairing;



        return (
            <div>
                <ColorList>
                    <ColorInput
                        value={value[0]}
                        onChange={(v) => onChange([v, value[1]])}></ColorInput>
                    <ColorInput
                        value={value[1]}
                        onChange={(v) => onChange([value[0], v])}></ColorInput>

                </ColorList>

                <ButtonGroup>

                    <ColorPairingMenu
                        onLoaded={(value) => onChange(value)}
                        currentPalette={list}></ColorPairingMenu>
                </ButtonGroup>
            </div>
        );
    },
    getSize: function (value, def): number {
        return 32 * value.length + 70;
    }
};
