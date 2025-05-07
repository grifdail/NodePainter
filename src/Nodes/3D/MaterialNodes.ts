import { NodeDefinition } from "../../Types/NodeDefinition";
import { MaterialsVirtualNodes } from "./VirtualNodeTypes/MaterialsVirtualNodes";
import { generateNodeFromVirtualNode } from "./generateNodeFromVirtualNode";

export const MaterialNodes: NodeDefinition[] = Object.values(MaterialsVirtualNodes).map((gen) => generateNodeFromVirtualNode(gen));
