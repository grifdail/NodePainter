import { NodeData } from "../../Types/NodeData";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { ExecutionContext } from "../../Utils/graph/execution/createExecutionContext";

export function getParamsChange<T>(context: ExecutionContext, node: NodeData, portId: string, type: PortType) {
    const newValue = context.getInputValue(node, portId, type) as T;
    const oldValue = getCache(context, node, portId, type) as T;
    const hasChanged = PortTypeDefinitions[type].equalityOperator ? !PortTypeDefinitions[type].equalityOperator(newValue, oldValue) : newValue !== oldValue;
    if (hasChanged) {
        saveToCache(context, node, portId, newValue);
    }
    return [hasChanged, newValue, oldValue] as const;
}
