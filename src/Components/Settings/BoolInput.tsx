import styled from "styled-components";
import { InputProps } from "./InputProps";

const BoolDiv = styled.div`
  flex: 1 1 100px;
  display: flex;
  justify-content: end;
  align-items: end;
  cursor: pointer;
  height: 37px;

  border-bottom: 2px solid var(--color-border-input);
  padding: var(--padding-small);

  transition: background-color 0.3s;

  &:focus-within,
  &:hover {
    background: var(--color-selected);
  }
`;

export function BoolInput({ onChange, value }: InputProps<boolean>) {
  return (
    <BoolDiv onClick={() => onChange(!value)}>
      <input type="checkbox" checked={value} onChange={(e) => onChange(!value)} />
    </BoolDiv>
  );
}
