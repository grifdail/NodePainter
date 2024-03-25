import { IconEaseInOut } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { EnvelopeData } from "../../Types/EnvelopeData";
import { createDefaultEnvelope } from "../../Types/EnvelopeData";
import { interpolateEnvelope } from "../../Types/EnvelopeData";

export const Envelope: NodeDefinition = {
  id: "Envelope",
  label: "Envelope",
  description: "Transform the value betwen 0 & 1 passed in to match the shape.",
  icon: IconEaseInOut,
  tags: ["Math"],
  dataInputs: [{ id: "pos", type: "number", defaultValue: 0 }],
  dataOutputs: [{ id: "value", type: "number", defaultValue: 0 }],
  executeOutputs: [],
  settings: [
    {
      id: "envelope",
      type: "envelope",
      defaultValue: createDefaultEnvelope(),
    },
  ],
  getData: (portId, nodeData, context) => {
    const envelope = nodeData.settings["envelope"] as EnvelopeData;
    const pos = context.getInputValueNumber(nodeData, "pos");
    return interpolateEnvelope(envelope, pos);
  },
};
