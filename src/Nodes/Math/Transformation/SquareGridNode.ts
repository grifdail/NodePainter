import { IconHexagons } from "@tabler/icons-react";
import { lerp } from "three/src/math/MathUtils";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2 } from "../../../Types/vectorDataType";
import { vectorAddition, vectorDivision, vectorSubstraction } from "../../../Utils/math/vectorUtils";



export const SquareGridNode: NodeDefinition = {
    id: "Math/Transformation/SquareGrid",
    description: "Convert positition on a square grid to position on a hex grid",
    icon: IconHexagons,
    tags: ["Vector"],
    dataInputs: [
        Port.vector2("index"),
        Port.vector2("size", createVector2(10, 10)),
        Port.bool("center", true),
        Port.vector2("start", createVector2(0, 0)),
        Port.vector2("end", createVector2(1, 1)),
    ],
    dataOutputs: [
        Port.vector2("pos"),
        Port.vector2("cell-dim"),
        Port.number("cell-dim-average")
    ],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const size = context.getInputValueVector2(node, "size");
        const start = context.getInputValueVector2(node, "start");
        const end = context.getInputValueVector2(node, "end");
        if (portId === "pos") {
            const pos = context.getInputValueVector2(node, "index");
            const center = context.getInputValueBoolean(node, "center");
            const pp = vectorDivision(center ? vectorAddition(pos, [0.5, 0.5]) : pos, size);
            const result = [
                lerp(start[0], end[0], pp[0]),
                lerp(start[1], end[1], pp[1])
            ]
            return result
        }
        const dt = vectorSubstraction(end, start)
        var cSize = createVector2(1 / size[0] * dt[0], 1 / size[1] * dt[0]);
        if (portId === "cell-dim") {
            return cSize;
        } else {
            return (cSize[0] + cSize[1]) / 2
        }
    },
};
