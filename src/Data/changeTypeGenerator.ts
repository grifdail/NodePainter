import { PortType } from "./NodeDefinition";
import { convertTypeValue } from "./convertTypeValue";
import { NodeData } from "../Hooks/useTree";

export function changeTypeGenerator(inputs: string[], outputs: string[]) {
  return (node: NodeData, type: PortType) => {
    inputs.forEach((key) => {
      node.dataInputs[key].ownValue = convertTypeValue(node.dataInputs[key].ownValue, node.dataInputs[key].type, type);
      node.dataInputs[key].type = type;
    });
    outputs.forEach((key) => {
      node.dataOutputs[key].type = type;
    });
  };
}
