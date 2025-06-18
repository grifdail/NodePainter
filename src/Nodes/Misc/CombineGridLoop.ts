import { IconArrowMerge, IconGridDots } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { VirtualNodes } from "../3D/VirtualNodeTypes/VirtualNodeTypes";

const createIndexNode = ({ id, positionX, positionY }: NodeData): void => {
  setTimeout(() => {
    useTree.getState().createBlackboardNode(
      [
        {
          key: `${id}-pos`,
          type: "vector2",
          id: "pos",
        },
        {
          key: `${id}-index`,
          type: "number",
          id: "index",
        },
      ],
      "Generate Combine loop index",
      positionX - 400,
      positionY,
      id
    );
  }, 10);
};

export const CombineGridLoop: NodeDefinition = {
  id: "CombineGridLoop",
  label: "Combine Grid Loop",
  icon: DoubleIconGen(IconArrowMerge, IconGridDots),
  alias: "for",
  description: "Compose an object from multiple object while looping over a grid",

  dataInputs: [Port.vector2("size", [10, 10]), Port.drawing2d("value")],
  dataOutputs: [Port.drawing2d("output")],
  tags: ["3D"],
  settings: [],
  availableTypes: ["drawing2d", "object3d"],
  onChangeType: changeTypeGenerator(["value"], ["output"]),
  getData(portId, node, context) {
    const size = context.getInputValueVector2(node, "size");

    const array: any[] = [];
    for (var y = 0; y < size[1]; y++) {
      for (var x = 0; x < size[0]; x++) {
        context.blackboard[`${node.id}-index`] = y * size[0] + x;
        context.blackboard[`${node.id}-pos`] = createVector2(x, y);
        array[x * size[0] + y] = context.getInputValue(node, "value", node.selectedType);
      }
    }
    if (node.selectedType === "drawing2d") {
      return () => {
        array.forEach((item) => item());
      };
    } else {
      const id = context.getCallId(node);
      return VirtualNodes.ComposeVirtualNodeType.generate(
        id,
        array.filter((item: any) => item)
      );
    }
  },
  contextMenu: {
    "Create the index node": createIndexNode,
  },
};
