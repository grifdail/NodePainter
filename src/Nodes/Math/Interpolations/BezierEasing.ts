import { IconEaseInOut } from "@tabler/icons-react";
import bezier from "bezier-easing";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2, Vector2 } from "../../../Types/vectorDataType";
import { Constraints } from "../../../Utils/ui/applyConstraints";

export const BezierEasingNode: NodeDefinition = {
    id: "Math/Interpolation/BezierEasing",
    tags: ["Math"],
    icon: IconEaseInOut,
    description: "Apply an easing function defined by a bezier curve and controls points",
    dataInputs: [
        Port.number("input"),
        Port.vector2("cp1", createVector2(0.3, 0), [Constraints.VectorComponentConstrain([[Constraints.Clamp01()], []])]),
        Port.vector2("cp2", createVector2(0.7, 1), [Constraints.VectorComponentConstrain([[Constraints.Clamp01()], []])])
    ],
    dataOutputs: [{ id: "result", type: "number", defaultValue: 0 }],

    settings: [
        {
            type: "curve-preview", id: "preview", requirePort: ["cp1", "cp2"], height: 100, getValue(t, node) {
                var cp1 = node.dataInputs.cp1.ownValue as Vector2;
                var cp2 = node.dataInputs.cp2.ownValue as Vector2;
                var easing = bezier(cp1[0], cp1[1], cp2[0], cp2[1]);
                return easing(t);
            }
        }
    ],

    getData: (portId, node, context) => {
        var input = context.getInputValueNumber(node, "input");
        var cp1 = context.getInputValueVector2(node, "cp1");
        var cp2 = context.getInputValueVector2(node, "cp2");
        var easing = bezier(cp1[0], cp1[1], cp2[0], cp2[1]);
        return easing(input);
    },
};
