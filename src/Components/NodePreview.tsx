import React, { MouseEvent } from "react";
import { NodeDefinition } from "../Types/NodeDefinition";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import styled from "styled-components";
import { camelCaseToWords } from "../Utils/ui/camelCaseToWords";
import { idToNodeName } from "../Utils/ui/idToNodeName";

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

export function NodePreview({ node, onClick, onFav, isFav }: { node: NodeDefinition; onClick: (node: NodeDefinition) => void; onFav: () => void; isFav: boolean }) {
  const onClickFav = (e: MouseEvent<HTMLDivElement, Event>) => {
    e.preventDefault();
    e.stopPropagation();
    onFav();
  };

  const Icon = node.icon;
  return (
    <StyledButton onClick={() => onClick(node)}>
      {Icon != null ? <Icon></Icon> : null}
      <div data-tooltip-id="tooltip" data-tooltip-content={node.id}>
        {node.label || idToNodeName(node.id)}
      </div>
      <p data-tooltip-id="tooltip" data-tooltip-content={node.description}>
        {node.description}
      </p>
      <span className="spacer"></span>
      <div className="fav" onClick={onClickFav}>
        {isFav ? <IconStarFilled /> : <IconStar />}
      </div>
    </StyledButton>
  );
}
