import { IconBulb } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { SimpleNodeVirtualNodeType } from "./VirtualNodeTypes/SimpleNodeVirtualNodeType";

export function generateNodeFromVirtualNode(materialVirtualNodeType: SimpleNodeVirtualNodeType<any, any>): NodeDefinition {
  var inputs = materialVirtualNodeType.getInputs();
  return {
    id: materialVirtualNodeType.getId(),
    label: materialVirtualNodeType.getLabel(),
    description: materialVirtualNodeType.getDescription(),
    icon: IconBulb,
    tags: ["3D", ...materialVirtualNodeType.getTags()],
    dataInputs: inputs,
    dataOutputs: [materialVirtualNodeType.getOutput()],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      const params = inputs.map((port) => context.getInputValue(nodeData, port.id, port.type));
      return materialVirtualNodeType.generate(context.getCallId(nodeData, materialVirtualNodeType.getHash(...params)), [], ...params);
    },
  };
}
