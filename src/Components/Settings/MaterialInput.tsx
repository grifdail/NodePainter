import { MaterialData } from "../../Data/MaterialData";
import { ColorInput } from "./ColorInput";
import { Color } from "../../Data/vectorDataType";

export function MaterialInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  var mat = value as MaterialData;
  if (!mat || mat.color === undefined) {
    return null;
  }
  const onInputChange = (newValue: number) => {
    var newMat = { ...mat, color: newValue };
    onChange(newMat);
  };

  return <ColorInput value={mat.color as Color} onChange={onInputChange}></ColorInput>;
}
