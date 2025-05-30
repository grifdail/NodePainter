import { Object3D } from "three";
import { Quaternion, Vector3 } from "../../../Types/vectorDataType";
import { StatefullElementType } from "../../../Utils/statefullContext";

export class UploadedModelVirtualNodeType extends StatefullElementType<Object3D, [position: Vector3, rotation: Quaternion, dimension: Vector3, object: Object3D]> {
  create(position: Vector3, rotation: Quaternion, dimension: Vector3, object: Object3D): Object3D {
    const self = new Object3D();
    self.add(object);
    return self;
  }
  update(element: Object3D, position: Vector3, rotation: Quaternion, dimension: Vector3, object: Object3D): void {
    element.position.set(...position);
    element.quaternion.set(...rotation);
    element.scale.set(...dimension);
  }
  remove(element: Object3D): void {}
}
