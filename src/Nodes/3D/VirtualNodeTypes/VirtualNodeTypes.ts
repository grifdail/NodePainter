import { ComposeVirtualNodeType } from "./Compose3DVirtualNodeType";
import { GenericModelVirtualNodeType } from "./GenericModelVirtualNodeType";
import { GeometryVirtualNodeTypes } from "./Geometry";
import { LightVirtualNodeTypes } from "./LightVirtualNodeType";
import { MaterialsVirtualNodes } from "./MaterialsVirtualNodes";
import { Render3DType } from "./Render3DType";

export const VirtualNodes = {
  ...MaterialsVirtualNodes,
  ...LightVirtualNodeTypes,
  ...GeometryVirtualNodeTypes,
  ComposeVirtualNodeType: new ComposeVirtualNodeType(),
  Render3DType: new Render3DType(),
  GenericModelVirtualNodeType: new GenericModelVirtualNodeType(),
};

export type VirtualNodeTypes = keyof typeof VirtualNodes;
