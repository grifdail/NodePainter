import { BoxType } from "./BoxType";
import { Compose3DVirtualNodeType } from "./Compose3DVirtualNodeType";
import { LightVirtualNodeTypes } from "./LightVirtualNodeType";
import { MaterialsVirtualNodes } from "./MaterialsVirtualNodes";
import { Render3DType } from "./Render3DType";

export const VirtualNodes = {
  ...MaterialsVirtualNodes,
  ...LightVirtualNodeTypes,
  Compose3DVirtualNodeType: new Compose3DVirtualNodeType(),
  Render3DType: new Render3DType(),
  BoxType: new BoxType(),
};

export type VirtualNodeTypes = keyof typeof VirtualNodes;
