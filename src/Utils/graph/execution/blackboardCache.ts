import { NodeData } from "../../../Types/NodeData";

import { ExecutionContext } from "./createExecutionContext";


//Usefull for storing stuff that are never gonna need to be duplicated or modified, such as settings
export function readFromCacheStatic<T>(context: ExecutionContext, nodeData: NodeData, name: string, get: () => T, overrideVersion?: string): T {
    const cacheKey = `cache-static-${nodeData.id}-${name}`;
    let value = context.blackboard[cacheKey] as T | undefined;
    if (value === undefined) {
        value = get();
        context.blackboard[cacheKey] = value;
    }
    return value;
}


export function readFromCacheWithVersion<T>(context: ExecutionContext, nodeData: NodeData, get: (previous: T | undefined) => T, overrideVersion?: string, storageId: string = ""): T {
    const rawReset = "reset" in nodeData.dataInputs ? context.getInputValueBoolean(nodeData, "reset") : false;
    let version = "version" in nodeData.dataInputs ? context.getInputValueString(nodeData, "version") : "";
    version = overrideVersion || version
    const cacheId = Math.floor(context.getInputValueNumber(nodeData, "cache-id")).toString();
    const cacheKey = `cache-${nodeData.id}-${cacheId}-${storageId}`;
    const cacheKeyVersion = `cache-version-${nodeData.id}-${cacheId}-${storageId}`;

    const storedVersion = context.blackboard[cacheKeyVersion];
    const reset = rawReset || storedVersion !== version;
    let value = context.blackboard[cacheKey] as T | undefined;
    //console.log(version, storedVersion, storedVersion !== version);
    if (reset || value === undefined) {
        //If raw reseting, we pass undefined so that the value get initialized
        value = get(rawReset ? undefined : value);
        context.blackboard[cacheKey] = value;
        context.blackboard[cacheKeyVersion] = version;
    }
    return value;
}


