import { NodeData } from "../Types/NodeData";
import { ExecutionContext } from "./createExecutionContext";

export function useCache<T>(context: ExecutionContext, nodeData: NodeData, gen: () => T, cacheInputName: string | null = "cache-id", cacheId: any = undefined): T {
  cacheId = cacheId || Math.floor(context.getInputValueNumber(nodeData, cacheInputName as string));
  const cacheKey = `random-${nodeData.id}-${cacheId}`;
  const value = context.blackboard[cacheKey] !== undefined ? context.blackboard[cacheKey] : gen();
  context.blackboard[cacheKey] = value;
  return value;
}
