import { Object3D } from "three";
import { Quaternion, Vector3 } from "../../../Types/vectorDataType";
import { StatefullElementType } from "../../../Utils/statefullContext";

export class TransformedObjectModelVirtualNodeType extends StatefullElementType<Object3D, [position: Vector3, rotation: Quaternion, dimension: Vector3]> {
  create(position: Vector3, rotation: Quaternion, dimension: Vector3): Object3D {
    const self = new Object3D();
    return self;
  }
  override mountChildren(element: Object3D, child: any): void {
    element.add(child);
  }
  override unmountChildren(element: Object3D, child: any): void {
    element.remove(child);
  }
  update(element: Object3D, position: Vector3, rotation: Quaternion, dimension: Vector3): void {
    element.position.set(...position);
    element.quaternion.set(...rotation);
    element.scale.set(...dimension);
  }
  remove(element: Object3D): void {}
}
