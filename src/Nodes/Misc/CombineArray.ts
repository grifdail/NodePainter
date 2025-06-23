import { IconArrowMerge, IconList } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { StatefullElementType } from "../3D/VirtualNodeTypes/statefullContext";
import { VirtualNodes } from "../3D/VirtualNodeTypes/VirtualNodeTypes";

const createIndexNode = ({ id, positionX, positionY }: NodeData): void => {
  setTimeout(() => {
    useTree.getState().createBlackboardNode(
      [
        {
          key: `${id}-index`,
          type: "number",
          id: "index",
        },
      ],
      "Generate Compose loop index",
      positionX - 400,
      positionY,
      id
    );
  }, 10);
};

export const CombineArray: NodeDefinition = {
  id: "CombineArray",
  label: "Combine Array",
  icon: DoubleIconGen(IconArrowMerge, IconList),
  description: "Compose an object from multiple object in an array",

  dataInputs: [{ id: "array", type: "array-drawing2d", defaultValue: null }],
  dataOutputs: [
    {
      id: "output",
      type: "drawing2d",
      defaultValue: null,
    },
  ],
  tags: ["3D"],
  settings: [],
  availableTypes: ["drawing2d", "object3d"],
  ...changeTypeGenerator([], ["output"], ["array"]),
  getData(portId, node, context) {
    const count = context.getInputValueNumber(node, "count");

    if (node.selectedType === "drawing2d") {
      const array = context.getInputValue(node, "array", `array-drawing2d`) as (() => void | null)[];
      return () => {
        array.forEach((item) => {
          if (item) {
            item();
          }
        });
      };
    } else {
      const array = context.getInputValue(node, "array", `array-object3d`) as (StatefullElementType<any, any> | null)[];
      const id = context.getCallId(node);
      return VirtualNodes.ComposeVirtualNodeType.generate(id, array.filter((item: any) => item) as any);
    }
  },
  contextMenu: {
    "Create the index node": createIndexNode,
  },
};
