import { IconList } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { CommonTypes } from "../../Types/PortType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";

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
  settings: [],
  canBeExecuted: false,
  availableTypes: CommonTypes,
  onChangeType: changeTypeGenerator(["value"], [], [], ["array"]),
  contextMenu: {
    "Create the index node": ({ id, positionX, positionY }, tree) => {
      setTimeout(() => {
        useTree.getState().createBlackboardNode("number", `${id}-index`, "Generate array index", positionX + 300, positionY);
      }, 10);
    },
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
