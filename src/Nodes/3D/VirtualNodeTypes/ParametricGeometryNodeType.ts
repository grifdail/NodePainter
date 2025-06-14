import { BufferAttribute, BufferGeometry, PlaneGeometry } from "three";
import { PortDefinition } from "../../../Types/PortDefinition";
import { Vector2 } from "../../../Types/vectorDataType";
import { SimpleNodeVirtualNodeType } from "./SimpleNodeVirtualNodeType";

export class ParametricGeometryNodeType extends SimpleNodeVirtualNodeType<BufferGeometry, [dimension: Vector2, positions: Float32Array]> {
  getInputs(): PortDefinition[] {
    return [];
  }
  getOutput(): PortDefinition {
    return {
      id: "",
      type: "string",
      defaultValue: undefined,
    };
  }
  getId(): string {
    return "ParametricGeometry";
  }
  getDescription(): string {
    return "";
  }
  create(dimension: Vector2, positions: Float32Array): BufferGeometry {
    const self = new BufferGeometry();
    var indices = new Array(6 * dimension[0] * dimension[1]);
    var UV = new Float32Array(2 * (dimension[0] + 1) * (dimension[1] + 1));
    let tri = 0;
    for (var x = 0; x <= dimension[0]; x++) {
      for (var y = 0; y <= dimension[1]; y++) {
        UV[(x * (dimension[1] + 1) + y) * 2 + 0] = x / dimension[0];
        UV[(x * (dimension[1] + 1) + y) * 2 + 1] = y / dimension[1];
      }
    }

    for (var x = 1; x <= dimension[0]; x++) {
      for (var y = 1; y <= dimension[1]; y++) {
        var indexTopLeft = (x - 1) * (dimension[1] + 1) + (y - 1);
        var indexTopRight = x * (dimension[1] + 1) + (y - 1);
        var indexBottomLeft = (x - 1) * (dimension[1] + 1) + y;
        var indexBottomRight = x * (dimension[1] + 1) + y;
        if ((x + y) % 2 === 0) {
          indices[tri + 0] = indexTopLeft;
          indices[tri + 1] = indexTopRight;
          indices[tri + 2] = indexBottomLeft;
          indices[tri + 3] = indexBottomLeft;
          indices[tri + 4] = indexTopRight;
          indices[tri + 5] = indexBottomRight;
        } else {
          indices[tri + 0] = indexTopLeft;
          indices[tri + 1] = indexTopRight;
          indices[tri + 2] = indexBottomRight;
          indices[tri + 3] = indexBottomRight;
          indices[tri + 4] = indexBottomLeft;
          indices[tri + 5] = indexTopLeft;
        }
        tri += 6;
      }
    }
    self.setIndex(indices);
    self.setAttribute("position", new BufferAttribute(positions, 3));
    self.setAttribute("uv", new BufferAttribute(UV, 2));
    return self;
  }
  update(element: PlaneGeometry): void {}
  remove(element: PlaneGeometry): void {}
  getHash(dimension: Vector2, positions: Float32Array): string {
    return `${Math.floor(dimension[0])} - ${Math.floor(dimension[1])}`;
  }
}
