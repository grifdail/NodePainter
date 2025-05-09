import { BoxGeometry, ConeGeometry, CylinderGeometry, DodecahedronGeometry, IcosahedronGeometry, PlaneGeometry, SphereGeometry } from "three";
import { PortDefinition } from "../../../Types/PortDefinition";
import { createVector2, Vector2 } from "../../../Types/vectorDataType";
import { Constraints } from "../../../Utils/applyConstraints";
import { SimpleNodeVirtualNodeType } from "./SimpleNodeVirtualNodeType";

abstract class GeometryVirtualNodeType<TGeometry, TProps extends any[]> extends SimpleNodeVirtualNodeType<TGeometry, TProps> {
  getOutput(): PortDefinition {
    return {
      id: "output",
      type: "mesh",
      defaultValue: null,
    };
  }
  getTags(): string[] {
    return ["Geometry"];
  }
}

export class BoxGeometryVirtualNodeType extends GeometryVirtualNodeType<BoxGeometry, []> {
  getInputs(): PortDefinition[] {
    return [];
  }
  getId(): string {
    return "BoxGeometry";
  }
  getDescription(): string {
    return "The geometry for a simple box";
  }

  create(): BoxGeometry {
    const self = new BoxGeometry(1, 1, 1);
    return self;
  }
  update(element: BoxGeometry): void {}
  remove(element: BoxGeometry): void {}
}

export class SphereGeometryVirtualNodeType extends GeometryVirtualNodeType<SphereGeometry, [detail: Vector2]> {
  getInputs(): PortDefinition[] {
    return [
      {
        id: "detail",
        type: "vector2",
        defaultValue: createVector2(24, 24),
      },
    ];
  }
  getId(): string {
    return "SphereGeometry";
  }
  getDescription(): string {
    return "The geometry for a sphere";
  }
  getOutput(): PortDefinition {
    return {
      id: "output",
      type: "mesh",
      defaultValue: null,
    };
  }
  create(detail: Vector2): SphereGeometry {
    const self = new SphereGeometry(1, Math.floor(detail[0]), Math.floor(detail[1]));
    return self;
  }
  update(element: SphereGeometry): void {}
  remove(element: SphereGeometry): void {}
  getHash(detail: Vector2): string {
    return `${Math.floor(detail[0])} - ${Math.floor(detail[1])} `;
  }
}

export class ConeGeometryVirtualNodeType extends GeometryVirtualNodeType<ConeGeometry, []> {
  getInputs(): PortDefinition[] {
    return [];
  }
  getId(): string {
    return "ConeGeometry";
  }
  getDescription(): string {
    return "The geometry for a Cone";
  }
  create(): ConeGeometry {
    const self = new ConeGeometry(1, 1, 24);
    return self;
  }
  update(element: ConeGeometry): void {}
  remove(element: ConeGeometry): void {}
}

export class CylinderGeometryVirtualNodeType extends GeometryVirtualNodeType<CylinderGeometry, [side: number, ratio: number]> {
  getInputs(): PortDefinition[] {
    return [
      {
        id: "side",
        type: "number",
        defaultValue: 6,
        constrains: [Constraints.Integer(), Constraints.GreaterThan(3)],
      },
      {
        id: "ratio",
        type: "number",
        defaultValue: 0.5,
      },
    ];
  }
  getId(): string {
    return "CylinderGeometry";
  }
  getDescription(): string {
    return "The geometry for a cylinder";
  }
  create(side: number, ratio: number): CylinderGeometry {
    console.log(ratio);
    const tr = 1 / Math.max(ratio, 1 - ratio);
    const self = new CylinderGeometry(ratio * tr, (1 - ratio) * tr, 1, side);
    return self;
  }
  update(element: CylinderGeometry): void {}
  remove(element: CylinderGeometry): void {}
  getHash(side: number, ratio: number): string {
    return `${Math.floor(side)}-${Math.floor(ratio * 1000)}`;
  }
}

export class IcosahedronGeometryVirtualNodeType extends GeometryVirtualNodeType<IcosahedronGeometry, [detail: number]> {
  getInputs(): PortDefinition[] {
    return [
      {
        id: "detail",
        type: "number",
        defaultValue: 0,
      },
    ];
  }
  getId(): string {
    return "IcosahedronGeometry";
  }
  getDescription(): string {
    return "The geometry for a regular polyhedron with 12 vertice and 20 face";
  }

  create(detail: number): IcosahedronGeometry {
    const self = new IcosahedronGeometry(1, Math.floor(detail));
    return self;
  }
  update(element: IcosahedronGeometry): void {}
  remove(element: IcosahedronGeometry): void {}
  getHash(detail: number): string {
    return `${Math.floor(detail)}`;
  }
}

export class DodecahedronGeometryVirtualNodeType extends GeometryVirtualNodeType<DodecahedronGeometry, [detail: number]> {
  getInputs(): PortDefinition[] {
    return [
      {
        id: "detail",
        type: "number",
        defaultValue: 0,
      },
    ];
  }
  getId(): string {
    return "DodecahedronGeometry";
  }
  getDescription(): string {
    return "The geometry for a regular polyhedron with 20 vertice and 12 face";
  }
  create(detail: number): DodecahedronGeometry {
    const self = new DodecahedronGeometry(1, Math.floor(detail));
    return self;
  }
  update(element: DodecahedronGeometry): void {}
  remove(element: DodecahedronGeometry): void {}
  getHash(detail: number): string {
    return `${Math.floor(detail)}`;
  }
}

export class QuadGeometryVirtualNodeType extends GeometryVirtualNodeType<PlaneGeometry, [detail: number]> {
  getInputs(): PortDefinition[] {
    return [];
  }
  getId(): string {
    return "QuadGeometry";
  }
  getDescription(): string {
    return "The geometry for a regular simple 2d quad";
  }
  create(detail: number): PlaneGeometry {
    const self = new PlaneGeometry(1, 1);
    return self;
  }
  update(element: PlaneGeometry): void {}
  remove(element: PlaneGeometry): void {}
}

export class PlaneGeometryVirtualNodeType extends GeometryVirtualNodeType<PlaneGeometry, [detail: Vector2]> {
  getInputs(): PortDefinition[] {
    return [
      {
        id: "detail",
        type: "vector2",
        defaultValue: 0,
      },
    ];
  }
  getId(): string {
    return "PlaneGeometry";
  }
  getDescription(): string {
    return "The geometry for a regular polyhedron with 20 vertice and 12 face";
  }
  create(detail: Vector2): PlaneGeometry {
    const self = new PlaneGeometry(1, 1, Math.floor(detail[0]), Math.floor(detail[0]));
    return self;
  }
  update(element: PlaneGeometry): void {}
  remove(element: PlaneGeometry): void {}
  getHash(detail: Vector2): string {
    return `${Math.floor(detail[0])} - ${Math.floor(detail[1])}`;
  }
}

export const GeometryVirtualNodeTypes = {
  ConeGeometryVirtualNodeType: new ConeGeometryVirtualNodeType(),
  BoxGeometryVirtualNodeType: new BoxGeometryVirtualNodeType(),
  SphereGeometryVirtualNodeType: new SphereGeometryVirtualNodeType(),
  CylinderGeometryVirtualNodeType: new CylinderGeometryVirtualNodeType(),
  IcosahedronGeometryVirtualNodeType: new IcosahedronGeometryVirtualNodeType(),
  DodecahedronGeometryVirtualNodeType: new DodecahedronGeometryVirtualNodeType(),
  QuadGeometryVirtualNodeType: new QuadGeometryVirtualNodeType(),
  PlaneGeometryVirtualNodeType: new PlaneGeometryVirtualNodeType(),
};
