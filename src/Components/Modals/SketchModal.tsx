import { Menu, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { Icon, IconDeviceFloppy, IconFile, IconFilePlus, IconInfoCircle, IconPlayerPlay, IconReload, IconSearch, IconSortDescending, IconUpload, IconX } from "@tabler/icons-react";
import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { openLoadModal } from "../../Actions/navigationAction";
import { getLastSavedSketch } from "../../Hooks/lastSavedSketch";
import { useDialog } from "../../Hooks/useDialog";
import { useTree } from "../../Hooks/useTree";
import { SketchSave } from "../../Types/SketchTemplate";
import { Button, InvisibleButton } from "../Generics/Button";
import { TagList } from "../Generics/CategoryButton";
import { SearchForm } from "../Generics/SearchForm";
import { Modal } from "../Modal";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { Input } from "../StyledComponents/Input";
import { useSketchCollection } from "./useSketchCollection";

export const MY_SAVED_SKETCH = "My Saved Sketch";
export const MY_ONLINE_SKETCH = "My online Sketch";

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

const IconPerTypes: Record<string, Icon> = {
    default: IconFile,
    Templates: IconFile,
    [MY_SAVED_SKETCH]: IconDeviceFloppy,
    Examples: IconPlayerPlay,
};

export type SketchElement = {
    content: () => Promise<SketchSave | null>;
    time: number,
    name: string;
    category: string,
    delete?: () => void
};

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

export const DeleteButton = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-text);

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
    const Icon = IconPerTypes[item.category] === undefined ? IconPerTypes.default : IconPerTypes[item.category];
    return (
        <StyledButton onClick={onClick}>
            <Icon />
            <div>{item.name}</div>
            <p>{item.category}</p>
            <span className="spacer" />
            {onDelete && (
                <DeleteButton onClick={onDelete}>
                    <IconX />
                </DeleteButton>
            )}
        </StyledButton>
    );
}

const sketchCategory = { [MY_ONLINE_SKETCH]: 4, Templates: 3, [MY_SAVED_SKETCH]: 2, Examples: 1 };

export function SketchModal({ close }: { close: () => void }) {
    const loadSketch = useLoadSketch(close);
    const withConfirm = useWithConfirm();
    const [allItem, categories] = useSketchCollection();
    const categoriesExceptTemplate = useMemo(() => categories.filter(cat => cat !== "Templates"), [categories]);
    const allItemInTemplate = useMemo(() => allItem.filter(item => item.category === "Templates"), [allItem])
    const allItemExceptTemplate = useMemo(() => allItem.filter(item => item.category !== "Templates"), [allItem])
    const [searchTermRaw, setSearchTerm] = useState("");
    const searchTerm = useMemo(() => parseSearchTerm(searchTermRaw), [searchTermRaw]);
    const lastSavedSketch = getLastSavedSketch();
    const toggleTag = useToggleTag(searchTermRaw, setSearchTerm);
    const [sortBy, setSortBy] = useState<"name" | "time" | "category">("time")
    const filteredList = useMemo(() => {
        return allItemExceptTemplate
            .filter((sketch) => {
                if (searchTerm.tags && searchTerm.tags.length > 0 && !searchTerm.tags.includes(toCategoryId(sketch.category))) {
                    return false;
                }
                return searchTerm.name.length === 0 || sketch.name.toLowerCase().includes(searchTerm.name);
            })
            .sort((a, b) => {
                if (sortBy === "category") {
                    const r = sketchCategory[b.category as keyof typeof sketchCategory] - sketchCategory[a.category as keyof typeof sketchCategory];
                    if (r === 0) {
                        return a.name.localeCompare(b.name);
                    }
                    return r;
                }
                if (sortBy === "time") {
                    return b.time - a.time;
                }
                return a.name.localeCompare(b.name);

            });
    }, [allItemExceptTemplate, searchTerm, sortBy]);

    return (
        <Modal onClose={close} title="Open or create a new sketch" icon={IconInfoCircle}>
            <MainDiv>
                <ButtonGroup align="stretch" $forceStretch $responsive>
                    <Button onClick={withConfirm(() => loadSketch(new Promise<SketchSave>((r) => r(lastSavedSketch as SketchSave))))} disabled={lastSavedSketch === null} icon={IconReload} label="Last opened sketch" />
                    <Menu menuButton={<Button icon={IconFilePlus} label="New" />}>
                        <MenuItem onClick={() => {
                            useTree.getState().reset();
                            close();
                        }}>Basic</MenuItem>
                        {
                            allItemInTemplate.map(sketch => <MenuItem key={sketch.name} onClick={withConfirm(() => loadSketch(sketch.content()))}>{sketch.name}</MenuItem>)
                        }
                    </Menu>
                    <Button onClick={openLoadModal} icon={IconUpload} label="Load from JSON" />
                </ButtonGroup>
                <div className="files">
                    <SearchForm>
                        <span>
                            <IconSearch> </IconSearch>
                            <Input onChange={(e) => setSearchTerm(e.target.value)} value={searchTermRaw} placeholder="filter..." autoFocus />
                        </span>
                        <Menu
                            menuButton={
                                <InvisibleButton
                                    icon={IconSortDescending}
                                    type="button"
                                />
                            }
                            portal>
                            <MenuRadioGroup value={sortBy}>
                                <MenuItem
                                    type="radio"
                                    value="time"
                                    onClick={() => setSortBy("time")}>
                                    Featured
                                </MenuItem>
                                <MenuItem
                                    type="radio"
                                    value="name"
                                    onClick={() => setSortBy("name")}>
                                    Name
                                </MenuItem>
                                <MenuItem
                                    type="radio"
                                    value="category"
                                    onClick={() => setSortBy("category")}>
                                    Last used
                                </MenuItem>

                            </MenuRadioGroup>
                        </Menu>
                    </SearchForm>
                    <TagList options={Object.fromEntries(categoriesExceptTemplate.map((tag) => [tag, searchTerm.tags.includes(tag.toLowerCase())]))} onClick={toggleTag} />

                    <NodeList>
                        {filteredList.map((item) => (
                            <SketchButton
                                onDelete={
                                    item.delete
                                        ? (e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            withConfirm(() => {
                                                if (item.delete) {
                                                    item.delete()
                                                }
                                            })();
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
        return (promise: Promise<SketchSave | null>) => {
            promise.then(
                (sketch) => {
                    if (sketch) {
                        useTree.getState().loadTemplate(sketch);
                        close();
                    }

                },
                (err) => {
                    useDialog.getState().openError("There was an error while loading the sketch");
                }
            );
        };
    }
}

const ALL_TAG_REGEX = /tag:(\w+)/gm
function useToggleTag(searchTermRaw: string, setSearchTerm: (t: string) => void) {
    return useCallback(
        function toggleTag(tag: string): void {
            const key = `tag:${toCategoryId(tag)}`;
            const regexKey = new RegExp(key, "gi");
            const wasSame = searchTermRaw.match(regexKey);
            const previous = searchTermRaw.match(ALL_TAG_REGEX);
            let newSearchTerm = previous ? searchTermRaw.replaceAll(ALL_TAG_REGEX, "").trim() : "";
            if (!wasSame) {
                newSearchTerm = `${newSearchTerm.trim()} ${key}`
            }
            setSearchTerm(newSearchTerm);
        },
        [searchTermRaw, setSearchTerm]
    );
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
