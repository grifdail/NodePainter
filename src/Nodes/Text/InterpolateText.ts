import { IconFileText, IconPlus } from "@tabler/icons-react";
import { TextInput } from "../../Components/Generics/Inputs/TextInput";
import { PortTypeDropdown } from "../../Components/Modals/CustomNodes/PortTypeDropdown";
import { useDialog } from "../../Hooks/useDialog";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWith } from "../../Types/PortTypeDefinitions";
import { convertTypeValue } from "../../Utils/graph/execution/convertTypeValue";
import { createPortConnection } from "../../Utils/graph/modification/createPortConnection";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const InterpolateText: NodeDefinition = {
  id: "Text/Interpolate",
  label: "Interpolate Text",
  description: "Return the text with each $input replaced with the value of the corresponding port",
  icon: IconFileText,
  tags: ["Text"],
  dataInputs: [],
  dataOutputs: [{ id: "result", type: "string", defaultValue: "" }],

  settings: [
    { type: "text-area", id: "text", defaultValue: "The value is $input" },
    {
      type: "buttons",
      id: "button",
      buttons: [
        {
          label: "Add new input",
          icon: IconPlus,
          onClick: function (node: NodeData): void {
            var nodeId = node.id;
            useDialog.getState().open({
              callback: function (button: any, fieldResult: { [key: string]: any } | undefined): void {
                if (button === "cancel" || fieldResult === undefined) {
                  return;
                }
                if (fieldResult.name === undefined || fieldResult.name.length <= 0) {
                  return;
                }
                useTree.getState().dangerouselyUpdateNode(nodeId, (node) => {
                  node.dataInputs[fieldResult.name] = createPortConnection({
                    id: fieldResult.name,
                    type: fieldResult.type,
                    defaultValue: PortTypeDefinitions[fieldResult.type as PortType].createDefaultValue(),
                    tooltip: `Interpolate to $${fieldResult.name}`,
                  });
                });
              },
              buttons: [
                {
                  key: "cancel",
                  label: "Cancel",
                  style: "invisible",
                },
                {
                  key: "confirm",
                  label: "Confirm",
                  style: "normal",
                },
              ],
              fields: [
                {
                  key: "name",
                  label: "Name",
                  defaultValue: "input",
                  input: TextInput,
                  passTrough: { constraints: [Constraints.NoSpace(), Constraints.NoSpecialChar()] },
                },
                {
                  key: "type",
                  label: "",
                  input: PortTypeDropdown,
                  defaultValue: "number",
                  passTrough: { availableTypes: portTypesWith((def) => def.convert.string !== undefined) },
                },
              ],
              header: "Add a new input",
            });
          },
        },
      ],
    },
  ],
  getData: (portId, nodeData, context) => {
    const text = nodeData.settings.text as string;
    var inputs = Object.values(nodeData.dataInputs);
    return inputs.reduce((text, input) => text.replaceAll(`$${input.id}`, convertTypeValue(context.getInputValue(nodeData, input.id, input.type), input.type, "string")), text);
  },
};
