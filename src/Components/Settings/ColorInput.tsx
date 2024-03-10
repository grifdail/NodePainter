import { fromHex, invertColor, toHex } from "../../Data/colorUtils";
import Sketch from "@uiw/react-color-sketch";

import { Menu } from "@szhsin/react-menu";
import { ColorButton } from "../StyledComponents/ColorButton";

const defaultPalette = ["#000000FF", "#1D2B53FF", "#7E2553FF", "#008751FF", "#AB5236FF", "#5F574FFF", "#C2C3C7FF", "#FFF1E8FF", "#FF004DFF", "#FFA300FF", "#FFEC27FF", "#00E436FF", "#29ADFFFF", "#83769CFF", "#FF77A8FF", "#FFCCAAFF"];

export function ColorInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  var hex = toHex(value, true);

  return (
    <Menu
      portal
      menuButton={
        <ColorButton color={hex} oposite={invertColor(hex, true)}>
          {hex}
        </ColorButton>
      }
    >
      <Sketch
        color={hex}
        presetColors={defaultPalette}
        onChange={(color) => {
          onChange(fromHex(color.hexa));
        }}
      />
    </Menu>
  );
}
