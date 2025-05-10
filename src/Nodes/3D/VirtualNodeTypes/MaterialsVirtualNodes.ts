import { AdditiveBlending, BackSide, Blending, DoubleSide, FrontSide, Material, MeshBasicMaterial, MeshDepthMaterial, MeshNormalMaterial, MeshStandardMaterial, MultiplyBlending, NoBlending, NormalBlending, RGBDepthPacking, SubtractiveBlending } from "three";
import { PortDefinition } from "../../../Types/PortDefinition";
import { Color } from "../../../Types/vectorDataType";
import { toThreeColor, White } from "../../../Utils/colorUtils";
import { MaterialGenericData } from "./MaterialGenericData";
import { MaterialVirtualNodeType } from "./SimpleNodeVirtualNodeType";

function toThreeSetting({ blendingMode, side, ...rest }: MaterialGenericData) {
  return { ...rest, blending: convertToThreeBlending(blendingMode), side: convertToThreeSide(side) };
}
function convertToThreeBlending(blendingMode: "NoBlending" | "NormalBlending" | "AdditiveBlending" | "SubtractiveBlending" | "MultiplyBlending"): Blending {
  switch (blendingMode) {
    case "NoBlending":
      return NoBlending;
    case "NormalBlending":
      return NormalBlending;
    case "AdditiveBlending":
      return AdditiveBlending;
    case "SubtractiveBlending":
      return SubtractiveBlending;
    case "MultiplyBlending":
      return MultiplyBlending;
  }
}
function convertToThreeSide(side: "FrontSide" | "BackSide" | "DoubleSide") {
  switch (side) {
    case "FrontSide":
      return FrontSide;
    case "BackSide":
      return BackSide;
    case "DoubleSide":
      return DoubleSide;
  }
}

function updateTreeMaterial(mat: Material, changeRaw: MaterialGenericData) {
  const change = toThreeSetting(changeRaw);
  if (mat.alphaTest !== change.alphaTest) {
    mat.alphaTest = change.alphaTest;
    mat.needsUpdate = true;
  }
  if (mat.transparent !== change.transparent) {
    mat.transparent = change.transparent;
    mat.needsUpdate = true;
  }
  if (mat.blending !== change.blending) {
    mat.blending = change.blending;
    mat.needsUpdate = true;
  }
  if (mat.side !== change.side) {
    mat.side = change.side;
    mat.needsUpdate = true;
  }
  var matAny = mat as any;
  if (matAny.wireframe !== undefined && matAny.wireframe != change.wireframe) {
    matAny.wireframe = change.wireframe;
    mat.needsUpdate = true;
  }
  if (matAny.flatShading !== undefined && matAny.flatShading != change.flatShading) {
    matAny.flatShading = change.flatShading;
    mat.needsUpdate = true;
  }
}

export class FlatMaterialType extends MaterialVirtualNodeType<MeshBasicMaterial, [color: Color, mat: MaterialGenericData]> {
  getId(): string {
    return "FlatMaterial";
  }
  getDescription(): string {
    return "Render an object with solid color, ignoring light";
  }
  create(color: Color, mat: MaterialGenericData): MeshBasicMaterial {
    return new MeshBasicMaterial({ color: toThreeColor(color), ...toThreeSetting(mat) });
  }
  remove(element: MeshBasicMaterial): void {
    element.dispose();
  }
  update(element: MeshBasicMaterial, color: Color, mat: MaterialGenericData): void {
    element.color.set(toThreeColor(color));
    updateTreeMaterial(element, mat);
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

export class StandardMaterialType extends MaterialVirtualNodeType<MeshStandardMaterial, [color: Color, roughness: number, metalness: number, mat: MaterialGenericData]> {
  getId(): string {
    return "StandardMaterial";
  }
  getDescription(): string {
    return "Render an object with physicaly based shader";
  }
  create(color: Color, roughness: number, metalness: number, mat: MaterialGenericData): MeshStandardMaterial {
    return new MeshStandardMaterial({ color: toThreeColor(color), roughness, metalness, ...toThreeSetting(mat) });
  }
  remove(element: MeshStandardMaterial): void {
    element.dispose();
  }
  update(element: MeshStandardMaterial, color: Color, roughness: number, metalness: number, mat: MaterialGenericData): void {
    element.color.set(toThreeColor(color));
    element.roughness = roughness;
    element.metalness = metalness;
    updateTreeMaterial(element, mat);
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

export class NormalMaterialVirtualNodeType extends MaterialVirtualNodeType<MeshNormalMaterial, [mat: MaterialGenericData]> {
  getId(): string {
    return "NormalMaterial";
  }
  getDescription(): string {
    return "Render an object to display their normal vector";
  }
  create(mat: MaterialGenericData): MeshNormalMaterial {
    return new MeshNormalMaterial({ ...toThreeSetting(mat) });
  }
  remove(element: MeshNormalMaterial): void {
    element.dispose();
  }
  update(element: MeshNormalMaterial, mat: MaterialGenericData): void {
    updateTreeMaterial(element, mat);
  }
  getInputs(): PortDefinition[] {
    return [];
  }
}

export class DepthMaterialVirtualNodeType extends MaterialVirtualNodeType<MeshDepthMaterial, [mat: MaterialGenericData]> {
  getId(): string {
    return "DepthMaterial";
  }
  getDescription(): string {
    return "Render an object to display their depth relative to the camera";
  }
  create(mat: MaterialGenericData): MeshDepthMaterial {
    return new MeshDepthMaterial({ depthPacking: RGBDepthPacking, ...toThreeSetting(mat) });
  }
  remove(element: MeshDepthMaterial): void {
    element.dispose();
  }
  update(element: MeshDepthMaterial, mat: MaterialGenericData): void {
    updateTreeMaterial(element, mat);
  }
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
