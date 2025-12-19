import { useState } from "react";
import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { PalettePreview } from "../../Settings/ChildComponents/ColorPreview";
import styled from "styled-components";
import { ColorPalette, createColor } from "../../../Types/vectorDataType";
import { PaletteSetting } from "../../Settings/PaletteSetting";
import { NodeData } from "../../../Types/NodeData";
import { Button, InvisibleButton } from "../../Generics/Button";
import { SearchForm } from "../../Generics/SearchForm";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { Input } from "../../StyledComponents/Input";
import { useDialog } from "../../../Hooks/useDialog";

const NodeList = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  overflow: auto;
  gap: var(--padding-small);
`;

const StyledButton = styled.button`
  background: var(--color-background-card);
  color: var(--color-text);
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
                <PalettePreview palette={value} />
                <span className="spacer" />
                <Button onClick={onClick} label="Edit" />
                <Button onClick={onDelete} label="Delete" />
            </StyledButton>
            {isSelected && <PaletteSetting.UI value={value} onChange={onChange} def={{ id: "colorPreset", defaultValue: [], type: "palette" }} node={null as unknown as NodeData} />}
        </>
    );
}

export const SavedPaletteEditor = () => {
    const savedPalettes = usePlayerPref((pref) => pref.palettes);
    const setSavedPalette = usePlayerPref((pref) => pref.savePalette);
    const removePalette = usePlayerPref((pref) => pref.removePalette);
    const [openedPalette, setOpenPalette] = useState<null | string>(null);
    const [searchTermRaw, setSearchTerm] = useState("");
    return (
        <>
            <SearchForm onSubmit={(e) => e.preventDefault()}>
                <span>
                    <IconSearch> </IconSearch>
                    <Input onChange={(e) => setSearchTerm(e.target.value)} value={searchTermRaw} placeholder="filter..." autoFocus />
                </span>
                <InvisibleButton icon={IconPlus}
                    onClick={() => {
                        useDialog.getState().openPrompt((data) => {
                            setSavedPalette(data, [createColor(0, 0, 0, 1), createColor(1, 1, 1, 1)]);
                        });
                    }} />
            </SearchForm>
            <NodeList>
                {Object.entries(savedPalettes)
                    .filter(([key]) => searchTermRaw.trim().length === 0 || key.toLowerCase().includes(searchTermRaw.trim().toLowerCase()))
                    .map(([key, value]) => (
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
        </>
    );
};
