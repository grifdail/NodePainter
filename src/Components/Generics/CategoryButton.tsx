import { IconPlus } from "@tabler/icons-react";
import { boolean } from "mathjs";
import styled from "styled-components";
import { ContextMenu } from "../Graph/ContextMenu";
import { Menu, MenuItem } from "@szhsin/react-menu";

export const CategoryButton = styled.button<{ selected?: boolean }>`
  color: var(--color-text);
  padding: 10px;
  background: ${(props) => (props.selected ? "var(--color-selected)" : "none")};
  border: none;
  border-radius: 24px;
  padding: var(--padding-small);
  text-transform: capitalize;
  text-decoration: ${(props) => (props.selected ? "underline" : "none")};
  font-weight: ${(props) => (props.selected ? "bold" : "none")};

  &::after {
    display: block;
    content: attr(title);
    font-weight: bold;
    height: 1px;
    color: transparent;
    overflow: hidden;
    visibility: hidden;
    text-transform: capitalize;
  }

  &:hover {
    background: var(--color-selected);
  }

  @media (max-width: 840px), (max-height: 500px) {
    padding: 5px;
    font-size: 12px;
  }
`;

export const TagListRoot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: var(--padding-small);
  min-height: 32px;
  align-self: stretch;
`;

export const TagListContent = styled.div<{ $shrink?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: var(--padding-small);
  overflow-y: ${(props) => (props.$shrink ? "hidden" : "visible")};
  flex: 1 1 auto;
  height: 32px;
  align-self: stretch;
`;

export const TagList = ({ options, onClick, useShrink, sort }: { options: Record<string, boolean>; onClick: (name: string) => void; useShrink?: boolean; sort?: (a: string, b: string) => number }) => {
  var sorted = Object.entries(options);
  if (sort) {
    sorted = sorted.sort((a, b) => sort(a[0], b[0]));
  }
  return (
    <TagListRoot>
      <TagListContent $shrink={useShrink}>
        {Object.entries(options).map(([name, isSelected]) => (
          <CategoryButton key={name} selected={isSelected} onClick={() => onClick(name)} title={name}>
            {name}
          </CategoryButton>
        ))}
      </TagListContent>
      {useShrink && (
        <Menu
          portal
          overflow="auto"
          menuButton={
            <button>
              <IconPlus></IconPlus>
            </button>
          }
        >
          {sorted.map(([name, isSelected]) => (
            <MenuItem key={name} type="checkbox" checked={isSelected} onClick={() => onClick(name)} title={name}>
              {name}
            </MenuItem>
          ))}
        </Menu>
      )}
    </TagListRoot>
  );
};
