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
    tags: ["3D", "Material"],
    dataInputs: inputs,
    dataOutputs: [materialVirtualNodeType.getOutput()],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return materialVirtualNodeType.generate(context.getCallId(nodeData), [], ...inputs.map((port) => context.getInputValue(nodeData, port.id, port.type)));
    },
  };
}
