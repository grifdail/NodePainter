import { useState } from "react";
import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { PalettePreview } from "../../Settings/ChildComponents/ColorPreview";
import styled from "styled-components";
import { ColorPairing, ColorPalette, createColor } from "../../../Types/vectorDataType";
import { PaletteSetting } from "../../Settings/PaletteSetting";
import { NodeData } from "../../../Types/NodeData";
import { Button, InvisibleButton } from "../../Generics/Button";
import { SearchForm } from "../../Generics/SearchForm";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { Input } from "../../StyledComponents/Input";
import { useDialog } from "../../../Hooks/useDialog";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { ColorPairingSetting } from "../../Settings/ColorPairingSetting";
import { Black, White } from "../../../Utils/math/colorUtils";
const NodeList = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  overflow: auto;
  gap: var(--padding-small);
  container-type: inline-size;
`;

const StyledButton = styled.div`
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

@container (width < 500px) {
  & {
    flex-direction: column;
    align-items: stretch;

    & ${ButtonGroup} {
        justify-content: stretch;

        & > button {
            flex: 1 1 auto;
        }
    }
  }
}

  & .label {
    margin: 0;
    text-align: left;
    color: var(--color-text-minor);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    width: 120px;


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


function PairingEditor({ onClick, value, onDelete, name, onChange, isSelected }: { value: ColorPairing; onClick: () => void; onDelete: () => void; onChange: (value: ColorPairing) => void; name: string; isSelected: boolean }) {
    return (
        <>
            <StyledButton>
                <div className="label" data-tooltip-id="tooltip"
                    data-tooltip-content={name}>{name}</div>
                <PalettePreview palette={value} />
                <span className="spacer" />
                <ButtonGroup>
                    <Button onClick={onClick} label="Edit" />
                    <Button onClick={onDelete} label="Delete" />
                </ButtonGroup>
            </StyledButton>
            {isSelected && <ColorPairingSetting.UI value={value} onChange={onChange} def={{ id: "colorPreset", defaultValue: [Black(), White()], type: "color-pairing" }} node={null as unknown as NodeData} />}
        </>
    );
}

export const SavedPairingEditor = () => {
    const savedPairings = usePlayerPref((pref) => pref.colorPairing);
    const setSavedPairing = usePlayerPref((pref) => pref.savePairing);
    const removePairing = usePlayerPref((pref) => pref.removePairing);
    const [openedPairing, setOpenPairing] = useState<null | string>(null);
    const [searchTermRaw, setSearchTerm] = useState("");
    const onClickAdd = () => {
        useDialog.getState().openPrompt((data) => {
            setSavedPairing(data, [createColor(0, 0, 0, 1), createColor(1, 1, 1, 1)]);
        });
    };
    return (
        <>
            <SearchForm onSubmit={(e) => e.preventDefault()}>
                <span>
                    <IconSearch> </IconSearch>
                    <Input onChange={(e) => setSearchTerm(e.target.value)} value={searchTermRaw} placeholder="filter..." autoFocus />
                </span>
                <InvisibleButton icon={IconPlus}
                    onClick={onClickAdd} />
            </SearchForm>
            <NodeList>
                {Object.entries(savedPairings)
                    .filter(([key]) => searchTermRaw.trim().length === 0 || key.toLowerCase().includes(searchTermRaw.trim().toLowerCase()))
                    .map(([key, value]) => (
                        <PairingEditor
                            onDelete={() => {
                                removePairing(key);
                            }}
                            key={key}
                            name={key}
                            onChange={(value) => setSavedPairing(key, value)}
                            isSelected={openedPairing === key}
                            onClick={() => setOpenPairing(openedPairing === key ? null : key)}
                            value={value}
                        />
                    ))}
            </NodeList>
            <ButtonGroup $forceStretch vertical>
                <Button label="Add" onClick={onClickAdd} icon={IconPlus} />
            </ButtonGroup>
        </>
    );
};
