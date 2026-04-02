import { IconRulerMeasure } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";

export const GreatCircleDistanceNode: NodeDefinition = {
    id: "Math/Advanced/GreatCircleDistance",
    tags: ["Math"],
    icon: IconRulerMeasure,
    description: "Return the distance along the great circle of a sphere between two point definite by their coordinate in radiant",
    dataInputs: [
        Port.number("lat1"),
        Port.number("lon1"),
        Port.number("lat2"),
        Port.number("lon2"),
        Port.number("radius", 6371),

    ],
    dataOutputs: [
        {
            id: "result",
            type: "number",
            defaultValue: 0,
        },
    ],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const lat1 = context.getInputValueNumber(node, "lat1");
        const lon1 = context.getInputValueNumber(node, "lon1");
        const lat2 = context.getInputValueNumber(node, "lat2");
        const lon2 = context.getInputValueNumber(node, "lon2");
        const r = context.getInputValueNumber(node, "radius");
        return haversineDistance(lat1, lon1, lat2, lon2, r);
    },
};



/**
 * Return the distance along the great circle of a sphere between two point definite by their coordinate in radiant
 * @param lat1 
 * @param lon1 
 * @param lat2 
 * @param lon2 
 * @param r 
 * @returns 
 */
export const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number, r: number) => {
    const dlat = 0.5 - Math.cos(lat2 - lat1) * 0.5;
    const dlon = (1 - Math.cos(lon2 - lon1)) * 0.5;
    const combined = dlat + Math.cos(lat1) * Math.cos(lat2) * dlon;
    return 2 * r * Math.asin(Math.sqrt(combined));
};
