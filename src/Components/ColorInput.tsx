import { fromHex, invertColor, toHex } from "../Nodes/Color";
import Colorful from "@uiw/react-color-colorful";
import { Menu } from "@szhsin/react-menu";
import { ColorButton } from "./ColorButton";

export function ColorInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  var hex = toHex(value, true);
  return (
    <Menu
      portal
      menuButton={
        <ColorButton color={hex} opositeColor={invertColor(hex, true)}>
          {hex}
        </ColorButton>
      }
    >
      <Colorful
        color={hex}
        onChange={(color) => {
          onChange(fromHex(color.hexa));
        }}
      />
    </Menu>
  );
}
