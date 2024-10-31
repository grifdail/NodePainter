import styled from "styled-components";

export const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--color-border-input);

  transition: background-color 0.3s;
  text-align: right;
  padding: var(--padding-small);
  flex-basis: 100px;
  flex-grow: 1;
  flex-shrink: 1;

  font-size: var(--size-text);
  width: 50px;
  position: relative;

  &:focus,
  &:hover {
    outline: none;
    background: var(--color-selected);
  }
`;
