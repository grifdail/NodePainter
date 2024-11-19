import { IconCodeDots } from "@tabler/icons-react";
import { CodeBlock, createDefaultCodeBlock, executeStatementList } from "../../Types/CodeBlock";
import { NodeDefinition } from "../../Types/NodeDefinition";
export const CUSTOM_IMPERATIVE_FUNCTION = "CustomImperativeFunction";

export const CustomImperativeFunction: NodeDefinition = {
  id: CUSTOM_IMPERATIVE_FUNCTION,
  description: "Custom function",
  icon: IconCodeDots,
  tags: [],
  hideInLibrary: false,
  dataInputs: [],
  dataOutputs: [],
  executeOutputs: ["execute"],
  canBeExecuted: true,
  settings: [
    {
      id: "code",
      type: "code-block",
      defaultValue: createDefaultCodeBlock(),
    },
  ],
  getData: (portId, data, context) => {
    const stateId = `${data.id}-state`;
    let state: { [k: string]: any } = {};
    if (context.blackboard[stateId] === undefined) {
      state = {};
    } else {
      state = context.blackboard[stateId];
    }

    return state[portId].value;
  },
  execute: (data, context) => {
    const stateId = `${data.id}-state`;
    let state = context.createFunctionContext(data);
    Object.entries(data.dataOutputs).forEach(([key, value]) => {
      state[key] = { type: value.type, value: structuredClone(value.defaultValue) };
    });

    var codeBlock = data.settings.code as CodeBlock;
    codeBlock.localVariables.forEach((port) => (state[port.id] = { type: port.type, value: port.defaultValue }));
    executeStatementList(codeBlock.statements, state);
    context.blackboard[stateId] = state;

    var execute = data.execOutputs["execute"];
    if (execute != null) {
      context.execute(execute);
    }
  },
};
