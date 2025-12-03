import { NodeCollection } from "../../../Types/NodeCollection";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortType } from "../../../Types/PortType";
import { ExecutionContext } from "./createExecutionContext";
import { getNode, getNodeTypeDefinition } from "./getNode";


export function getPortValue(tree: { nodes: NodeCollection; customNodes: { [key: string]: NodeDefinition; }; }, nodeId: string, portId: string, context: ExecutionContext): [any, PortType] {

    const node = getNode(tree, nodeId);
    let def = getNodeTypeDefinition(tree, node);
    if (def.executeAs) {
        def = getNodeTypeDefinition(tree, def.executeAs);
    }
    var port = node.dataOutputs[portId];
    if (def.getData) {
        return [def.getData(portId, node, context), port.type];
    }
    return [undefined, "unknown"];
}
