import { ColorPalette, Color, PaletteCollection } from "../../../Types/vectorDataType";
import { toHex } from "../../../Utils/math/colorUtils";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { MenuItemWithPalettePreview } from "../../Settings/ColorPreview";
import { DefaultPalettes } from "../../../Data/Palettes";
import { DropdownInput } from "../../Generics/Inputs/DropdownInput";

const StyledButton = styled.button<{ color: string }>`
  background: none;
  padding: none;
  border: none;
  cursor: pointer;
  background: ${(props) => props.color};
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  border-radius: var(--border-radius-small);
  border: 1px solid var(--color-border);

  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ColorList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
  flex-direction: row;
  justify-content: space-between;
  padding: var(--padding-small);
  background: var(--color-input-predefined);
  border-radius: var(--border-radius-medium);
  gap: var(--padding-small);
  flex-wrap: wrap;
`;

const PaletteColorSelectorStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-medium);
`;

export function PaletteColorSelector({ onSelectColor, currentColor }: { onChangePalette: (c: ColorPalette) => void; onSelectColor: (c: Color) => void; currentPalette: ColorPalette; currentColor: Color }) {
  const playerPrefPalette = usePlayerPref((state) => state.colorPreset);
  const savedPalettes = usePlayerPref((state) => state.palettes);
  const palettes: PaletteCollection = useMemo(() => ({ default: playerPrefPalette, ...savedPalettes, ...DefaultPalettes }), [playerPrefPalette, savedPalettes]);
  const [currentPaletteId, setCurrentPalette] = useState("default");
  const currentPalette = useMemo(() => palettes[currentPaletteId], [currentPaletteId, palettes]);

  return (
    <PaletteColorSelectorStyled>
      <Fieldset
        label="Palette"
        input={DropdownInput}
        value={currentPaletteId}
        onChange={setCurrentPalette}
        passtrough={{
          options: Object.keys(palettes),
          templateRaw: (value: string, args: any) => (
            <MenuItemWithPalettePreview
              {...args}
              id={value}
              value={palettes[value]}
            />
          ),
        }}></Fieldset>
      <ColorList>
        {currentPalette.map((color) => (
          <StyledButton
            color={toHex(color)}
            onClick={() => onSelectColor(color)}
            key={toHex(color)}
          />
        ))}
      </ColorList>
    </PaletteColorSelectorStyled>
  );
}
