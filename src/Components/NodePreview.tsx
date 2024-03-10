import React, { MouseEvent } from "react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

export function NodePreview({ node, onClick, onFav, isFav }: { node: NodeDefinition; onClick: (node: NodeDefinition) => void; onFav: () => void; isFav: boolean }) {
  const onClickFav = (e: MouseEvent<HTMLDivElement, Event>) => {
    e.preventDefault();
    e.stopPropagation();
    onFav();
  };

  const Icon = node.icon;
  return (
    <button onClick={() => onClick(node)}>
      <div>{node.label || node.id}</div>
      <div className="fav" onClick={onClickFav}>
        {isFav ? <IconStarFilled /> : <IconStar color="#262626" />}
      </div>

      {Icon != null ? <Icon></Icon> : null}
      <p title={node.description}>{node.description}</p>
    </button>
  );
}
