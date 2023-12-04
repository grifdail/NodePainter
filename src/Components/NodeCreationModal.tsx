import { useState } from "react";
import { IconPlus, IconSortDescending } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { useViewbox } from "../Hooks/useViewbox";
import { useTree } from "../Hooks/useTree";
import { NodePreview } from "./NodePreview";
import { Modal } from "./Modal";
import styled from "styled-components";
import { useNodeFav } from "../Hooks/useNodeFav";
import { Menu, MenuButton, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { useRouter } from "../Hooks/useRouter";

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
      background: #eee;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      gap: 10px;
      flex-direction: row;
      align-self: flex-start;
      margin: 0;
      max-height: 100%;
      padding-bottom: 25px;
      box-sizing: border-box;
      flex-grow: 1;
      align-items: stretch;
      align-content: start;

      & > button {
        flex-basis: 200px;
        max-width: 300px;
        flex-grow: 1;
        flex-shrink: 1;
        background: white;
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
          width: 100%;
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
        }
        & p {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
`;

const CategoryButton = styled.button<{ selected?: boolean }>`
  padding: 10px;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  text-transform: capitalize;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export function NodeCreationModal({ close }: { close: () => void }) {
  const [searchTermRaw, setSearchTerm] = useState("");
  const [selectedCategory, setCategory] = useState("");
  const searchTerm = searchTermRaw.trim().toLowerCase();
  const nodeFav = useNodeFav();
  const nodeLibrary = useTree((state) => state.getNodeLibrary());

  const filteredList = Object.values(nodeLibrary).filter((item) => {
    if (!!selectedCategory) {
      if (selectedCategory === "fav") {
        if (!nodeFav.fav.includes(item.id)) {
          return false;
        }
      } else if (!item.tags.includes(selectedCategory)) {
        return false;
      }
    }

    return searchTerm.length === 0 || item.id.toLowerCase().includes(searchTerm);
  });
  if (nodeFav.sorting === "last") {
    filteredList.sort((a, b) => (nodeFav.lastUsed[b.id] || 0) - (nodeFav.lastUsed[a.id] || 0));
  } else if (nodeFav.sorting === "most") {
    filteredList.sort((a, b) => (nodeFav.useCount[b.id] || 0) - (nodeFav.useCount[a.id] || 0));
  } else {
    filteredList.sort((a, b) => a.id.toLowerCase().localeCompare(b.id.toLowerCase()));
  }

  const tags = Object.values(nodeLibrary)
    .flatMap((item) => item.tags)
    .filter((value, index, array) => array.indexOf(value) === index);

  tags.splice(0, 0, "all");
  if (nodeFav.fav.length > 0) {
    tags.splice(1, 0, "fav");
  }

  const addNode = useTree((state) => state.addNode);

  const onClickNode = (node: NodeDefinition) => {
    var view = useViewbox.getState();
    addNode(node.id, view.x + window.innerWidth * 0.5 * view.scale, view.y + window.innerHeight * 0.5 * view.scale);
    nodeFav.useNode(node.id);
    close();
  };
  var open = useRouter((state) => state.open);

  return (
    <Modal title="Add a new node" icon={IconPlus} onClose={close}>
      <AddModalDiv>
        <menu>
          <button onClick={() => open("custom-function")}>aaaa</button>
          {tags.map((tag) => (
            <CategoryButton key={tag} selected={tag === selectedCategory || (!!selectedCategory && tag === "all")} onClick={() => setCategory(tag === "all" ? "" : tag)}>
              {tag}
            </CategoryButton>
          ))}
        </menu>
        <section>
          <div>
            <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTermRaw} placeholder="filter..."></input>
            <Menu
              menuButton={
                <MenuButton>
                  Sort By: <IconSortDescending />
                </MenuButton>
              }
            >
              <MenuRadioGroup value={nodeFav.sorting}>
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
            {filteredList.map((item) => (
              <NodePreview node={item} key={item.id} onClick={onClickNode} onFav={() => nodeFav.toggleFav(item.id)} isFav={nodeFav.fav.includes(item.id)} />
            ))}
          </menu>
        </section>
      </AddModalDiv>
    </Modal>
  );
}
