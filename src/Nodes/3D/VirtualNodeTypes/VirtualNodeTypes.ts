import { BoxType } from "./BoxType";
import { FlatMaterialType } from "./FlatMaterialType";
import { Render3DType } from "./Render3DType";
import { StandardMaterialType } from "./StandardMaterialType";

export const VirtualNodes = {
  FlatMaterialType: new FlatMaterialType(),
  StandardMaterialType: new StandardMaterialType(),
  Render3DType: new Render3DType(),
  BoxType: new BoxType(),
};

export type VirtualNodeTypes = keyof typeof VirtualNodes;
