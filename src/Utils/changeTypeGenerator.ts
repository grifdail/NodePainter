import { NodeData } from "../Types/NodeData";
import { PortChangeFunction } from "../Types/NodeDefinition";
import { PortType } from "../Types/PortType";
import { convertTypeValue } from "./convertTypeValue";

export function changeTypeGenerator(inputs: string[], outputs: string[], arrayInput: string[] = [], arrayOutput: string[] = [], blackboardChanger?: PortChangeFunction): PortChangeFunction {
  return (node: NodeData, type: PortType, blackboards: NodeData[]) => {
    inputs.forEach((key) => {
      node.dataInputs[key].ownValue = convertTypeValue(node.dataInputs[key].ownValue, node.dataInputs[key].type, type);
      node.dataInputs[key].type = type;
    });
    arrayInput.forEach((key) => {
      node.dataInputs[key].ownValue = convertTypeValue(node.dataInputs[key].ownValue, node.dataInputs[key].type, `array-${type}` as PortType);
      node.dataInputs[key].type = `array-${type}` as PortType;
    });
    outputs.forEach((key) => {
      node.dataOutputs[key].type = type;
    });
    arrayOutput.forEach((key) => {
      node.dataOutputs[key].type = `array-${type}` as PortType;
    });
    if (blackboardChanger && blackboards) {
      blackboards.forEach((bbnode) => blackboardChanger(bbnode, type, []));
    }
  };
}
