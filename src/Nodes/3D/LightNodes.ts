import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateNodeFromVirtualNode } from "./generateNodeFromVirtualNode";
import { LightVirtualNodeTypes } from "./VirtualNodeTypes/LightVirtualNodeType";

export const LightNodes: NodeDefinition[] = Object.values(LightVirtualNodeTypes).map((gen) => generateNodeFromVirtualNode(gen));
