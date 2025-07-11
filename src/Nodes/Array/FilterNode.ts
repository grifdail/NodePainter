import { IconFilter, IconList, IconPlus } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";

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
      "Filter index",
      positionX - 400,
      positionY,
      id
    );
  }, 10);
};

export const FilterNode: NodeDefinition = {
  id: "Array/Filter",
  description: "Return all the element of the array that evaluate to true",
  icon: DoubleIconGen(IconList, IconFilter),
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

  settings: [
    {
      id: "buttons",
      type: "button",
      button: {
        label: "Create index node",
        icon: IconPlus,
        onClick: createIndexNode,
      },
    },
  ],
  ...changeTypeGenerator(portTypesWithTags(["common"], ["array"]), [], [], ["array"], ["filtered"]),
  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", node.dataInputs["array"].type) as any[];
    if (array.length === 0) {
      return PortTypeDefinitions[node.selectedType].createDefaultValue();
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
