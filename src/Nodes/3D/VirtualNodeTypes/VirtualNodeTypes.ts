import { ComposeVirtualNodeType } from "./Compose3DVirtualNodeType";
import { GenericModelVirtualNodeType } from "./GenericModelVirtualNodeType";
import { GeometryVirtualNodeTypes } from "./Geometry";
import { LightVirtualNodeTypes } from "./LightVirtualNodeType";
import { Line3DVirtualNodeType } from "./Line3DVirtualNodeType";
import { MaterialsVirtualNodes } from "./MaterialsVirtualNodes";
import { ParametricGeometryNodeType } from "./ParametricGeometryNodeType";
import { Render3DType } from "./Render3DType";
import { TransformedObjectModelVirtualNodeType } from "./TransformedObjectModelVirtualNodeType";
import { UploadedModelVirtualNodeType } from "./UploadedModelVirtualNodeType";

export const VirtualNodes = {
  ...MaterialsVirtualNodes,
  ...LightVirtualNodeTypes,
  ...GeometryVirtualNodeTypes,
  ComposeVirtualNodeType: new ComposeVirtualNodeType(),
  Render3DType: new Render3DType(),
  GenericModelVirtualNodeType: new GenericModelVirtualNodeType(),
  Line3DVirtualNodeType: new Line3DVirtualNodeType(),
  UploadedModelVirtualNodeType: new UploadedModelVirtualNodeType(),
  TransformedObjectModelVirtualNodeType: new TransformedObjectModelVirtualNodeType(),
  ParametricGeometryNodeType: new ParametricGeometryNodeType(),
};

Object.entries(VirtualNodes).forEach(([name, virtualNode]) => {
  virtualNode.id = name as VirtualNodeTypes;
});

export type VirtualNodeTypes = keyof typeof VirtualNodes;
