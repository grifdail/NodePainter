import { NodeData } from "../Types/NodeData";
import { ExecutionContext } from "./createExecutionContext";

export function useCache<T>(context: ExecutionContext, nodeData: NodeData, gen: () => T, cacheInput: string | null = "cache-id", cacheId: number = 0): T {
  cacheId = cacheId === null ? cacheId : Math.floor(context.getInputValueNumber(nodeData, cacheInput as string));
  const cacheKey = `random-${nodeData.id}-${cacheId}`;
  const value = context.blackboard[cacheKey] !== undefined ? context.blackboard[cacheKey] : gen();
  context.blackboard[cacheKey] = value;
  return value;
}
