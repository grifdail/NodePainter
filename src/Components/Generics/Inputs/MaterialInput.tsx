import { MaterialData } from "../../../Types/MaterialData";
import { Color } from "../../../Types/vectorDataType";
import { ColorInput } from "./ColorInput";

export function MaterialInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  var mat = value as MaterialData;
  if (!mat || mat.color === undefined) {
    return null;
  }
  const onInputChange = (newValue: Color) => {
    var newMat = { ...mat, color: newValue };
    onChange(newMat);
  };

  return (
    <ColorInput
      value={mat.color as Color}
      onChange={onInputChange}></ColorInput>
  );
}
