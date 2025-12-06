import { NodeDefinition } from "../../Types/NodeDefinition";
import { BillBoardNode } from "./BillboardNode";
import { generateMaterialNodeFromVirtualNode, generateNodeFromVirtualNode } from "./generateNodeFromVirtualNode";
import { ParametricGeometry } from "./ParametricGeometry";
import { Render3D } from "./Render3D";
import { Render3DLine } from "./Render3DLine";
import { RenderModel } from "./RenderModel";
import { Transform3D } from "./Transform3D";
import { UploadModel } from "./UploadModel";
import { CameraVirtualElements } from "./VirtualNodeTypes/CameraVirtualElements";
import { GeometryVirtualNodeTypes } from "./VirtualNodeTypes/Geometry";
import { LightVirtualNodeTypes } from "./VirtualNodeTypes/LightVirtualNodeType";
import { MaterialsVirtualNodes } from "./VirtualNodeTypes/MaterialsVirtualNodes";

export const LightNodes: NodeDefinition[] = Object.values(LightVirtualNodeTypes).map((gen) => generateNodeFromVirtualNode(gen));
export const MaterialNodes: NodeDefinition[] = Object.values(MaterialsVirtualNodes).map((gen) => generateMaterialNodeFromVirtualNode(gen));
export const GeometryNodes: NodeDefinition[] = Object.values(GeometryVirtualNodeTypes).map((gen) => generateNodeFromVirtualNode(gen));
export const CameraNodes: NodeDefinition[] = Object.values(CameraVirtualElements).map((gen) => generateNodeFromVirtualNode(gen));

export const Nodes3D = [
  ...LightNodes,
  ...MaterialNodes,
  ...GeometryNodes,
  ...CameraNodes,
  Render3D,
  UploadModel,
  //GenerateUVModel,
  RenderModel,
  Render3DLine,
  Transform3D,
  ParametricGeometry,
  BillBoardNode
];
