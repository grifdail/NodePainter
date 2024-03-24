import { fromHex, invertColor, toHex } from "../../Utils/colorUtils";
import Sketch from "@uiw/react-color-sketch";

import { Menu } from "@szhsin/react-menu";
import { ColorButton } from "../StyledComponents/ColorButton";
import { usePlayerPref } from "../../Hooks/usePlayerPref";

export function ColorInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  var hex = toHex(value, true);
  const palette = usePlayerPref((state) => state.colorPreset);

  return (
    <Menu
      portal
      menuButton={
        <ColorButton color={hex} oposite={invertColor(hex, true)}>
          {hex}
        </ColorButton>
      }>
      <Sketch
        color={hex}
        presetColors={palette.map((item) => toHex(item))}
        onChange={(color) => {
          onChange(fromHex(color.hexa));
        }}
      />
    </Menu>
  );
}
