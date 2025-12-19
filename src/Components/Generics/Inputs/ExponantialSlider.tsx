import styled from "styled-components";
import { InputProps } from "./InputProps";
import { NumberInput } from "./NumberInput";
import { InputBackgroundColor } from "../../StyledComponents/Input";
import { useCallback } from "react";
import { inverseLerp, lerp } from "three/src/math/MathUtils";
import { Constraints } from "../../../Utils/ui/applyConstraints";
import { clamp01 } from "../../../Utils/math/clamp01";

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

export function ExponantialSliderInput({ onChange, value, disabled, min, max, valueAtHalfway = 1 }: InputProps<number> & { max: number; min: number, valueAtHalfway: number }) {

    var base = Math.log(1 / valueAtHalfway) / Math.log(1 / 0.5);

    const exp = (val: number) => {
        return Math.pow(val, base);
    };

    const root = (val: number) => {
        return Math.pow(val, 1 / base);
    };

    const changeSlider = useCallback((value: number) => {
        var v = exp(value);
        const trueValue = Math.min(max, Math.max(min, lerp(min, max, v)))
        onChange(trueValue);
    }, [onChange, exp, base])

    const valueZeroOne = root(clamp01(inverseLerp(min, max, value)))

    return (
        <SliderInputDiv>
            <input
                type="range"
                value={valueZeroOne}
                min={0}
                max={1}
                step={0.01}
                onChange={(e) => changeSlider(parseFloat(e.target.value))}
                disabled={disabled}
            />
            <NumberInput
                value={value}
                constrains={[Constraints.Clamp(min, max)]}
                onChange={onChange}
                disabled={disabled}></NumberInput>
        </SliderInputDiv>
    );
}
