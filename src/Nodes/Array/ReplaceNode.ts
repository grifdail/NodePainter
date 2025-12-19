import { IconBrackets, IconList } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";

export const ReplaceNode: NodeDefinition = {
    id: "Array/Replace",
    description: "Return a copy of the array the element at a specific position replaced",
    icon: DoubleIconGen(IconList, IconBrackets),
    tags: ["Array"],
    dataInputs: [Port["array-number"]("array"), Port.number("position"), Port.number("value")],
    dataOutputs: [Port["array-number"]("out")],
    settings: [],
    codeBlockType: "expression",
    ...changeTypeGenerator(portTypesWithTags(["common"], ["array"]), ["value"], [], ["array"], ["out"]),
    getData: (portId, node, context) => {
        const array = context.getInputValue(node, "array", `array-${node.selectedType}` as PortType) as any[];
        const value = context.getInputValue(node, "value", node.selectedType);
        if (array.length === 0) {
            return [value];
        }
        const position = Math.floor(context.getInputValueNumber(node, "position")) % array.length;

        if (position === 0) {
            return [value, ...array.slice(1)];
        }
        if (position === array.length - 1) {
            return [...array.slice(1, -1), value];
        }
        return [...array.slice(0, position), value, ...array.slice(position + 1)];
    },
};
