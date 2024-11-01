import styled from "styled-components";
import { InputProps } from "./InputProps";
import { InputBackgroundColor } from "../StyledComponents/Input";

const BoolDiv = styled.div`
  flex: 1 1 100px;
  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  height: 37px;

  background: ${InputBackgroundColor};
  border-radius: 24px;
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
