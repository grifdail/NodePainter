import { NumberInput } from "./NumberInput";
import { Vector2 } from "@use-gesture/react";

export function VectorInput({ onChange, value }: { onChange: (value: any) => void; value: Vector2 }) {
  const onInputChange = (newValue: number, property: number) => {
    var newVector = value.slice();
    newVector[property] = newValue;
    onChange(newVector);
  };
  return (
    <div>
      {value.map((comp, i) => (
        <NumberInput value={comp} onChange={(e) => onInputChange(e, i)}></NumberInput>
      ))}
    </div>
  );
}
