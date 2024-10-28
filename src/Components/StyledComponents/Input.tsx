import styled from "styled-components";

export const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--color-border);

  transition: background-color 0.3s;
  text-align: right;
  padding: var(--padding-small);
  flex-basis: 100px;
  flex-grow: 1;
  flex-shrink: 1;

  font-size: var(--size-text);

  &:focus {
    outline: none;
    background: light-dark(rgba(0, 0, 0, 0.1), rgba(1, 1, 1, 0.3));
  }
`;
