import { nanoid } from "nanoid";
import { NodeDefinition } from "../Types/NodeDefinition";
import { createPortConnectionsForInputsDefinition } from "./createPortConnectionsForInputsDefinition";
import { createSettingObjectForSettingDefinition } from "./createSettingObjectForSettingDefinition";
import { createExecOutputData } from "./createExecOutputData";
import { createDataOutputData } from "./createDataOutputData";
import { NodeData } from "../Types/NodeData";

export function createNodeData(def: NodeDefinition, x: number, y: number, id: string | null = null, graph: string | undefined = undefined): NodeData {
  return {
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
}
