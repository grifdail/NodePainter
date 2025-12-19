import { IconArrowUpRightCircle, IconMathXy } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { createPortConnection } from "../../../Utils/graph/modification/createPortConnection";

export const ComposeBidirectionalNode: NodeDefinition = {
    id: "Math/Vector/ComposeBidirectional",
    label: "Compose Vector Bidirectional",
    description: "Create a vector or color from a set of number representing both direction",
    icon: DoubleIconGen(IconArrowUpRightCircle, IconMathXy),
    featureLevel: 3,
    tags: ["Vector"],
    dataInputs: [
    ],
    dataOutputs: [{ id: "out", type: "vector2", defaultValue: createVector2() }],

    settings: [],
    availableTypes: portTypesWithProperty("componentNames"),
    onChangeType(node, type) {
        var count = PortTypeDefinitions[type].vectorLength || 4;
        for (var i = 0; i < 4; i++) {
            if (i >= count) {
                if (node.dataInputs[`${i}-positive`] !== undefined) {
                    delete node.dataInputs[`${i}-positive`];
                }
                if (node.dataInputs[`${i}-negative`] !== undefined) {
                    delete node.dataInputs[`${i}-negative`];
                }
            } else {
                createPort(i, "positive")
                createPort(i, "negative")
            }
        }
        node.dataOutputs["out"].type = type;

        function createPort(i: number, suffix: string) {
            const id = `${i}-${suffix}`
            let port = node.dataInputs[id];
            if (port === undefined) {
                port = createPortConnection({
                    id: id,
                    type: "number",
                    defaultValue: 0,
                    label: "w",
                });
                node.dataInputs[id] = port;
            }
            var source = PortTypeDefinitions[type].componentNames || [];
            port.label = `${source[i]}-${suffix}`;
        }
    },
    hasOutput(output, def) {
        return def.availableTypes?.includes(output) ? output : null;
    },
    getData: (portId, nodeData, context) => {
        var vectorLength = PortTypeDefinitions[nodeData.selectedType].vectorLength || 2;
        return new Array(vectorLength).fill(null).map((_, i) => context.getInputValueNumber(nodeData, `${i}-positive`) - context.getInputValueNumber(nodeData, `${i}-negative`));
    },
    getShaderCode(node, context) {
        if (node.selectedType === "vector3") {
            return generateShaderCodeFromNodeData(node, context, "out", ["0-positive", "0-negative", "1-positive", "1-negative", "2-positive", "2-negative"], (args) => `vec3(${args[0]} - ${args[1]}, ${args[2]} - ${args[3]}, ${args[4]} - ${args[5]})`);
        } else if (node.selectedType === "vector4" || node.selectedType === "color") {
            return generateShaderCodeFromNodeData(node, context, "out", ["0-positive", "0-negative", "1-positive", "1-negative", "2-positive", "2-negative", "3-positive", "3-negative"], (args) => `vec4(${args[0]} - ${args[1]}, ${args[2]} - ${args[3]}, ${args[4]} - ${args[5]}, ${args[6]} - ${args[7]})`);
        } else {
            return generateShaderCodeFromNodeData(node, context, "out", ["0-positive", "0-negative", "1-positive", "1-negative"], (args) => `vec2(${args[0]} - ${args[1]}, ${args[2]} - ${args[3]})`);
        }
    },
};
