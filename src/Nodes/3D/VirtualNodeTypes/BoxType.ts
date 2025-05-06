import { BoxGeometry, BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { Vector3 } from "../../../Types/vectorDataType";
import { StatefullElementType } from "../../../Utils/statefullContext";

type boxProps = [position: Vector3, rotation: Vector3, dimension: Vector3];
export class BoxType extends StatefullElementType<Mesh, boxProps> {
  create(position: Vector3, rotation: Vector3, dimension: Vector3): Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> {
    const self = new Mesh(new BoxGeometry(3, 3, 3), undefined);
    return self;
  }
  override mountChildren(element: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>, child: any): void {
    element.material = child;
  }
  update(element: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>, position: Vector3, rotation: Vector3, dimension: Vector3): void {
    element.position.set(...position);
    element.rotation.set(...rotation);
    element.scale.set(...dimension);
  }
  remove(element: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>): void {
    element.geometry.dispose();
  }
}
