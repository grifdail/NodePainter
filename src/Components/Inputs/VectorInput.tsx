import styled from "styled-components";
import { NumberInput } from "../Inputs/NumberInput";
import { Vector2 } from "@use-gesture/react";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 10px;
  gap: 1px;

  & > input {
    flex: 1 1 10px;
    width: 10px;
  }
`;

export function VectorInput({ onChange, value }: { onChange: (value: any) => void; value: Vector2 }) {
  const onInputChange = (newValue: number, property: number) => {
    var newVector = value.slice();
    newVector[property] = newValue;
    onChange(newVector);
  };
  return (
    <StyledDiv>
      {value.map((comp, i) => (
        <NumberInput key={i} value={comp} onChange={(e: number) => onInputChange(e as number, i)}></NumberInput>
      ))}
    </StyledDiv>
  );
}
