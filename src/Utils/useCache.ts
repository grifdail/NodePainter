import { NodeData } from "../Types/NodeData";
import { ExecutionContext } from "./createExecutionContext";

type CacheKeyDef =
  | {
      key?: string;
    }
  | {
      key?: string;
      cacheIdInput: string;
    }
  | {
      key?: string;
      cacheIdInputs: string[];
    };

export function createOrSelectFromCache<T>(context: ExecutionContext, nodeData: NodeData, gen: () => T, cacheId: string | undefined = undefined): T {
  let cacheKey = getCacheKey(cacheId, context, nodeData);
  const value = context.blackboard[cacheKey] !== undefined ? context.blackboard[cacheKey] : gen();
  context.blackboard[cacheKey] = value;
  return value;
}

export function readAndUpdateFromCache<T>(context: ExecutionContext, nodeData: NodeData, cacheId: string | undefined = undefined): [T | null, (v: T) => void] {
  let cacheKey = getCacheKey(cacheId, context, nodeData);
  const value = context.blackboard[cacheKey] !== undefined ? context.blackboard[cacheKey] : null;
  return [
    value,
    (v: T) => {
      context.blackboard[cacheKey] = v;
    },
  ];
}

export function updateAndReadPreviousFromCache<T>(context: ExecutionContext, nodeData: NodeData, newValue: T, cacheId: string | undefined = undefined): T {
  let cacheKey = getCacheKey(cacheId, context, nodeData);
  const value = context.blackboard[cacheKey] !== undefined ? context.blackboard[cacheKey] : newValue;
  context.blackboard[cacheKey] = newValue;
  return value;
}
export function updateAndReadFromCache<T>(context: ExecutionContext, nodeData: NodeData, set: (value: T | undefined) => T, cacheId: string | undefined = undefined): T {
  let cacheKey = getCacheKey(cacheId, context, nodeData);
  let value = context.blackboard[cacheKey] !== undefined ? context.blackboard[cacheKey] : undefined;
  const newValue = set(value);
  context.blackboard[cacheKey] = newValue;
  return newValue;
}

function getCacheKey(cacheId: string | undefined, context: ExecutionContext, nodeData: NodeData) {
  cacheId = cacheId || Math.floor(context.getInputValueNumber(nodeData, "cache-id" as string)).toString();
  const cacheKey = `cache-${nodeData.id}-${cacheId}`;
  return cacheKey;
}
