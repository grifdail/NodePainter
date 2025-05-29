import { NodeData } from "../Types/NodeData";
import { PortType } from "../Types/PortType";
import { ExecutionContext } from "./createExecutionContext";
import { getShaderType } from "./getShaderCode";

export function generateShaderCodeFromNodeData(node: NodeData, context: ExecutionContext, outputName: string, inputNames: string[] | { [key: string]: PortType }, gen: (arg: { [key: string]: string }) => string) {
  const outputPort = node.dataOutputs[outputName];
  if (outputPort == null) {
    throw new Error(`Port with output '${outputName} does not exist in node ${node.type}.`);
  }
  if (Array.isArray(inputNames)) {
    inputNames = Object.fromEntries(inputNames.map((key) => [key, node.dataInputs[key].type]));
  }
  const args = Object.fromEntries(Object.entries(inputNames).map(([key, type]) => [key, context.getShaderVar(node, key, type)]));

  return `  ${getShaderType(outputPort.type)} ${context.getShaderVar(node, outputName, outputPort.type, true)} = ${gen(args)};`;
}
