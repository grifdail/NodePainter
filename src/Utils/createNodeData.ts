import { nanoid } from "nanoid";
import { NodeData } from "../Types/NodeData";
import { NodeDefinition } from "../Types/NodeDefinition";
import { createDataOutputData } from "./createDataOutputData";
import { createExecOutputData } from "./createExecOutputData";
import { createPortConnectionsForInputsDefinition } from "./createPortConnectionsForInputsDefinition";
import { createSettingObjectForSettingDefinition } from "./createSettingObjectForSettingDefinition";

export function createNodeData(def: NodeDefinition, x: number, y: number, id: string | null = null, graph: string | undefined = undefined): NodeData {
  var node = {
    type: def.id,
    id: id || "node" + nanoid().replaceAll("_", "y"),
    dataInputs: createPortConnectionsForInputsDefinition(def),
    settings: createSettingObjectForSettingDefinition(def),
    dataOutputs: createDataOutputData(def),
    execOutputs: createExecOutputData(def),
    positionX: x,
    positionY: y,
    selectedType: def.defaultType ? def.defaultType : def.availableTypes ? def.availableTypes[0] : "unknown",
    graph: graph,
  };
  if (def.onChangeType && def.availableTypes !== undefined) {
    def.onChangeType(node, def.defaultType || def.availableTypes[0]);
  }
  if (def.onCreate) {
    def.onCreate(node);
  }
  return node;
}
