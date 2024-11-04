import { IconMenu2 } from "@tabler/icons-react";
import { ColorPalette, Color } from "../../Types/vectorDataType";
import { toHex } from "../../Utils/colorUtils";
import { VectorSquareDistance } from "../../Utils/vectorUtils";
import { Key, useState } from "react";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import { PaintingToolbar } from "../StyledComponents/PaintingToolbar";
import { PaletteMenu } from "../Settings/PaletteMenu";
import styled from "styled-components";

const StyledButton = styled.button<{ color: string }>`
  background: none;
  padding: none;
  border: none;
  cursor: pointer;
  background: ${(props) => props.color};
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  border-radius: 15px;
  border: 1px solid var(--color-border);

  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const IconButton = styled.button`
  background: none;
  padding: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
`;

function ColorButton({ onClick, index, color, key, onDelete, onMove }: { onClick: (c: Color) => void; index: number; color: Color; key: Key; onDelete: (index: number) => void; onMove: (index: number, dir: number) => void }) {
  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  return (
    <StyledButton
      color={toHex(color)}
      onClick={() => onClick(color)}
      onContextMenu={(e) => {
        if (typeof document.hasFocus === "function" && !document.hasFocus()) return;

        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        setOpen(true);
      }}>
      <ControlledMenu anchorPoint={anchorPoint} state={isOpen ? "open" : "closed"} direction="right" onClose={() => setOpen(false)}>
        <MenuItem onClick={() => onDelete(index)}>Delete</MenuItem>
        <MenuItem onClick={() => onMove(index, -1)}>Move Left</MenuItem>
        <MenuItem onClick={() => onMove(index, 1)}>Move Right</MenuItem>
      </ControlledMenu>
    </StyledButton>
  );
}

export function PaletteColorSelector({ onChangePalette, onSelectColor, currentPalette, currentColor }: { onChangePalette: (c: ColorPalette) => void; onSelectColor: (c: Color) => void; currentPalette: ColorPalette; currentColor: Color }) {
  var isCurrentSelectorInPalette = currentPalette.some((color) => VectorSquareDistance(color, currentColor) <= Number.EPSILON);

  function addCurrentColor() {
    if (isCurrentSelectorInPalette) {
      return;
    }
    var palette = currentPalette.concat([currentColor]);
    onChangePalette(palette);
  }

  function onDelete(index: number): void {
    var palette = Array.from(currentPalette);
    palette.splice(index, 1);
    onChangePalette(palette);
  }

  function onMove(index: number, dir: number): void {
    if (index === 0 && dir < 0) {
      return;
    }
    if (index === currentPalette.length - 1 && dir > 0) {
      return;
    }
    var palette = Array.from(currentPalette);
    const color = palette[index];
    palette.splice(index, 1);
    var newIndex = dir < 0 ? index - 1 : index + 1;
    palette.splice(newIndex, 0, color);
    onChangePalette(palette);
  }

  return (
    <PaintingToolbar className="color">
      {currentPalette.map((color, index) => (
        <ColorButton onClick={onSelectColor} color={color} key={index} index={index} onDelete={onDelete} onMove={onMove}></ColorButton>
      ))}
      <span></span>
      <PaletteMenu
        onLoaded={onChangePalette}
        currentPalette={currentPalette}
        button={
          <IconButton>
            <IconMenu2 />
          </IconButton>
        }>
        <MenuItem onClick={addCurrentColor}>Add current color to the palette </MenuItem>
      </PaletteMenu>
    </PaintingToolbar>
  );
}
