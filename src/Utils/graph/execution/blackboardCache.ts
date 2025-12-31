import { NodeData } from "../../../Types/NodeData";
import { CACHE_BEHAVIOR, CACHE_BEHAVIOR_ID } from "../definition/cacheBehaviorSetting";
import { FRAME_CACHE_ID } from "../definition/FrameCacheSetting";
import { ExecutionContext } from "./createExecutionContext";

/* eslint-disable react-hooks/rules-of-hooks */

export function readFromCache<T>(context: ExecutionContext, nodeData: NodeData, defaultValueGenerator: () => T, cacheId: string | undefined = undefined, reset: boolean = false): T {
    let [value, setValue] = useCache(context, nodeData, cacheId);
    if (value === undefined || reset) {
        value = defaultValueGenerator();
        setValue(value);
    }
    return value;
}

export function processAndUpdateCache<T>(context: ExecutionContext, node: NodeData, gen: () => T, updater: (previous: T) => T): T {
    let [previous, setValue] = useCache(context, node);
    let value = updater(previous === undefined ? gen() : previous);
    setValue(value);
    return value;
}

export function useFrameCache<T>(context: ExecutionContext, nodeData: NodeData, gen: () => T, cacheId: string | undefined = undefined): T {
    if (FRAME_CACHE_ID in nodeData.settings && !nodeData.settings[FRAME_CACHE_ID]) {
        return gen();
    }
    let cacheKey = getCacheKey(cacheId, context, nodeData);
    const value = cacheKey in context.frameBlackboard ? context.frameBlackboard[cacheKey] : gen();
    context.frameBlackboard[cacheKey] = value;
    return value;
}

export function getCacheKey(cacheId: string | undefined, context: ExecutionContext, nodeData: NodeData) {
    cacheId = cacheId || Math.floor(context.getInputValueNumber(nodeData, "cache-id" as string)).toString();
    const cacheKey = `cache-${nodeData.id}-${cacheId}`;
    return cacheKey;
}

export function useCache(context: ExecutionContext, nodeData: NodeData, cacheId?: string): [any, (v: any) => void] {
    const reset = "reset" in nodeData.dataInputs ? context.getInputValueBoolean(nodeData, "reset") : false;
    cacheId = cacheId || Math.floor(context.getInputValueNumber(nodeData, "cache-id" as string)).toString();

    if (CACHE_BEHAVIOR_ID in nodeData.settings && nodeData.settings[CACHE_BEHAVIOR_ID] === CACHE_BEHAVIOR.Destroy) {

        return [undefined, () => { }];
    }

    if (CACHE_BEHAVIOR_ID in nodeData.settings && nodeData.settings[CACHE_BEHAVIOR_ID] === CACHE_BEHAVIOR.Destroy) {
        const previousCache = context.blackboard[`cache-${nodeData.id}-cache-id`];
        if (previousCache !== cacheId || reset) {
            context.blackboard[`cache-${nodeData.id}-cache-id`] = cacheId;
            context.blackboard[`cache-${nodeData.id}-value`] = undefined;
        }
        return [
            context.blackboard[`cache-${nodeData.id}-value`],
            (v) => {
                context.blackboard[`cache-${nodeData.id}-value`] = v;
            }
        ]

    } else {
        const cacheKey = `cache-${nodeData.id}-${cacheId}`;
        return [
            reset ? undefined : context.blackboard[cacheKey],
            (v) => {
                context.blackboard[cacheKey] = v
            }
        ];
    }
}
