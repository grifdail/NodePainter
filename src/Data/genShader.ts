import { NodeData } from "../Hooks/useTree";
import { PortType } from "./NodeDefinition";
import { getShaderType } from "./convertToShaderValue";
import { ExecutionContext } from "./createExecutionContext";

export function genShader(node: NodeData, context: ExecutionContext, output: string, inputs: string[] | { [key: string]: PortType }, gen: (arg: { [key: string]: string }) => string) {
  const outputPort = node.dataOutputs[output];
  if (Array.isArray(inputs)) {
    inputs = Object.fromEntries(inputs.map((key) => [key, node.dataInputs[key].type]));
  }
  const args = Object.fromEntries(Object.entries(inputs).map(([key, type]) => [key, context.getShaderVar(node, key, type)]));
  console.log(args);
  return `  ${getShaderType(outputPort.type)} ${context.getShaderVar(node, output, outputPort.type, true)} = ${gen(args)};`;
}
