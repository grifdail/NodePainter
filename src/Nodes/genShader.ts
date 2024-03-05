import { NodeData } from "../Hooks/useTree";
import { ExecutionContext } from "../Data/createExecutionContext";

export function genShader(node: NodeData, context: ExecutionContext, type: string, output: string, inputs: string[], gen: (arg: string[]) => string) {
  return `  ${type} ${context.getShaderVar(node, output, true)} = ${gen(inputs.map((item) => context.getShaderVar(node, item)))};`;
}
