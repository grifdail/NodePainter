import { IconBadge3d } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VirtualNodes } from "./VirtualNodeTypes/VirtualNodeTypes";

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

export const ComposeLoop3D: NodeDefinition = {
  id: "ComposeLoop3D",
  label: "Compose Loop 3D",
  icon: IconBadge3d,
  description: "Compose an object from multiple object on a loop",
  canBeExecuted: false,
  executeOutputs: [],
  dataInputs: [
    { id: "count", type: "number", defaultValue: 10 },
    { id: "value", type: "object3d", defaultValue: null },
  ],
  dataOutputs: [
    {
      id: "output",
      type: "object3d",
      defaultValue: null,
    },
  ],
  tags: ["3D"],
  settings: [],
  getData(portId, node, context) {
    const count = context.getInputValueNumber(node, "count");
    const array = [];
    for (var i = 0; i < count; i++) {
      context.blackboard[`${node.id}-index`] = i;
      array[i] = context.getInputValue(node, "value", "object3d");
    }

    const id = context.getCallId(node);
    return VirtualNodes.ComposeVirtualNodeType.generate(
      id,
      array.filter((item: any) => item)
    );
  },
  contextMenu: {
    "Create the index node": createIndexNode,
  },
};
