import styled from "styled-components";

export const CategoryButton = styled.button<{ selected?: boolean }>`
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

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--padding-small);
`;
