import React, { useState } from "react";
import { usePagination } from "react-use-pagination";
import { NodeLibrary } from "../Data/NodeLibrary";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { useViewbox } from "../Hooks/useViewbox";
import { useTree } from "../Hooks/useTree";

export function AddNodeButton({ node, onClick }: { node: NodeDefinition; onClick: (node: NodeDefinition) => void }) {
  const Icon = node.icon;
  return (
    <div className="add-node">
      {Icon != null ? <Icon></Icon> : null}
      <div className="body">
        <h5>{node.id}</h5>
        <p>{node.description}</p>
      </div>

      <button onClick={() => onClick(node)}>Add</button>
    </div>
  );
}

export function AddModal({ close }: { close: () => void }) {
  const [searchTermRaw, setSearchTerm] = useState("");
  const searchTerm = searchTermRaw.trim().toLowerCase();

  const filteredList = Object.values(NodeLibrary).filter((item) => {
    return searchTerm.length === 0 || item.id.toLowerCase().includes(searchTerm) || item.tags.some((tag) => tag.toLowerCase() === searchTerm);
  });
  const tags = filteredList.flatMap((item) => item.tags).filter((value, index, array) => array.indexOf(value) === index);
  const { currentPage, totalPages, setNextPage, setPreviousPage, nextEnabled, previousEnabled, startIndex, endIndex, setPage } = usePagination({ totalItems: filteredList.length, initialPage: 0, initialPageSize: 10 });

  const onInputChange = (value: string) => {
    setSearchTerm(value);
    setPage(0);
  };

  const addNode = useTree((state) => state.addNode);

  var view = useViewbox();

  const onClickNode = (node: NodeDefinition) => {
    addNode(node.id, view.x + window.innerWidth * 0.5 * view.scale, view.y + window.innerHeight * 0.5 * view.scale);
    close();
  };

  return (
    <div className="full-screen-layout window add-modal">
      <div className="header">
        <h3>Add a new node</h3>
        <div className="tag-list">
          {tags.map((tag) => (
            <button key={tag} className="tag" onClick={() => onInputChange(tag)}>
              {tag}
            </button>
          ))}
        </div>
        <div>
          <input onChange={(e) => onInputChange(e.target.value)} value={searchTermRaw}></input>
        </div>
      </div>
      <div>
        {filteredList.slice(startIndex, endIndex + 1).map((item) => (
          <AddNodeButton node={item} key={item.id} onClick={onClickNode} />
        ))}
      </div>
      <div className="pagination" hidden={totalPages === 0}>
        <button onClick={setPreviousPage} disabled={!previousEnabled}>
          <IconChevronLeft></IconChevronLeft>
        </button>
        {currentPage} / {totalPages}
        <button onClick={setNextPage} disabled={!nextEnabled}>
          <IconChevronRight></IconChevronRight>
        </button>
      </div>
    </div>
  );
}
