import { NumberInput } from "./NumberInput";
import { Vector2 } from "@use-gesture/react";
import { createVector2 } from "../../Nodes/Vector";

export function VectorInput({ onChange, value }: { onChange: (value: any) => void; value: Vector2 }) {
  const onInputChange = (newValue: number, property: "x" | "y") => {
    var newVector = property === "x" ? createVector2(newValue, value[1]) : createVector2(value[0], newValue);
    onChange(newVector);
  };
  return (
    <div>
      <NumberInput value={value[0]} onChange={(e) => onInputChange(e, "x")}></NumberInput>
      <NumberInput value={value[1]} onChange={(e) => onInputChange(e, "y")}></NumberInput>
    </div>
  );
}
