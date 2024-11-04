import styled from "styled-components";
import { InputBackgroundColor } from "../StyledComponents/Input";
import { InputProps } from "./InputProps";
import { NumberInput } from "./NumberInput";

const SliderInputDiv = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-grow: 1;

  padding-right: var(--padding-small);

  transition: background-color 0.3s;

  background: ${InputBackgroundColor};
  border-radius: 24px;

  & > input[type="range"] {
    flex: 1 1 100px;
    width: 10px;
    cursor: pointer;
    border-radius: 25px;
    margin: 0;
    height: 100%;
    background: transparent;

    &::-moz-range-track {
      background: var(--color-slider-track);
      height: 100%;

      border-radius: 25px;
    }

    &::-moz-range-progress {
      height: calc(100% - 4px);

      background: var(--color-slider-output);

      border-radius: 25px;
    }

    &::-moz-range-thumb {
      appearance: none;
      opacity: 0;
    }
  }

  & > input:not([type="range"]) {
    flex: 0 0 50px;
    border: none;
    transition: color 0.3s;
    width: 10px;
    background: none;

    &:focus,
    &:hover {
      background: none;
    }
  }

  &:focus-within,
  &:hover {
    background: var(--color-selected);
  }
`;

export function SliderInput({ onChange, value, disabled, min, max }: InputProps<number> & { max: number; min: number }) {
  return (
    <SliderInputDiv>
      <input type="range" value={value} min={min} max={max} onChange={(e) => onChange(parseFloat(e.target.value))} disabled={disabled} />
      <NumberInput value={value} onChange={onChange} disabled={disabled}></NumberInput>
    </SliderInputDiv>
  );
}
