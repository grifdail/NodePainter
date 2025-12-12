import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { ColorPalette } from "../../Types/vectorDataType";
import { IconMenu2 } from "@tabler/icons-react";
import { DefaultPalettes } from "../../Data/Palettes";
import { MenuItemWithPalettePreview } from "./ColorPreview";
import { Button } from "../Generics/Button";
import { ReactElement } from "react";
import { useDialog } from "../../Hooks/useDialog";
import { TextInput } from "../Generics/Inputs/TextInput";

export function PaletteMenu({ onLoaded, currentPalette, button, children }: { onLoaded: (arg: ColorPalette) => void; currentPalette: ColorPalette; button?: ReactElement; children?: ReactElement }) {
  const savedPalettes = usePlayerPref((state) => state.palettes);
  const setSavedPalette = usePlayerPref((state) => state.savePalette);

  function savePalette() {
    useDialog.getState().open({
      callback: function (button: any, fieldResult: { [key: string]: any } | undefined): void {
        if (button === "confirm" && fieldResult && fieldResult.name !== null && fieldResult.name !== "") {
          setSavedPalette(fieldResult.name as string, currentPalette);
        }
      },
      buttons: [
        {
          key: "cancel",
          label: "cancel",
          style: "invisible",
        },
        {
          key: "confirm",
          label: "confirm",
          style: "normal",
        },
      ],
      fields: [
        {
          key: "name",
          label: "name",
          input: TextInput,
        },
      ],
    });
  }

  return (
    <Menu
      align="end"
      portal
      menuButton={button != null ? button : <Button icon={IconMenu2}></Button>}>
      <MenuItem onClick={savePalette}>Save Palette</MenuItem>
      <MenuDivider></MenuDivider>

      <SubMenu
        label="Create from saved palette"
        overflow="auto">
        {Object.entries(savedPalettes).map(([key, value]) => (
          <MenuItemWithPalettePreview
            key={key}
            id={key}
            value={value}
            onClick={() => onLoaded(value)}
          />
        ))}
      </SubMenu>
      {children && <MenuDivider />}
      {children}
    </Menu>
  );
}
