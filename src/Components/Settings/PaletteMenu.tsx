import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { ColorPalette } from "../../Types/vectorDataType";
import { IconMenu2 } from "@tabler/icons-react";
import { DefaultPalettes } from "../../Data/Palettes";
import { MenuItemWithPalettePreview } from "./ColorPreview";
import { Button } from "../Generics/Button";

export function PaletteMenu({ onLoaded, currentPalette }: { onLoaded: (arg: ColorPalette) => void; currentPalette: ColorPalette }) {
  const savedPalettes = usePlayerPref((state) => state.palettes);
  const setSavedPalette = usePlayerPref((state) => state.savePalette);

  function savePalette() {
    var name = window.prompt("What to name your palette ?", "palette");
    if (name !== null || name !== "") {
      setSavedPalette(name as string, currentPalette);
    }
  }

  return (
    <Menu portal menuButton={<Button icon={IconMenu2}></Button>}>
      <MenuItem onClick={savePalette}>Save Palette</MenuItem>
      <MenuDivider></MenuDivider>
      <SubMenu label="Create from default palette" overflow="auto">
        {Object.entries(DefaultPalettes).map(([key, value]) => (
          <MenuItemWithPalettePreview key={key} id={key} value={value} onClick={() => onLoaded(value)} />
        ))}
      </SubMenu>
      <SubMenu label="Create from saved palette" overflow="auto">
        {Object.entries(savedPalettes).map(([key, value]) => (
          <MenuItemWithPalettePreview key={key} id={key} value={value} onClick={() => onLoaded(value)} />
        ))}
      </SubMenu>
    </Menu>
  );
}
