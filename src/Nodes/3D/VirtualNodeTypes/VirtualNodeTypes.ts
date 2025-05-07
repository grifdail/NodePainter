import { BoxType } from "./BoxType";
import { Compose3DVirtualNodeType } from "./Compose3DVirtualNodeType";
import { FlatMaterialType, StandardMaterialType } from "./MaterialsVirtualNodes";
import { Render3DType } from "./Render3DType";

export const VirtualNodes = {
  FlatMaterialType: new FlatMaterialType(),
  StandardMaterialType: new StandardMaterialType(),
  Compose3DVirtualNodeType: new Compose3DVirtualNodeType(),
  Render3DType: new Render3DType(),
  BoxType: new BoxType(),
};

export type VirtualNodeTypes = keyof typeof VirtualNodes;
