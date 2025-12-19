import styled from "styled-components";
import { Vector } from "../../../Types/vectorDataType";
import { applyConstraint, ConstrainDeclaration } from "../../../Utils/ui/applyConstraints";
import { NumberInput } from "../Inputs/NumberInput";

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

export function VectorInput({ onChange, value, constrains }: { onChange: (value: any) => void; value: Vector; constrains?: ConstrainDeclaration[] }) {
    const onInputChange = (newValue: number, property: number) => {
        var newVector = value.slice();
        newVector[property] = newValue;
        onChange(applyConstraint(newVector, value, constrains));
    };
    if (value === undefined || value === null) {
        value = [0, 0, 0, 0] as unknown as Vector;
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
