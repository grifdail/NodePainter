import { NumberInput } from "./NumberInput";
import { Vector2 } from "@use-gesture/react";

export function VectorInput({ onChange, value }: { onChange: (value: any) => void; value: Vector2 }) {
  const onInputChange = (newValue: number, property: number) => {
    var newVector = value.slice();
    newVector[property] = newValue;
    onChange(newVector);
  };
  return (
    <div className="vector-input">
      {value.map((comp, i) => (
        <NumberInput key={i} value={comp} onChange={(e: number) => onInputChange(e as number, i)}></NumberInput>
      ))}
    </div>
  );
}
