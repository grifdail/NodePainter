import { IconCodeDots } from "@tabler/icons-react";
import { CodeBlock } from "../../Types/CodeBlock/CodeBlock";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createDefaultCodeBlock } from "../../Utils/codeblock/createDefaultCodeBlock";
import { executeStatementList } from "../../Utils/codeblock/executeStatementList";

export const ImperativeFunctionNode: NodeDefinition = {
  id: "Misc/ImperativeFunction",
  description: "Custom function",
  icon: IconCodeDots,
  tags: [],
  preventSnippet: true,
  hideInLibrary: false,
  dataInputs: [],
  dataOutputs: [],
  settings: [
    {
      id: "code",
      type: "code-block",
      defaultValue: createDefaultCodeBlock(),
    },
  ],
  getData: (portId, data, context) => {
    const stateId = `${data.id}-state`;
    let state = context.createFunctionContext(data);
    Object.entries(data.dataOutputs).forEach(([key, value]) => {
      state[key] = { type: value.type, value: structuredClone(value.defaultValue) };
    });

    var codeBlock = data.settings.code as CodeBlock;
    codeBlock.localVariables.forEach((port) => (state[port.id] = { type: port.type, value: port.defaultValue }));
    executeStatementList(codeBlock.statements, state);
    context.blackboard[stateId] = state;
    if (!state[portId]) {
      throw new Error(`There's no variable named "${portId}" in the Custom Imperative Function.`);
    }
    return state[portId].value;
  },
};
