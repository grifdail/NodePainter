import { BufferGeometry, CylinderGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap, Vector3 as TVector3 } from "three";
import { Vector3 } from "../../../Types/vectorDataType";
import { vectorMagnitude, vectorNormalize, vectorSubstraction } from "../../../Utils/math/vectorUtils";
import { StatefullElementType } from "./statefullContext";

export type modelProps = [start: Vector3, end: Vector3, size: number];
export class Line3DVirtualNodeType extends StatefullElementType<Mesh, modelProps> {
  create(start: Vector3, end: Vector3, size: number): Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> {
    const self = new Mesh(new CylinderGeometry(1, 1, 1, 32, 1, false), undefined);
    return self;
  }
  override mountChildren(element: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>, child: any): void {
    if (child.isMaterial) {
      element.material = child;
    }
  }
  update(element: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>, start: Vector3, end: Vector3, size: number): void {
    var dt = vectorSubstraction(end, start);
    element.position.set((start[0] + end[0]) * 0.5, (start[1] + end[1]) * 0.5, (start[2] + end[2]) * 0.5);

    element.quaternion.setFromUnitVectors(new TVector3(0, 1, 0), new TVector3(...vectorNormalize(dt)));
    element.scale.set(size * 0.5, vectorMagnitude(dt), size * 0.5);
  }
  remove(element: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>): void {
    element.geometry.dispose();
  }
}
