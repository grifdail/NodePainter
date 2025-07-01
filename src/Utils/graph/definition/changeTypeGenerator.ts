import { portListIncludeType } from "../../../Components/Modals/portListIncludeType";
import { NodeData } from "../../../Types/NodeData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortType } from "../../../Types/PortType";
import { convertTypeValue } from "../execution/convertTypeValue";

export function changeTypeGenerator(availableTypes: PortType[], inputs: string[], outputs: string[], arrayInput: string[] = [], arrayOutput: string[] = []): Pick<NodeDefinition, "onChangeType" | "hasInput" | "hasOutput" | "availableTypes"> {
  return {
    onChangeType(node: NodeData, type: PortType) {
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
    },
    availableTypes,
    hasOutput(output, def) {
      if (availableTypes.includes(output) && outputs.length > 0) {
        return output;
      }
      if (output.startsWith("array-") && arrayOutput.length > 0 && availableTypes.includes(output.slice(6) as PortType)) {
        return output.slice(6) as PortType;
      }
      if (portListIncludeType(def.dataOutputs, output)) {
        return availableTypes[0];
      }
      return null;
    },
    hasInput(input, def) {
      if (availableTypes.includes(input) && inputs.length > 0) {
        return input;
      }
      if (input.startsWith("array-") && arrayInput.length > 0 && availableTypes.includes(input.slice(6) as PortType)) {
        return input.slice(6) as PortType;
      }
      if (portListIncludeType(def.dataOutputs, input)) {
        return availableTypes[0];
      }
      return null;
    },
  };
}

export function hasInputGenerator(ports: PortType[]): (t: PortType) => PortType | null {
  return (target: PortType) => {
    if (ports.includes(target)) {
      return target;
    }
    return null;
  };
}
