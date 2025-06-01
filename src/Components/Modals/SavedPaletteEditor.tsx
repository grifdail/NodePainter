import { useState } from "react";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { PalettePreview } from "../Settings/ColorPreview";
import styled from "styled-components";
import { ColorPalette } from "../../Types/vectorDataType";
import { PaletteSetting } from "../Settings/PaletteSetting";
import { NodeData } from "../../Types/NodeData";
import { Button } from "../Generics/Button";

const NodeList = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  overflow: auto;
  gap: var(--padding-small);
`;

const StyledButton = styled.button`
  background: var(--color-background-card);

  border: none;
  border-radius: var(--border-radius-small);
  padding: 10px;
  box-sizing: 10px;
  //aspect-ratio: 2;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  position: relative;
  cursor: pointer;
  white-space: nowrap;

  & p {
    margin: 0;
    text-align: left;
    color: var(--color-text-minor);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & .spacer {
    flex: 1 1 0px;
  }

  & .fav {
    color: var(--color-text-minor);
  }

  & > svg {
    flex: 0 0 auto;
  }
`;

function SketchButton({ onClick, value, onDelete, name, onChange, isSelected }: { value: ColorPalette; onClick: () => void; onDelete: () => void; onChange: (value: ColorPalette) => void; name: string; isSelected: boolean }) {
  return (
    <>
      <StyledButton>
        <div>{name}</div>
        <PalettePreview palette={value}></PalettePreview>
        <span className="spacer"></span>
        <Button
          onClick={onClick}
          label="Edit"></Button>
        <Button
          onClick={onDelete}
          label="Delete"></Button>
      </StyledButton>
      {isSelected && (
        <PaletteSetting
          value={value}
          onChange={onChange}
          def={{ id: "colorPreset", defaultValue: [], type: "palette" }}
          node={null as unknown as NodeData}></PaletteSetting>
      )}
    </>
  );
}

export const SavedPaletteEditor = () => {
  const savedPalettes = usePlayerPref((pref) => pref.palettes);
  const setSavedPalette = usePlayerPref((pref) => pref.savePalette);
  const removePalette = usePlayerPref((pref) => pref.removePalette);
  const [openedPalette, setOpenPalette] = useState<null | string>(null);
  return (
    <NodeList>
      {Object.entries(savedPalettes).map(([key, value]) => (
        <SketchButton
          onDelete={() => {
            removePalette(key);
          }}
          key={key}
          name={key}
          onChange={(value) => setSavedPalette(key, value)}
          isSelected={openedPalette === key}
          onClick={() => setOpenPalette(openedPalette === key ? null : key)}
          value={value}
        />
      ))}
    </NodeList>
  );
};
