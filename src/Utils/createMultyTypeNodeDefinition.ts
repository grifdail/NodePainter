import { NodeData } from "../Types/NodeData";
import { BaseNodeDefinition, LogicNodeDefinition, NodeDefinition } from "../Types/NodeDefinition";
import { PortType } from "../Types/PortType";
import { convertPortConnection } from "./convertPortConnection";
import { ExecutionContext } from "./createExecutionContext";
import { createPortConnection } from "./createPortConnection";

export function createMultiTypeNodeDefinition(
  base: BaseNodeDefinition,
  types: {
    [key in PortType]: LogicNodeDefinition;
  }
): NodeDefinition {
  const getShaderCode = (node: NodeData, context: ExecutionContext): string => {
    const type = types[node.selectedType];
    if (type !== undefined && typeof type.getShaderCode === "function") {
      return type.getShaderCode(node, context);
    } else {
      return "";
    }
  };

  const firstType = Object.entries(types)[0];
  return {
    ...base,
    getShaderCode: Object.values(types).some((type) => type.getShaderCode) ? getShaderCode : undefined,
    dataInputs: structuredClone(firstType[1].dataInputs),
    dataOutputs: structuredClone(firstType[1].dataOutputs),
    availableTypes: Object.keys(types) as PortType[],
    getData(portId: string, node: NodeData, context: ExecutionContext) {
      const type = types[node.selectedType];
      if (type !== undefined && typeof type.getData === "function") {
        return type.getData(portId, node, context);
      } else {
        return node.dataOutputs[portId].defaultValue;
      }
    },
    onChangeType(node, type, blackboard) {
      const typeData = types[type];
      if (typeData == undefined) {
        return;
      }
      if (typeData.dataInputs !== undefined) {
        node.dataInputs = Object.fromEntries(
          typeData.dataInputs.map((newDef) => {
            if (node.dataInputs[newDef.id]) {
              //Convert
              return [newDef.id, convertPortConnection(node.dataInputs[newDef.id], newDef)];
            } else {
              return [newDef.id, createPortConnection(newDef)];
            }
          })
        );
      }
      if (typeData.dataOutputs !== undefined) {
        node.dataOutputs = Object.fromEntries(typeData.dataOutputs.map((newDef) => [newDef.id, newDef]));
      }
    },
    hasInput(input) {
      const r = Object.entries(types).find(([type, variant]) => {
        return variant.dataInputs.some((port) => port.type === type);
      });
      if (r) {
        return r[0] as PortType;
      } else {
        return null;
      }
    },
    hasOutput(output) {
      const r = Object.entries(types).find(([type, variant]) => {
        return variant.dataOutputs.some((port) => port.type === type);
      });
      if (r) {
        return r[0] as PortType;
      } else {
        return null;
      }
    },
  };
}
