import { fromHex, invertColor, toHex } from "../../Utils/colorUtils";
import Sketch from "@uiw/react-color-sketch";

import { Menu } from "@szhsin/react-menu";
import { ColorButton } from "../StyledComponents/ColorButton";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { ReactNode } from "react";

export function ColorInput({ onChange, value, children, disabled }: { onChange: (value: any) => void; value: any; children?: ReactNode; disabled?: boolean }) {
  var hex = toHex(value, true);
  const palette = usePlayerPref((state) => state.colorPreset);

  return (
    <Menu
      portal
      aria-disabled={disabled}
      menuButton={
        children != null ? (
          (children as any)
        ) : (
          <ColorButton color={hex} oposite={invertColor(hex, true)} disabled={disabled}>
            {hex}
          </ColorButton>
        )
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
