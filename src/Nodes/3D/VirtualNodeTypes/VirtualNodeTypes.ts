import { BoxType } from "./BoxType";
import { FlatMaterialType } from "./FlatMaterialType";
import { Render3DType } from "./Render3DType";

export const VirtualNodes = {
  FlatMaterialType: new FlatMaterialType(),
  Render3DType: new Render3DType(),
  BoxType: new BoxType(),
};

export type VirtualNodeTypes = keyof typeof VirtualNodes;
