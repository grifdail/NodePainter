import { IconMathFunction } from "@tabler/icons-react";
import { inverseLerp } from "three/src/math/MathUtils";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { clamp01 } from "../../../Utils/math/clamp01";

export const StaggerNode: NodeDefinition = {
    id: "Math/Interpolation/Stagger",
    alias: "Mix",
    description: "Interpolate",
    icon: IconMathFunction,
    featureLevel: 50,
    tags: ["Math", "Vector"],
    dataInputs: [
        Port.number("time"),
        Port.number("index"),
        Port.number("count"),
        Port.number("duration")
    ],
    dataOutputs: [
        Port.number("out")
    ],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const time = context.getInputValueNumber(node, "time");
        const index = context.getInputValueNumber(node, "index");
        const count = context.getInputValueNumber(node, "count");
        const duration = context.getInputValueNumber(node, "duration");
        const startPoint = index / count * (1 - duration);
        return clamp01(inverseLerp(startPoint, startPoint + duration, time))
    }
};
