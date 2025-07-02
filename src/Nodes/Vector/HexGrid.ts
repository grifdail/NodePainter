import { IconHexagons } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";

enum HexType {
  FlatTop = "Flat Top",
  PointyTop = "Pointy Top",
}

const SQRT3_2 = Math.sqrt(3) / 2;

export const HexGrid: NodeDefinition = {
  id: "HexGrid",
  description: "Convert positition on a square grid to position on a hex grid",
  icon: IconHexagons,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "in",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],

  codeBlockType: "expression",
  settings: [{ type: "dropdown", id: "type", defaultValue: HexType.FlatTop, options: Object.values(HexType) }],
  getData: (portId, nodeData, context) => {
    const a = context.getInputValueVector(nodeData, "in");
    const type = nodeData.settings.type as HexType;
    var x = a[0];
    var y = a[1];
    if (type === HexType.FlatTop) {
      y += Math.floor(x) % 2 ? 0.5 : 0;
      return createVector2(x * 0.75, y * SQRT3_2);
    } else {
      x += Math.floor(y) % 2 ? 0.5 : 0;
      return createVector2(x * SQRT3_2, y * 0.75);
    }
  },
};
