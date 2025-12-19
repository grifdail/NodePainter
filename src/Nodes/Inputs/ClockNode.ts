import { IconClock } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const ClockNode: NodeDefinition = {
    id: "Input/Clock",
    description: "The current system time.",
    icon: IconClock,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [
        { id: "hour24", type: "number", defaultValue: 0 },
        { id: "hour12", type: "number", defaultValue: 0 },
        { id: "minute", type: "number", defaultValue: 0 },
        { id: "seconds", type: "number", defaultValue: 0 },
    ],

    settings: [],
    getData: (portId, node, context) => {
        if (portId === "hour24") {
            return context.p5.hour();
        }
        if (portId === "hour12") {
            return context.p5.hour() % 12;
        }
        if (portId === "minute") {
            return context.p5.minute();
        }
        if (portId === "seconds") {
            return context.p5.second();
        }
    },
};
