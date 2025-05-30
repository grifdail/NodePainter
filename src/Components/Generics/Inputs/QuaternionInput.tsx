import { FlatMaterialType } from "../../../Nodes/3D/VirtualNodeTypes/MaterialsVirtualNodes";
import { MaterialData } from "../../../Types/MaterialData";
import { Color, Quaternion, Vector3 } from "../../../Types/vectorDataType";
import { ColorInput } from "./ColorInput";
import { VectorInput } from "./VectorInput";
import { Euler, Quaternion as TQuaternion } from "three";

export function QuaternionInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  var q = new TQuaternion(...value);
  var euler = new Euler().setFromQuaternion(q);
  var eulerVec = [euler.x, euler.y, euler.z];

  const onInputChange = (newValue: Vector3) => {
    var newQ = new TQuaternion().setFromEuler(new Euler(...newValue));
    onChange([newQ.x, newQ.y, newQ.z, newQ.w]);
  };

  return (
    <VectorInput
      value={eulerVec as Vector3}
      onChange={onInputChange}></VectorInput>
  );
}
