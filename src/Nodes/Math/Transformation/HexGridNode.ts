import { IconHexagons } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2 } from "../../../Types/vectorDataType";
import { lerp } from "../../../Utils/math/lerp";
import { vectorAddition, vectorDivision } from "../../../Utils/math/vectorUtils";

enum HexType {
    FlatTop = "Flat Top",
    PointyTop = "Pointy Top",
}

const SQRT3_2 = Math.sqrt(3) / 2;

export const HexGridNode: NodeDefinition = {
    id: "Math/Transformation/HexGrid",
    description: "Convert positition on a square grid to position on a hex grid",
    icon: IconHexagons,
    tags: ["Vector"],
    dataInputs: [
        Port.vector2("index"),
        Port.vector2("size"),
        Port.vector2("start", createVector2(0, 0)),
        Port.vector2("end", createVector2(1, 1)),
        Port.bool("regularGrid", false)
    ],
    dataOutputs: [
        Port.vector2("pos"),
        Port.number("cell-dim")
    ],

    codeBlockType: "expression",
    settings: [{ type: "dropdown", id: "type", defaultValue: HexType.FlatTop, options: Object.values(HexType) }],
    getData: (portId, node, context) => {
        const size = context.getInputValueVector2(node, "size");
        const start = context.getInputValueVector2(node, "start");
        let end = context.getInputValueVector2(node, "end");
        const regularGrid = context.getInputValueBoolean(node, "regularGrid");
        const type = node.settings.type as HexType;
        const fSize = vectorAddition(size, [-1, -1])
        const max = type === HexType.FlatTop ? createVector2(fSize[0] * 0.75, (fSize[1] + 0.5) * SQRT3_2) : createVector2((fSize[0] + 0.5) * SQRT3_2, fSize[1] * 0.75)

        if (regularGrid) {
            end = type === HexType.PointyTop ? [end[0], start[1] + (end[0] - start[0]) * SQRT3_2] : [start[0] + (end[1] - start[1]) * SQRT3_2 * SQRT3_2, end[1]]
        }
        if (portId === "pos") {
            const index = context.getInputValueVector2(node, "index");
            const x = index[0];
            const y = index[1];
            const v = type === HexType.FlatTop ? createVector2(x * 0.75, (y + ((x % 2) ? 0.5 : 0)) * SQRT3_2) : createVector2((x + ((y % 2) ? 0.5 : 0)) * SQRT3_2, y * 0.75);
            let vv = vectorDivision(v, max);

            return [
                lerp(start[0], end[0], vv[0]),
                lerp(start[1], end[1], vv[1]),
            ];
        } else {
            return 1 / fSize[0] * 0.5 * (end[0] - start[0])
        }

    },
};
