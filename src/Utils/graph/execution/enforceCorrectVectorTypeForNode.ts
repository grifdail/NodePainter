import { NodeData } from "../../../Types/NodeData";

export function enforceCorrectVectorTypeForNode(nodeData: NodeData, arg1: number[]): any {
  return nodeData.selectedType === "number" ? arg1[0] : arg1;
}
