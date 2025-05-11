import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateMaterialNodeFromVirtualNode, generateNodeFromVirtualNode } from "./generateNodeFromVirtualNode";
import { Render3D } from "./Render3D";
import { RenderModel } from "./RenderModel";
import { GeometryVirtualNodeTypes } from "./VirtualNodeTypes/Geometry";
import { LightVirtualNodeTypes } from "./VirtualNodeTypes/LightVirtualNodeType";
import { MaterialsVirtualNodes } from "./VirtualNodeTypes/MaterialsVirtualNodes";

export const LightNodes: NodeDefinition[] = Object.values(LightVirtualNodeTypes).map((gen) => generateNodeFromVirtualNode(gen));
export const MaterialNodes: NodeDefinition[] = Object.values(MaterialsVirtualNodes).map((gen) => generateMaterialNodeFromVirtualNode(gen));
export const GeometryNodes: NodeDefinition[] = Object.values(GeometryVirtualNodeTypes).map((gen) => generateNodeFromVirtualNode(gen));

export const Nodes3D = [
  ...LightNodes,
  ...MaterialNodes,
  ...GeometryNodes,
  Render3D,
  //UploadModel,
  //GenerateUVModel,
  RenderModel,
];
