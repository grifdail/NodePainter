import { Object3D } from "three";
import { StatefullElementType } from "../../../Utils/statefullContext";

type boxProps = [];
export class Compose3DVirtualNodeType extends StatefullElementType<Object3D, boxProps> {
  create(): Object3D {
    const self = new Object3D();
    return self;
  }
  override mountChildren(element: Object3D, child: any): void {
    element.add(child);
  }
  override unmountChildren(element: Object3D, child: any): void {
    element.remove(child);
  }
  update(element: Object3D): void {}
  remove(element: Object3D): void {}
}
