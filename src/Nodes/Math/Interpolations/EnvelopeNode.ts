import { IconEaseInOut } from "@tabler/icons-react";
import { createDefaultEnvelope, EnvelopeData, interpolateEnvelope } from "../../../Types/EnvelopeData";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const EnvelopeNode: NodeDefinition = {
    id: "Math/Interpolation/Envelope",
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
    getData: (portId, node, context) => {
        const envelope = node.settings["envelope"] as EnvelopeData;
        const pos = context.getInputValueNumber(node, "pos");
        return interpolateEnvelope(envelope, pos);
    },
};
