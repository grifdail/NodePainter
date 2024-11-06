import { IconList, IconPlus } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { CommonTypes } from "../../Types/PortType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";

const createIndexNode = ({ id, positionX, positionY }: NodeData): void => {
  setTimeout(() => {
    useTree.getState().createBlackboardNode("number", `${id}-index`, "Generate array index", positionX - 400, positionY);
  }, 10);
};

export const GenerateArray: NodeDefinition = {
  id: "GenerateArray",
  description: "Execute an instruction multiple time",
  featureLevel: 100,
  icon: IconList,
  tags: ["Array"],
  dataInputs: [
    { id: "count", type: "number", defaultValue: 10 },
    { id: "value", type: "number", defaultValue: 0 },
  ],
  dataOutputs: [{ id: "array", type: "array-number", defaultValue: [] }],
  executeOutputs: [],
  settings: [
    {
      id: "buttons",
      type: "buttons",
      defaultValue: undefined,
      buttons: [
        {
          label: "Create index node",
          icon: IconPlus,
          onClick: createIndexNode,
        },
      ],
    },
  ],
  canBeExecuted: false,
  availableTypes: CommonTypes,
  onChangeType: changeTypeGenerator(["value"], [], [], ["array"]),
  contextMenu: {
    "Create the index node": createIndexNode,
  },
  getData: (portId, nodeData, context) => {
    var count = context.getInputValueNumber(nodeData, "count");
    const array = [];
    for (var i = 0; i < count; i++) {
      context.blackboard[`${nodeData.id}-index`] = i;
      array[i] = context.getInputValue(nodeData, "value", nodeData.selectedType);
    }
    return array;
  },
};
