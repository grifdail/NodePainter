import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";

export type BlackboardPortData = {
  key: string;
  label?: string;
  type: PortType;
  id: string;
};

export const Blackboard: NodeDefinition = {
  id: "Blackboard",
  description: "Execute an instruction multiple time",
  featureLevel: 100,
  icon: IconAssembly,
  tags: ["Misc"],
  dataInputs: [],
  dataOutputs: [],
  settings: [{ id: "blackboardData", defaultValue: null, type: "hidden" }],

  hideInLibrary: true,
  getData: (portId, nodeData, context) => {
    return context.blackboard[nodeData.settings.blackboardData[portId].key] || PortTypeDefinitions[nodeData.dataOutputs[portId].type].createDefaultValue();
  },
};
