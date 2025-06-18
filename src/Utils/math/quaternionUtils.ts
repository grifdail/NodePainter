import { Euler, EulerOrder, Quaternion as TQuaternion } from "three";
import { Quaternion, Vector3 } from "../../Types/vectorDataType";

export function eulerToQuat(vec: Vector3, order: EulerOrder = "XYZ") {
  var euler = new Euler(vec[0], vec[1], vec[2], order);
  var qt = new TQuaternion().setFromEuler(euler);
  return [qt.x, qt.y, qt.z, qt.w];
}

export function toQuaternion(qt: TQuaternion): Quaternion {
  return [qt.x, qt.y, qt.z, qt.w];
}
