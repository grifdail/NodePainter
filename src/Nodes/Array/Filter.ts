import { IconList, IconPlus } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { CommonTypes } from "../../Types/PortType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { createDefaultValue } from "../../Utils/createDefaultValue";

const createIndexNode = ({ id, positionX, positionY, selectedType }: NodeData): void => {
  setTimeout(() => {
    useTree.getState().createBlackboardNode(
      [
        {
          key: `${id}-index`,
          type: "number",
          id: "index",
        },
        {
          key: `${id}-value`,
          type: selectedType,
          id: "value",
        },
      ],
      "Find best index",
      positionX - 400,
      positionY,
      id
    );
  }, 10);
};

export const Filter: NodeDefinition = {
  id: "Filter",
  description: "Return all the element of the array that evaluate to true",
  icon: IconList,
  tags: ["Array"],
  dataInputs: [
    {
      id: "array",
      type: "array-number",
      defaultValue: [],
    },
    {
      id: "evaluate",
      type: "bool",
      defaultValue: false,
    },
  ],
  dataOutputs: [{ id: "filtered", defaultValue: [], type: "array-number" }],
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
  defaultType: "number",
  availableTypes: CommonTypes,
  onChangeType: changeTypeGenerator([], [], ["array"], ["filtered"], changeTypeGenerator([], ["value"])),
  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", node.dataInputs["array"].type) as any[];
    if (array.length === 0) {
      return createDefaultValue(node.selectedType);
    }
    const result: any[] = [];
    array.forEach((item, i) => {
      //set the blackboard

      context.blackboard[`${node.id}-index`] = i;
      context.blackboard[`${node.id}-value`] = item;
      var isFiltered = context.getInputValueBoolean(node, "evaluate");
      if (isFiltered) {
        result.push(item);
      }
    });
    return result;
  },
};
