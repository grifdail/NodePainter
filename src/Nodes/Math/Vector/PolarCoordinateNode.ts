import { IconAngle, IconArrowUpRightCircle } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createVector2 } from "../../../Types/vectorDataType";

export const PolarCoordinateNode: NodeDefinition = {
    id: "Math/Vector/PolarCoordinate",
    alias: "Vector From Angle",
    description: "Create a vector based on an Angle and a magnitude",
    icon: DoubleIconGen(IconArrowUpRightCircle, IconAngle),
    featureLevel: 4,
    tags: ["Vector", "Math"],
    settings: [],
    codeBlockType: "expression",
    dataInputs: [
        {
            id: "angle",
            type: "number",
            defaultValue: 0,
        },
        {
            id: "length",
            type: "number",
            defaultValue: 1,
        },
    ],
    dataOutputs: [{ id: "vec", type: "vector2", defaultValue: createVector2() }],
    getData: (portId, node, context) => {
        const angle = context.getInputValueNumber(node, "angle");
        const length = context.getInputValueNumber(node, "length");
        const cos = Math.cos(angle) * length;
        const sin = Math.sin(angle) * length;
        return createVector2(cos, sin);
    },
};
