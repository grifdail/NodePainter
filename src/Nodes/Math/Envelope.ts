import { IconEaseInOut } from "@tabler/icons-react";
import { createDefaultEnvelope, EnvelopeData, interpolateEnvelope } from "../../Types/EnvelopeData";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const Envelope: NodeDefinition = {
  id: "Envelope",
  label: "Envelope",
  alias: "Curve",
  description: "Transform the value betwen 0 & 1 passed in to match the shape.",
  icon: IconEaseInOut,
  tags: ["Math"],
  dataInputs: [{ id: "pos", type: "number", defaultValue: 0 }],
  dataOutputs: [{ id: "value", type: "number", defaultValue: 0 }],

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
