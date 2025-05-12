import { FlatMaterialType } from "../../../Nodes/3D/VirtualNodeTypes/MaterialsVirtualNodes";
import { MaterialData } from "../../../Types/MaterialData";
import { Color } from "../../../Types/vectorDataType";
import { ColorInput } from "./ColorInput";

export function MaterialInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  var mat = value as MaterialData;
  if (!mat || mat.type !== "FlatMaterialType") {
    return null;
  }

  const onInputChange = (newValue: Color) => {
    var newMat = { ...mat, props: [newValue, mat.props.slice(1)] } as MaterialData;
    onChange(newMat);
  };

  return (
    <ColorInput
      value={mat.props[0] as Color}
      onChange={onInputChange}></ColorInput>
  );
}
