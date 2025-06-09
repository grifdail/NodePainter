import { IconList, IconPlus, IconSearch } from "@tabler/icons-react";
import { DoubleIcon } from "../../Components/Generics/DoubleIcon";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";

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

export const FindBest: NodeDefinition = {
  id: "FindBest",
  description: "Find and return the best element out an array",
  icon: DoubleIcon(IconList, IconSearch),
  tags: ["Array"],
  dataInputs: [
    {
      id: "array",
      type: "array-number",
      defaultValue: [],
    },
    {
      id: "evaluate",
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [
    { id: "out", defaultValue: 0, type: "number" },
    { id: "index", defaultValue: 0, type: "number" },
  ],

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
  availableTypes: portTypesWithTags(["common"], ["array"]),
  onChangeType: changeTypeGenerator([], ["out"], ["array"], [], changeTypeGenerator([], ["value"])),
  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", node.dataInputs["array"].type) as any[];
    if (array.length === 0) {
      return PortTypeDefinitions[node.selectedType].createDefaultValue();
    }
    let bestScore: null | number = null;
    let lastSafeItem = array[0];
    let lastSafeIndice = 0;
    array.forEach((item, i) => {
      //set the blackboard

      context.blackboard[`${node.id}-index`] = i;
      context.blackboard[`${node.id}-value`] = item;
      var score = context.getInputValueNumber(node, "evaluate");
      if (bestScore === null || score > bestScore) {
        lastSafeItem = item;
        lastSafeIndice = i;
        bestScore = score;
      }
    });
    if (portId === "out") {
      return lastSafeItem;
    } else {
      return lastSafeIndice;
    }
  },
};
