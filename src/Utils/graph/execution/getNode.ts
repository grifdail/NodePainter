import { MetaNode } from "../../../Nodes/Misc/MetaNode";
import { NodeLibrary } from "../../../Nodes/Nodes";
import { START_NODE } from "../../../Nodes/StartNode";
import { NodeCollection } from "../../../Types/NodeCollection";
import { NodeData } from "../../../Types/NodeData";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export function getNode(tree: { nodes: NodeCollection }, id: string) {
    return tree.nodes[id];
}

export function getNodeStart(tree: { nodes: NodeCollection }) {
    return getNode(tree, START_NODE);
}

export function getInputPort(tree: { nodes: NodeCollection }, id: string, portId: string) {
    return tree.nodes[id].dataInputs[portId];
}

export function getOutputPort(tree: { nodes: NodeCollection }, id: string, portId: string) {
    return tree.nodes[id].dataOutputs[portId];
}

export function getSketchName(tree: { nodes: NodeCollection }) {
    return tree.nodes[START_NODE]?.settings["name"] as string || "sketch";
}
export function getSketchAuthor(tree: { nodes: NodeCollection }): string | undefined {
    return findNodesOfTypes(tree, MetaNode.id)[0]?.settings.author;
}
export function getSketchComment(tree: { nodes: NodeCollection }): string | undefined {
    return findNodesOfTypes(tree, MetaNode.id)[0]?.settings.comment;
}
export function findNodesOfTypes(tree: { nodes: NodeCollection }, nodeType: string) {
    return Object.values(tree.nodes).filter(item => item.type === nodeType)
}

export function getNodeTypeDefinition(tree: { nodes: NodeCollection, customNodes: { [key: string]: NodeDefinition } }, node: string | NodeData) {
    const type = typeof node === "string" ? node : node.type;
    var result = NodeLibrary[type] || tree.customNodes[type];
    console.assert(result != null, `${type} is not a valid node type.`);
    return result;
}

