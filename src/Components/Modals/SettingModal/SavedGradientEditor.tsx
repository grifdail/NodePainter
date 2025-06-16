import { useState } from "react";
import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { GradientPreview } from "../../Settings/ColorPreview";
import styled from "styled-components";
import { Gradient } from "../../../Types/vectorDataType";
import { NodeData } from "../../../Types/NodeData";
import { Button } from "../../Generics/Button";
import { GradientSetting } from "../../Settings/GradientSetting";
import { SearchForm } from "../../Generics/SearchForm";
import { IconSearch } from "@tabler/icons-react";
import { Input } from "../../StyledComponents/Input";

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

function SketchButton({ onClick, value, onDelete, name, onChange, isSelected }: { value: Gradient; onClick: () => void; onDelete: () => void; onChange: (value: Gradient) => void; name: string; isSelected: boolean }) {
  return (
    <>
      <StyledButton>
        <div>{name}</div>
        <GradientPreview gradient={value}></GradientPreview>
        <span className="spacer"></span>
        <Button
          onClick={onClick}
          label="Edit"></Button>
        <Button
          onClick={onDelete}
          label="Delete"></Button>
      </StyledButton>
      {isSelected && (
        <GradientSetting
          value={value}
          onChange={onChange}
          def={{ id: "colorPreset", defaultValue: [], type: "gradient" }}
          node={null as unknown as NodeData}></GradientSetting>
      )}
    </>
  );
}

export const SavedGradientEditor = () => {
  const savedGradient = usePlayerPref((pref) => pref.gradient);
  const setSavedGradient = usePlayerPref((pref) => pref.saveGradient);
  const removeGradient = usePlayerPref((pref) => pref.removeGradient);
  const [openedGradient, setOpenGradient] = useState<null | string>(null);
  const [searchTermRaw, setSearchTerm] = useState("");

  return (
    <>
      <SearchForm>
        <span>
          <IconSearch> </IconSearch>
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTermRaw}
            placeholder="filter..."
            autoFocus></Input>
        </span>
      </SearchForm>
      <NodeList>
        {Object.entries(savedGradient)
          .filter(([key]) => searchTermRaw.trim().length === 0 || key.toLowerCase().includes(searchTermRaw.trim().toLowerCase()))
          .map(([key, value]) => (
            <SketchButton
              onDelete={() => {
                removeGradient(key);
              }}
              key={key}
              name={key}
              onChange={(value) => setSavedGradient(key, value)}
              isSelected={openedGradient === key}
              onClick={() => setOpenGradient(openedGradient === key ? null : key)}
              value={value}
            />
          ))}
      </NodeList>
    </>
  );
};
