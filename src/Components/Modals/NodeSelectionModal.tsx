import { FormEvent, useCallback, useMemo, useState } from "react";
import { IconPlus, IconSortDescending } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { useViewbox } from "../../Hooks/useViewbox";
import { useTree } from "../../Hooks/useTree";
import { NodePreview } from "../NodePreview";
import { Modal } from "../Modal";
import styled from "styled-components";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { Menu, MenuButton, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { PlayerPrefStore } from "../../Types/PlayerPrefStore";
import { useShallow } from "zustand/react/shallow";

const AddModalDiv = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  align-content: stretch;
  align-self: stretch;
  flex-grow: 1;

  & > menu {
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    margin: 0;
    padding: 0;
    overflow: auto;
    flex-shrink: 0;
    flex-grow: 0;
    margin-right: 10px;

    & button {
    }
  }
  & > section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    flex-shrink: 1;
    max-height: 100%;
    align-items: stretch;

    & > div {
      display: flex;
      flex-direction: row;
      justify-content: stretch;
      align-items: stretch;
      height: 50px;
      flex: 0 0 30px;
      & > Input {
        display: block;
        flex: 1 0 100px;
      }
      & > button {
        display: flex;
        align-items: center;
        gap: 10px;
        vertical-align: middle;
      }
    }

    & > menu {
      overflow: auto;
      width: 100%;
      background: var(--color-background);
      padding: 10px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      //grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));

      gap: 10px;
      align-self: flex-start;
      margin: 0;
      max-height: 100%;
      padding-bottom: 25px;
      box-sizing: border-box;
      flex-grow: 1;

      & > button {
        background: var(--color-background-card);
        padding: 10px;
        box-sizing: 10px;
        //aspect-ratio: 2;
        display: flex;
        gap: 10px;
        flex-direction: column;
        align-items: center;
        position: relative;
        cursor: pointer;

        & > div {
          padding-bottom: 5px;
          font-weight: bold;
          border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        }

        & > div.fav {
          position: absolute;
          width: 10px;
          border: 0;
          height: 10px;
          right: 20px;
          top: 5px;
          cursor: pointer;
        }

        & > svg {
          height: 50px;
          width: 50px;
          flex: 0 0 50px;
        }
        & p {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      }
    }
  }

  @media (max-width: 840px), (max-height: 500px) {
    & > menu {
      width: 100px;
    }
    & > section > div {
      height: 24px;
      flex: 0 0 24px;
      font-size: 18px;

      & > input,
      & > button {
        font-size: 12px;
      }
    }

    & > section > menu > button {
      font-size: 12px;
      gap: 3px;
      padding: 5px;
      & > svg {
        height: 32px;
        width: 32px;
      }
      & > div.fav {
        right: 15px;
        & > svg {
          height: 20px;
        }
      }
      & > p {
      }
    }
  }
`;

const CategoryButton = styled.button<{ selected?: boolean }>`
  padding: 10px;
  background: ${(props) => (props.selected ? "rgba(0,0,0,0.2)" : "none")};
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  text-transform: capitalize;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 840px), (max-height: 500px) {
    padding: 5px;
    font-size: 12px;
  }
`;

export function NodeSelectionModal({ close }: { close: () => void }) {
  const [searchTermRaw, setSearchTerm] = useState("");

  const searchTerm = useMemo(() => searchTermRaw.trim().toLowerCase(), [searchTermRaw]);
  const nodeFav = usePlayerPref();
  const [selectedCategory, setCategory] = useState("");
  const isShader = useTree((state) => state.getCustomNodeEditingType() === "shader");
  const treeShaderLib = useTree(useShallow((state) => state.getNodeLibrary()));
  const nodeLibrary = useMemo(
    () =>
      Object.values(treeShaderLib).filter((item) => {
        if (item.hideInLibrary) {
          return false;
        }
        return isShader ? item.getShaderCode !== undefined : item.getData !== undefined || item.execute !== undefined || item.executeAs != null;
      }),
    [isShader, treeShaderLib]
  );

  const filteredList = useMemo(
    () =>
      nodeLibrary.filter((item) => {
        if (item.hideInLibrary) {
          return false;
        }
        if (!!selectedCategory) {
          if (!item.tags.includes(selectedCategory)) {
            return false;
          }
        }

        return searchTerm.length === 0 || item.id.toLowerCase().includes(searchTerm);
      }),
    [nodeLibrary, searchTerm, selectedCategory]
  );
  const finalList = useMemo(() => sortNodeList(nodeFav, filteredList), [filteredList, nodeFav]);

  const tags = useMemo(
    () =>
      nodeLibrary
        .flatMap((item) => item.tags) // Get the tags from all the node in the library
        .filter((value, index, array) => array.indexOf(value) === index) // Remove duplicate
        .concat(["all"]), // Add the "All" category
    [nodeLibrary] // Everytime the librairy has change
  );

  const addNode = useTree((state) => state.addNode);

  const onClickNode = useCallback(
    (node: NodeDefinition) => {
      var view = useViewbox.getState();
      addNode(node.id, view.x + window.innerWidth * 0.5 * view.scale, view.y + window.innerHeight * 0.5 * view.scale);
      nodeFav.markNodeAsUsed(node.id);
      close();
    },
    [addNode, close, nodeFav]
  );

  function onSubmitSearch(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (finalList && finalList.length > 0) {
      onClickNode(finalList[0]);
    }
  }

  return (
    <Modal title="Add a new node" icon={IconPlus} onClose={close} size="large">
      <AddModalDiv>
        <menu>
          {tags.map((tag) => (
            <CategoryButton key={tag} selected={tag === selectedCategory || (!selectedCategory && tag === "all")} onClick={() => setCategory(tag === "all" ? "" : tag)}>
              {tag}
            </CategoryButton>
          ))}
        </menu>
        <section>
          <div>
            <form onSubmit={onSubmitSearch}>
              <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTermRaw} placeholder="filter..." autoFocus></input>
            </form>

            <Menu
              menuButton={
                <MenuButton>
                  Sort By: <IconSortDescending />
                </MenuButton>
              }>
              <MenuRadioGroup value={nodeFav.nodeSorting}>
                <MenuItem value="name" onClick={() => nodeFav.setSorting("featured")}>
                  Featured
                </MenuItem>
                <MenuItem value="name" onClick={() => nodeFav.setSorting("name")}>
                  Name
                </MenuItem>
                <MenuItem value="last" onClick={() => nodeFav.setSorting("last")}>
                  Last used
                </MenuItem>
                <MenuItem value="most" onClick={() => nodeFav.setSorting("most")}>
                  Most used
                </MenuItem>
              </MenuRadioGroup>
            </Menu>
          </div>

          <menu>
            {finalList.map((item) => (
              <NodePreview node={item} key={item.id} onClick={onClickNode} onFav={() => nodeFav.toggleFav(item.id)} isFav={nodeFav.favNodes.includes(item.id)} />
            ))}
          </menu>
        </section>
      </AddModalDiv>
    </Modal>
  );
}
function sortNodeList(nodeFav: PlayerPrefStore, filteredList: NodeDefinition[]) {
  const favSorting = compareFav(nodeFav);
  const lastSorting = (a: NodeDefinition, b: NodeDefinition) => (nodeFav.nodesLastUsedDates[b.id] || 0) - (nodeFav.nodesLastUsedDates[a.id] || 0);
  const mostSorting = (a: NodeDefinition, b: NodeDefinition) => (nodeFav.nodesUseCount[b.id] || 0) - (nodeFav.nodesUseCount[a.id] || 0);
  const featuredSorting = (a: NodeDefinition, b: NodeDefinition) => (b.featureLevel || 0) - (a.featureLevel || 0);
  const idSorting = (a: NodeDefinition, b: NodeDefinition) => a.id.toLowerCase().localeCompare(b.id.toLowerCase());
  if (nodeFav.nodeSorting === "last") {
    filteredList.sort(sortWithPriority(favSorting, lastSorting, featuredSorting));
  } else if (nodeFav.nodeSorting === "most") {
    filteredList.sort(sortWithPriority(favSorting, mostSorting, featuredSorting));
  } else if (nodeFav.nodeSorting === "featured") {
    filteredList.sort(sortWithPriority(favSorting, featuredSorting, idSorting));
  } else {
    filteredList.sort(sortWithPriority(favSorting, idSorting, featuredSorting));
  }
  return filteredList;
}

function compareFav(nodeFav: PlayerPrefStore) {
  return (a: NodeDefinition, b: NodeDefinition) => {
    const aIsFav = nodeFav.favNodes.includes(a.id);
    const bIsFav = nodeFav.favNodes.includes(b.id);
    if (aIsFav === bIsFav) {
      return 0;
    } else {
      return aIsFav ? -1 : 1;
    }
  };
}

function sortWithPriority<T>(...comparator: ((a: T, b: T) => number)[]) {
  return (a: T, b: T) => {
    for (let index = 0; index < comparator.length; index++) {
      const element = comparator[index];
      const result = element(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  };
}
