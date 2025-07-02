import { IconFileText, IconPlus } from "@tabler/icons-react";
import { all, create } from "mathjs";
import { TextInput } from "../../../Components/Generics/Inputs/TextInput";
import { useDialog } from "../../../Hooks/useDialog";
import { useTree } from "../../../Hooks/useTree";
import { NodeData } from "../../../Types/NodeData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createPortConnection } from "../../../Utils/graph/modification/createPortConnection";
import { Constraints } from "../../../Utils/ui/applyConstraints";

const math = create(all);

math.import(
  {
    import: function () {
      throw new Error("Function import is disabled");
    },
    createUnit: function () {
      throw new Error("Function createUnit is disabled");
    },
    simplify: function () {
      throw new Error("Function simplify is disabled");
    },
    derivative: function () {
      throw new Error("Function derivative is disabled");
    },
  },
  { override: true }
);
const limitedEvaluate = math.evaluate;

export const MathExpression: NodeDefinition = {
  id: "Math/Expression",
  description: "Evaluate the math expression",
  icon: IconFileText,
  tags: ["Text"],
  dataInputs: [],
  dataOutputs: [Port.number("output")],

  settings: [
    { type: "text-area", id: "expression", defaultValue: "$input * 2" },
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
                    type: "number",
                    defaultValue: 1,
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
              ],
              header: "Add a new input",
            });
          },
        },
      ],
    },
  ],
  getData: (portId, nodeData, context) => {
    const text = nodeData.settings.expression as string;
    var inputs = Object.fromEntries(
      Object.values(nodeData.dataInputs).map((port) => {
        return [`$${port.id}`, context.getInputValueNumber(nodeData, port.id)];
      })
    );
    const result = limitedEvaluate(text, inputs);
    if (Number.isNaN(result)) {
      throw new Error("The math expression didn't return a number");
    }
    return result;
  },
};
