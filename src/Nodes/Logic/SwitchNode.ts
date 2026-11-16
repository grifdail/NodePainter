import { IconAssembly } from "@tabler/icons-react";
import { SettingGenerator } from "../../Components/Settings/SettingGenerator";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { Black, White } from "../../Utils/math/colorUtils";

export const SwitchNode: NodeDefinition = {
    id: "Logic/Switch",
    description: "Return one of the input depending on the condition",
    icon: IconAssembly,
    alias: "Select If Conditional Ternary ?",
    tags: ["Logic"],
    dataInputs: [
        { id: "condition", type: "bool", defaultValue: false },
        { id: "true", type: "color", defaultValue: Black() },
        { id: "false", type: "color", defaultValue: White() },
    ],
    dataOutputs: [{ id: "result", type: "color", defaultValue: Black() }],

    settings: [SettingGenerator.bool("evalall", false, { label: "Evaluate anyway", tooltip: "When this is true, both option will be evaluated" })],
    ...changeTypeGenerator(portTypesWithTags(["common"]), ["true", "false"], ["result"]),
    getData: (portId, node, context) => {
        var input = context.getInputValueBoolean(node, "condition");
        const evalAnyway = context.getSetting(node, "evalall");
        if (evalAnyway) {
            var t = context.getInputValue(node, "true", node.selectedType);
            var f = context.getInputValue(node, "false", node.selectedType);
            return input ? t : f;
        }
        if (input) {
            return context.getInputValue(node, "true", node.selectedType);
        } else {
            return context.getInputValue(node, "false", node.selectedType);
        }
    },
};
