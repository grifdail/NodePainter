import { IconTrendingDown3 } from "@tabler/icons-react";
import { clamp } from "three/src/math/MathUtils";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";

export const IntegrateSmoothDampNode: NodeDefinition = {
    id: "Math/Interpolation/IntegrateSmoothDamp",
    tags: ["Math"],
    icon: IconTrendingDown3,
    description: "Gradualy change a value in a smoothed way",
    featureLevel: 10,
    dataInputs: [
        {
            id: "position",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "velocity",
            type: "number",
            defaultValue: -1,
        },
        {
            id: "target",
            type: "number",
            defaultValue: 1,
        },
        {
            id: "smoothTime",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "maxSpeed",
            type: "number",
            defaultValue: 1,
        },
        Port.number("deltaTime", 1 / 60)
    ],
    dataOutputs: [
        {
            id: "next-position",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "next-velocity",
            type: "number",
            defaultValue: 0,
        },

    ],

    settings: [

    ],
    getData: (portId, node, context) => {
        const smoothTime = context.getInputValueNumber(node, "smoothTime");
        const maxSpeed = context.getInputValueNumber(node, "maxSpeed");
        const target = context.getInputValueNumber(node, "target");
        const position = context.getInputValueNumber(node, "position");
        const velocity = context.getInputValueNumber(node, "velocity");
        const deltaTime = context.getInputValueNumber(node, "deltaTime");
        var r = SmoothDamp(position, target, velocity, smoothTime, maxSpeed, deltaTime)
        if (portId === "next-position") {
            return r.output
        } else {
            return r.currentVelocity;
        }
    },
};


export function SmoothDamp(current: number, target: number, currentVelocity: number, smoothTime: number, maxSpeed: number = Number.POSITIVE_INFINITY, deltaTime = 1 / 60) {
    // Based on Game Programming Gems 4 Chapter 1.10
    smoothTime = Math.max(0.0001, smoothTime);
    const omega = 2 / smoothTime;

    const x = omega * deltaTime;
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
    let change = current - target;
    const originalTo = target;

    // Clamp maximum speed
    const maxChange = maxSpeed * smoothTime;
    change = clamp(change, -maxChange, maxChange);
    target = current - change;

    const temp = (currentVelocity + omega * change) * deltaTime;
    currentVelocity = (currentVelocity - omega * temp) * exp;
    let output = target + (change + temp) * exp;

    // Prevent overshooting
    if ((originalTo - current > 0.0) === (output > originalTo)) {
        output = originalTo;
        currentVelocity = (output - originalTo) / deltaTime;
    }

    return { output, currentVelocity };
}
