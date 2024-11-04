import styled from "styled-components";

export const InputBackgroundColor = "color-mix(in srgb, var(--color-input), transparent 90%)";

export const Input = styled.input`
  background: ${InputBackgroundColor};
  border: none;

  border-radius: 25px;

  transition: background-color 0.3s;
  text-align: right;
  padding: var(--padding-small);
  flex-basis: 100px;
  flex-grow: 1;
  flex-shrink: 1;

  font-size: var(--size-text);
  width: 50px;
  position: relative;

  padding: var(--padding-tiny);
  padding-right: 10px;

  &:focus,
  &:hover {
    outline: none;
    background: var(--color-selected);
  }
`;
