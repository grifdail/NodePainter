import { IconArrowMerge, IconPlus, IconRepeat } from "@tabler/icons-react";
import { DoubleIcon } from "../../Components/Generics/DoubleIcon";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
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
        {
          key: `${id}-count`,
          type: "number",
          id: "count",
        },
      ],
      "Compose loop index",
      positionX - 400,
      positionY,
      id
    );
  }, 10);
};

export const CombineLoop: NodeDefinition = {
  id: "CombineLoop",
  label: "Combine Loop",
  icon: DoubleIcon(IconArrowMerge, IconRepeat),
  alias: "for",
  description: "Compose an object from multiple object on a loop",
  featureLevel: 101,
  dataInputs: [
    { id: "count", type: "number", defaultValue: 10 },
    { id: "value", type: "drawing2d", defaultValue: null },
  ],
  dataOutputs: [
    {
      id: "output",
      type: "drawing2d",
      defaultValue: null,
    },
  ],
  tags: ["Misc"],
  settings: [
    {
      id: "buttons",
      type: "buttons",
      buttons: [
        {
          label: "Create index node",
          icon: IconPlus,
          onClick: createIndexNode,
        },
      ],
    },
  ],
  availableTypes: ["drawing2d", "object3d"],
  onChangeType: changeTypeGenerator(["value"], ["output"]),
  getData(portId, node, context) {
    const count = context.getInputValueNumber(node, "count");
    if (node.selectedType === "drawing2d") {
      const array: (() => void)[] = [];
      for (var i = 0; i < count; i++) {
        context.blackboard[`${node.id}-index`] = i;
        array[i] = context.getInputValueDrawing(node, "value");
      }
      return () => {
        array.forEach((item) => item());
      };
    } else {
      const array = [];
      for (var i = 0; i < count; i++) {
        context.blackboard[`${node.id}-index`] = i;
        context.blackboard[`${node.id}-count`] = count;
        array[i] = context.getInputValue(node, "value", "object3d");
      }
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
