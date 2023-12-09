import * as p5 from "p5";
import { NumberInput } from "./NumberInput";

export function VectorInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  const onInputChange = (newValue: number, property: "x" | "y") => {
    var newVector = property === "x" ? p5.prototype.createVector(newValue, value.y) : p5.prototype.createVector(value.x, newValue);
    onChange(newVector);
  };
  return (
    <div>
      <NumberInput value={value.x} onChange={(e) => onInputChange(e, "x")}></NumberInput>
      <NumberInput value={value.y} onChange={(e) => onInputChange(e, "y")}></NumberInput>;
    </div>
  );
}
