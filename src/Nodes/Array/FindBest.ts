import { IconList, IconPlus } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorTypesFull } from "../../Types/PortType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { createDefaultValue } from "../../Utils/createDefaultValue";

const createIndexNode = ({ id, positionX, positionY, selectedType }: NodeData): void => {
  setTimeout(() => {
    useTree.getState().createBlackboardNode(
      [
        {
          key: `${id}-index`,
          type: "number",
          label: "index",
        },
        {
          key: `${id}-value`,
          type: selectedType,
          label: "value",
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
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [
    { id: "out", defaultValue: 0, type: "number" },
    { id: "index", defaultValue: 0, type: "number" },
  ],
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
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator([], ["out"], ["array"]),
  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", node.dataInputs["array"].type) as any[];
    if (array.length === 0) {
      return createDefaultValue(node.selectedType);
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
