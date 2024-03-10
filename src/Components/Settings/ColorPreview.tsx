import styled from "styled-components";
import { MenuItem } from "@szhsin/react-menu";
import { ColorPalette, Gradient } from "../../Nodes/vectorDataType";
import { toHex } from "../../Nodes/colorUtils";

const GradientDiv = styled.div<{ gradient: string }>`
  display: block;
  width: calc(100% - 4px);
  height: 32px;
  border: 2px solid black;
  background: linear-gradient(to right, ${(props) => props.gradient});
  margin-top: 5px;
  margin-bottom: 5px;
  min-width: 100px;
`;
const MenuItemWithPreview = styled(MenuItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;

  & > div {
    width: 100px;
    flex: 0 0 100px;
    height: 20px;
    margin: 0;
  }
`;

export const GradientPreview = ({ gradient }: { gradient: Gradient }) => {
  var str = gradient.map((stop) => `${toHex(stop.color)} ${Math.floor(stop.pos * 100)}%`).join(",");
  return <GradientDiv gradient={str}></GradientDiv>;
};

export const PalettePreview = ({ palette }: { palette: ColorPalette }) => {
  var str = palette.map((color, i) => `${toHex(color)} ${Math.floor((i / palette.length) * 100)}%, ${toHex(color)} ${Math.floor(((i + 1) / palette.length) * 100)}%`).join(", ");
  return <GradientDiv gradient={str}></GradientDiv>;
};

export const MenuItemWithPalettePreview = ({ onClick, id, value }: { onClick: () => void; id: string; value: ColorPalette }) => {
  return (
    <MenuItemWithPreview key={id} onClick={onClick}>
      <span>{id}</span>
      <PalettePreview palette={value} />
    </MenuItemWithPreview>
  );
};
export const MenuItemWithGradientPreview = ({ onClick, id, value }: { onClick: () => void; id: string; value: Gradient }) => {
  return (
    <MenuItemWithPreview key={id} onClick={onClick}>
      <span>{id}</span>
      <GradientPreview gradient={value} />
    </MenuItemWithPreview>
  );
};
