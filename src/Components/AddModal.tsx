import { useState } from "react";
import { NodeLibrary } from "../Data/NodeLibrary";
import { IconPlus } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { useViewbox } from "../Hooks/useViewbox";
import { useTree } from "../Hooks/useTree";
import { NodePreview } from "./NodePreview";
import { Modal } from "./Modal";
import styled from "styled-components";

const AddModalDiv = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  height: 100%;
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

    & > Input {
      display: block;
      width: 100%;
    }

    & > menu {
      overflow: auto;
      width: 100%;
      background: #eee;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      gap: 10px;
      flex-direction: row;
      align-self: stretch;
      margin: 0;
      max-height: 100%;
      padding-bottom: 25px;
      box-sizing: border-box;
      flex-grow: 1;

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

        & div {
          padding-bottom: 5px;
          font-weight: bold;
          border-bottom: 1px solid rgba(0, 0, 0, 0.5);
          width: 100%;
        }

        & svg {
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

export function AddModal({ close }: { close: () => void }) {
  const [searchTermRaw, setSearchTerm] = useState("");
  const [selectedCategory, setCategory] = useState("");
  const searchTerm = searchTermRaw.trim().toLowerCase();

  const filteredList = Object.values(NodeLibrary).filter((item) => {
    if (!!selectedCategory && !item.tags.includes(selectedCategory)) {
      return false;
    }

    return searchTerm.length === 0 || item.id.toLowerCase().includes(searchTerm);
  });

  const tags = Object.values(NodeLibrary)
    .flatMap((item) => item.tags)
    .filter((value, index, array) => array.indexOf(value) === index);

  tags.splice(0, 0, "all");

  const addNode = useTree((state) => state.addNode);

  const onClickNode = (node: NodeDefinition) => {
    var view = useViewbox.getState();
    addNode(node.id, view.x + window.innerWidth * 0.5 * view.scale, view.y + window.innerHeight * 0.5 * view.scale);
    close();
  };

  return (
    <Modal title="Add a new node" icon={IconPlus} onClose={close}>
      <AddModalDiv>
        <menu>
          {tags.map((tag) => (
            <CategoryButton key={tag} selected={tag === selectedCategory || (!!selectedCategory && tag === "all")} onClick={() => setCategory(tag === "all" ? "" : tag)}>
              {tag}
            </CategoryButton>
          ))}
        </menu>
        <section>
          <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTermRaw} placeholder="filter..."></input>
          <menu>
            {filteredList.map((item) => (
              <NodePreview node={item} key={item.id} onClick={onClickNode} />
            ))}
          </menu>
        </section>
      </AddModalDiv>
    </Modal>
  );
}
