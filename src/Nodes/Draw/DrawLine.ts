import { IconLine } from "@tabler/icons-react";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { toP5Color } from "../../Utils/colorUtils";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";

export const DrawLine: NodeDefinition = {
  id: "DrawLine",
  label: "Draw Line",
  description: "Draw a line between two point",
  icon: IconLine,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1),
    },
    {
      id: "start",
      type: "vector2",
      defaultValue: createVector2(10, 10),
    },
    {
      id: "end",
      type: "vector2",
      defaultValue: createVector2(90, 90),
    },
    {
      id: "lineWidth",
      type: "number",
      defaultValue: 10,
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  availableTypes: ["vector2"],
  defaultType: "vector2",
  onChangeType: changeTypeGenerator(["start", "end"], []),
  execute: (data, context) => {
    var color = context.getInputValueColor(data, "color");
    var p1 = context.getInputValueVector(data, "start") as [number, number, number];
    var p2 = context.getInputValueVector(data, "end") as [number, number, number];
    var lineWidth = context.getInputValueNumber(data, "lineWidth");
    context.target.stroke(toP5Color(color, context.p5));
    context.target.strokeWeight(lineWidth);
    context.target.line(...p1, ...p2);
  },
};
