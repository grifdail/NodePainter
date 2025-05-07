import { MeshBasicMaterial, MeshDepthMaterial, MeshNormalMaterial, MeshStandardMaterial } from "three";
import { PortDefinition } from "../../../Types/PortDefinition";
import { Color } from "../../../Types/vectorDataType";
import { toThreeColor, White } from "../../../Utils/colorUtils";
import { MaterialVirtualNodeType } from "./SimpleNodeVirtualNodeType";

export class FlatMaterialType extends MaterialVirtualNodeType<MeshBasicMaterial, [color: Color]> {
  getId(): string {
    return "FlatMaterial";
  }
  getDescription(): string {
    return "Render an object with solid color, ignoring light";
  }
  create(color: Color): MeshBasicMaterial {
    return new MeshBasicMaterial({ color: toThreeColor(color) });
  }
  remove(element: MeshBasicMaterial): void {
    element.dispose();
  }
  update(element: MeshBasicMaterial, color: Color): void {
    element.color.set(toThreeColor(color));
  }
  getInputs(): PortDefinition[] {
    return [
      {
        id: "color",
        type: "color",
        defaultValue: White(),
      },
    ];
  }
}

export class StandardMaterialType extends MaterialVirtualNodeType<MeshStandardMaterial, [color: Color, roughness: number, metalness: number]> {
  getId(): string {
    return "StandardMaterial";
  }
  getDescription(): string {
    return "Render an object with physicaly based shader";
  }
  create(color: Color, roughness: number, metalness: number): MeshStandardMaterial {
    return new MeshStandardMaterial({ color: toThreeColor(color), roughness, metalness });
  }
  remove(element: MeshStandardMaterial): void {
    element.dispose();
  }
  update(element: MeshStandardMaterial, color: Color, roughness: number, metalness: number): void {
    element.color.set(toThreeColor(color));
    element.roughness = roughness;
    element.metalness = metalness;
  }
  getInputs(): PortDefinition[] {
    return [
      {
        id: "color",
        type: "color",
        defaultValue: White(),
      },
      {
        id: "roughness",
        type: "number",
        defaultValue: 0.5,
      },
      {
        id: "metalness",
        type: "number",
        defaultValue: 0.5,
      },
    ];
  }
}

export class NormalMaterialVirtualNodeType extends MaterialVirtualNodeType<MeshNormalMaterial, []> {
  getId(): string {
    return "NormalMaterial";
  }
  getDescription(): string {
    return "Render an object to display their normal vector";
  }
  create(): MeshNormalMaterial {
    return new MeshNormalMaterial({});
  }
  remove(element: MeshNormalMaterial): void {
    element.dispose();
  }
  update(element: MeshNormalMaterial): void {}
  getInputs(): PortDefinition[] {
    return [];
  }
}

export class DepthMaterialVirtualNodeType extends MaterialVirtualNodeType<MeshDepthMaterial, []> {
  getId(): string {
    return "DepthMaterial";
  }
  getDescription(): string {
    return "Render an object to display their depth relative to the camera";
  }
  create(): MeshDepthMaterial {
    return new MeshDepthMaterial({});
  }
  remove(element: MeshDepthMaterial): void {
    element.dispose();
  }
  update(element: MeshDepthMaterial): void {}
  getInputs(): PortDefinition[] {
    return [];
  }
}

export const MaterialsVirtualNodes = {
  FlatMaterialType: new FlatMaterialType(),
  StandardMaterialType: new StandardMaterialType(),
  NormalMaterialVirtualNodeType: new NormalMaterialVirtualNodeType(),
  DepthMaterialVirtualNodeType: new DepthMaterialVirtualNodeType(),
};
