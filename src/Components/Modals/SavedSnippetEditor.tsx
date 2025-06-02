import { useState } from "react";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { GradientPreview } from "../Settings/ColorPreview";
import styled from "styled-components";
import { Gradient } from "../../Types/vectorDataType";
import { NodeData } from "../../Types/NodeData";
import { Button } from "../Generics/Button";
import { GradientSetting } from "../Settings/GradientSetting";
import { SearchForm } from "./SearchForm";
import { IconSearch } from "@tabler/icons-react";
import { Input } from "../StyledComponents/Input";
import { Snippet } from "../../Utils/snippets";

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

function snippetToText(snippet: Snippet): string {
  return snippet.nodes.map((item) => item.type).join(", ");
}

function SketchButton({ value, onDelete }: { value: Snippet; onDelete: () => void }) {
  return (
    <>
      <StyledButton>
        <div>{value.name}</div>
        <p>{snippetToText(value)}</p>
        <span className="spacer"></span>

        <Button
          onClick={onDelete}
          label="Delete"></Button>
      </StyledButton>
    </>
  );
}

export const SavedSnippetEditor = () => {
  const savedSnippet = usePlayerPref((pref) => pref.snippets);
  //const setSavedGradient = usePlayerPref((pref) => pref.saveGradient);
  const removeSnippet = usePlayerPref((pref) => pref.removeSnippet);
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
        {Object.entries(savedSnippet)
          .filter(([key]) => searchTermRaw.trim().length === 0 || key.toLowerCase().includes(searchTermRaw.trim().toLowerCase()))
          .map(([key, value]) => (
            <SketchButton
              onDelete={() => {
                removeSnippet(key);
              }}
              key={key}
              value={value}
            />
          ))}
      </NodeList>
    </>
  );
};
