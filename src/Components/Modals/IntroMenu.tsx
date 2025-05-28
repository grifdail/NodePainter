import { Icon, IconDeviceFloppy, IconFile, IconFilePlus, IconInfoCircle, IconPlayerPlay, IconReload, IconSearch, IconUpload, IconX } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../Modal";
import { Button } from "../Generics/Button";
import { useAllSavedSketch } from "../../Hooks/db";
import { useDialog } from "../../Hooks/useDialog";
import { Templates } from "../../Data/templates";
import { useTree } from "../../Hooks/useTree";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { SketchTemplate } from "../../Types/SketchTemplate";
import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import { SearchForm } from "./SearchForm";
import { Input } from "../StyledComponents/Input";
import { CategoryButton, TagList } from "./CategoryButton";
import { useRouter } from "../../Hooks/useRouter";
import { Routes } from "../../Types/Routes";
import { getLastSavedSketch } from "../../Hooks/lastSavedSketch";

const MY_SAVED_SKETCH = "My Saved Sketch";

const MainDiv = styled.div`
  max-width: 100%;

  display: flex;
  align-items: stretch;
  gap: var(--padding-large);
  flex-direction: column;

  & div.files {
    display: flex;
    padding: 0;
    margin: 0;
    align-items: stretch;
    justify-content: stretch;
    width: 100%;
    height: 500px;
    align-content: stretch;
    align-self: stretch;
    flex-grow: 1;
    flex-direction: column;
    gap: var(--padding-large);
    padding-top: var(--padding-large);
  }
`;

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

const IconPerTypes: Record<string, Icon> = {
  default: IconFile,
  Templates: IconFile,
  [MY_SAVED_SKETCH]: IconDeviceFloppy,
  Examples: IconPlayerPlay,
};

type SketchElement = { content: () => Promise<SketchTemplate>; name: string; category: string };

const TagRegex = /tag:(\w+)/gi;

type SearchTermData = {
  tags: string[];
  name: string;
};

const parseSearchTerm = (raw: string): SearchTermData => {
  const base = raw.trim().toLowerCase();
  const resultTag = Array.from(base.matchAll(TagRegex));
  return {
    name: base.replaceAll(TagRegex, "").trim(),
    tags: resultTag.map((r) => r[1]),
  };
};

function toCategoryId(cat: string) {
  return cat.toLowerCase().replaceAll(" ", "_");
}

export const DeleteButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  transition: opacity 0.3s;

  opacity: 0%;

  &:hover {
    opacity: 100%;
  }

  button:hover & {
    opacity: 50%;
  }
`;

function SketchButton({ onClick, item, onDelete }: { onClick: MouseEventHandler<Element>; onDelete: MouseEventHandler<Element> | undefined; item: SketchElement }) {
  var Icon = IconPerTypes[item.category] === undefined ? IconPerTypes.default : IconPerTypes[item.category];
  return (
    <StyledButton onClick={onClick}>
      <Icon></Icon>
      <div>{item.name}</div>
      <p>{item.category}</p>
      <span className="spacer"></span>
      {onDelete && (
        <DeleteButton onClick={onDelete}>
          <IconX></IconX>
        </DeleteButton>
      )}
    </StyledButton>
  );
}

export function IntroMenuModal({ close }: { close: () => void }) {
  const loadSketch = useLoadSketch(close);
  const withConfirm = useWithConfirm();
  const [allItem, categories, deleteSavedSketch] = useSketchCollection();
  const [searchTermRaw, setSearchTerm] = useState("");
  const searchTerm = useMemo(() => parseSearchTerm(searchTermRaw), [searchTermRaw]);
  const openModal = useRouter((state) => state.open);
  const lastSavedSketch = getLastSavedSketch();
  const toggleTag = useToggleTag(searchTermRaw, setSearchTerm);
  const filteredList = useMemo(() => {
    return allItem.filter((sketch) => {
      if (searchTerm.tags && searchTerm.tags.length > 0) {
        if (!searchTerm.tags.includes(toCategoryId(sketch.category))) {
          return false;
        }
      }
      return searchTerm.name.length === 0 || sketch.name.toLowerCase().includes(searchTerm.name);
    });
  }, [allItem, searchTerm]);

  return (
    <Modal
      onClose={close}
      title="Open or create a new sketch"
      icon={IconInfoCircle}>
      <MainDiv>
        <ButtonGroup
          align="stretch"
          forceStretch
          responsive>
          <Button
            onClick={withConfirm(() => loadSketch(new Promise<SketchTemplate>((r) => r(lastSavedSketch as SketchTemplate))))}
            disabled={lastSavedSketch === null}
            icon={IconReload}
            label="Last opened sketch"></Button>
          <Button
            icon={IconFilePlus}
            label="New"
            onClick={() => {
              useTree.getState().reset();
              close();
            }}></Button>
          <Button
            onClick={() => openModal(Routes.Load)}
            icon={IconUpload}
            label="Load from JSON"></Button>
        </ButtonGroup>
        <div className="files">
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
          <TagList>
            {categories.map((tag) => (
              <CategoryButton
                key={tag}
                selected={searchTerm.tags.includes(tag.toLowerCase())}
                onClick={() => toggleTag(tag)}
                title={tag}>
                {tag}
              </CategoryButton>
            ))}
          </TagList>

          <NodeList>
            {filteredList.map((item) => (
              <SketchButton
                onDelete={
                  item.category === MY_SAVED_SKETCH
                    ? (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        withConfirm(() => deleteSavedSketch(item.name))();
                      }
                    : undefined
                }
                key={`${item.category}/${item.name}`}
                onClick={withConfirm(() => loadSketch(item.content()))}
                item={item}
              />
            ))}
          </NodeList>
        </div>
      </MainDiv>
    </Modal>
  );

  function useLoadSketch(close: () => void) {
    return (promise: Promise<SketchTemplate>) => {
      promise.then(
        (sketch) => {
          useTree.getState().loadTemplate(sketch);
          close();
        },
        (err) => {
          useDialog.getState().openError("There was an error while loading the sketch");
        }
      );
    };
  }
}

function useToggleTag(searchTermRaw: string, setSearchTerm: (t: string) => void) {
  return useCallback(
    function toggleTag(tag: string): void {
      var key = `tag:${toCategoryId(tag)}`;
      var regexKey = new RegExp(key, "gi");
      if (searchTermRaw.match(regexKey)) {
        setSearchTerm(searchTermRaw.replaceAll(regexKey, "").trim());
      } else {
        setSearchTerm(searchTermRaw.trim() + " " + key);
      }
    },
    [searchTermRaw, setSearchTerm]
  );
}

function useSketchCollection(): [SketchElement[], string[], (name: string) => void] {
  const [sketches, saveSketch, deleteSketch] = useAllSavedSketch();
  const tags = new Set([MY_SAVED_SKETCH]);
  return [
    [
      ...(sketches || []).map((sketch) => {
        return {
          name: sketch.name,
          category: MY_SAVED_SKETCH,
          content: () => new Promise<SketchTemplate>((r) => r(JSON.parse(sketch.content))),
        };
      }),
      ...Object.entries(Templates).flatMap(([folderName, content]) => {
        tags.add(folderName);
        return Object.entries(content).map(([fileName, content]) => ({
          name: fileName,
          category: folderName,
          content: content,
        }));
      }),
    ],
    Array.from(tags),
    deleteSketch,
  ];
}

function useWithConfirm() {
  return (cb: Function) => {
    return (...args: any[]) => {
      useDialog.getState().openConfirm(
        (isConfirmed) => {
          if (isConfirmed) {
            cb(...args);
          }
        },
        "Are you sure ?",
        "You will lose all your data for this sketch."
      );
    };
  };
}
