import { BoxGeometry, ConeGeometry, CylinderGeometry, SphereGeometry } from "three";
import { PortDefinition } from "../../../Types/PortDefinition";
import { SimpleNodeVirtualNodeType } from "./SimpleNodeVirtualNodeType";

export class BoxGeometryVirtualNodeType extends SimpleNodeVirtualNodeType<BoxGeometry, []> {
  getInputs(): PortDefinition[] {
    return [];
  }
  getId(): string {
    return "BoxGeometry";
  }
  getDescription(): string {
    return "The geometry for a simple box";
  }
  getOutput(): PortDefinition {
    return {
      id: "output",
      type: "mesh",
      defaultValue: null,
    };
  }
  create(): BoxGeometry {
    const self = new BoxGeometry(1, 1, 1);
    return self;
  }
  update(element: BoxGeometry): void {}
  remove(element: BoxGeometry): void {}
}

export class SphereGeometryVirtualNodeType extends SimpleNodeVirtualNodeType<SphereGeometry, []> {
  getInputs(): PortDefinition[] {
    return [];
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
  create(): SphereGeometry {
    const self = new SphereGeometry(1, 24, 24);
    return self;
  }
  update(element: SphereGeometry): void {}
  remove(element: SphereGeometry): void {}
}

export class ConeGeometryVirtualNodeType extends SimpleNodeVirtualNodeType<ConeGeometry, []> {
  getInputs(): PortDefinition[] {
    return [];
  }
  getId(): string {
    return "ConeGeometry";
  }
  getDescription(): string {
    return "The geometry for a Cone";
  }
  getOutput(): PortDefinition {
    return {
      id: "output",
      type: "mesh",
      defaultValue: null,
    };
  }
  create(): ConeGeometry {
    const self = new ConeGeometry(1, 1, 24);
    return self;
  }
  update(element: ConeGeometry): void {}
  remove(element: ConeGeometry): void {}
}

export class CylinderGeometryVirtualNodeType extends SimpleNodeVirtualNodeType<CylinderGeometry, [side: number, ratio: number]> {
  getInputs(): PortDefinition[] {
    return [
      {
        id: "side",
        type: "number",
        defaultValue: 6,
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
  getOutput(): PortDefinition {
    return {
      id: "output",
      type: "mesh",
      defaultValue: null,
    };
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

export const GeometryVirtualNodeTypes = {
  ConeGeometryVirtualNodeType: new ConeGeometryVirtualNodeType(),
  BoxGeometryVirtualNodeType: new BoxGeometryVirtualNodeType(),
  SphereGeometryVirtualNodeType: new SphereGeometryVirtualNodeType(),
  CylinderGeometryVirtualNodeType: new CylinderGeometryVirtualNodeType(),
};
