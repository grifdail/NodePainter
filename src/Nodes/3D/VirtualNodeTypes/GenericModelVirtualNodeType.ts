import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { Quaternion, Vector3 } from "../../../Types/vectorDataType";
import { StatefullElementType } from "../../../Utils/statefullContext";

export type modelProps = [position: Vector3, rotation: Quaternion, dimension: Vector3];
export class GenericModelVirtualNodeType extends StatefullElementType<Mesh, modelProps> {
  create(position: Vector3, rotation: Quaternion, dimension: Vector3): Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> {
    const self = new Mesh(undefined, undefined);
    return self;
  }
  override mountChildren(element: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>, child: any): void {
    if (child.isMaterial) {
      element.material = child;
    } else if (child.isBufferGeometry) {
      element.geometry = child;
    }
  }
  update(element: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>, position: Vector3, rotation: Quaternion, dimension: Vector3): void {
    element.position.set(...position);
    element.quaternion.set(...rotation);
    element.scale.set(...dimension);
  }
  remove(element: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>): void {}
}
