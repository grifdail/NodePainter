import { nanoid } from "nanoid";
import { NodeData } from "../../../Types/NodeData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createObjectFromOutputPortDefinition } from "./createObjectFromOutputPortDefinition";
import { createPortConnectionsForInputsDefinition } from "./createPortConnectionsForInputsDefinition";
import { createSettingObjectForSettingDefinition } from "./createSettingObjectForSettingDefinition";

export function createNodeData(def: NodeDefinition, x: number, y: number, id: string | null = null, graph: string | undefined = undefined): NodeData {
    var node: NodeData = {
        type: def.id,
        id: id || `${def.id.replaceAll("/", "_")}_${nanoid()}`.replaceAll("_", "y"),
        dataInputs: createPortConnectionsForInputsDefinition(def),
        settings: createSettingObjectForSettingDefinition(def.settings),
        dataOutputs: createObjectFromOutputPortDefinition(def),
        positionX: x,
        positionY: y,
        selectedType: def.availableTypes ? def.availableTypes[0] : "unknown",
        graph: graph,
    };
    if (def.onChangeType && def.availableTypes !== undefined) {
        def.onChangeType(node, def.availableTypes[0]);
    }
    return node;
}
