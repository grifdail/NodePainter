import styled from "styled-components";
import { NumberInput } from "../Inputs/NumberInput";
import { Vector2 } from "@use-gesture/react";
import { applyConstraint, ConstrainDeclaration } from "../../../Utils/applyConstraints";

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

export function VectorInput({ onChange, value, constrains }: { onChange: (value: any) => void; value: Vector2; constrains?: ConstrainDeclaration[] }) {
  const onInputChange = (newValue: number, property: number) => {
    var newVector = value.slice();
    newVector[property] = newValue;
    onChange(applyConstraint(newVector, constrains));
  };
  if (value === undefined) {
    value = [0, 0, 0, 0] as unknown as Vector2;
  }
  return (
    <StyledDiv>
      {value.map((comp, i) => (
        <NumberInput
          key={i}
          value={comp}
          onChange={(e: number) => onInputChange(e as number, i)}></NumberInput>
      ))}
    </StyledDiv>
  );
}
