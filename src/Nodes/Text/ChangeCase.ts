import { IconFileText } from "@tabler/icons-react";
import * as changeCase from "change-case";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

const fromChangeCase = ["camelCase", "pascalCase", "pascalSnakeCase", "capitalCase", "constantCase", "dotCase", "kebabCase", "pathCase", "sentenceCase", "snakeCase", "trainCase"] as const;

const CASE_CHANGE = {
  UPPERCASE: (s: string) => s.toUpperCase(),
  lowercase: (s: string) => s.toLowerCase(),
  ...Object.fromEntries(fromChangeCase.map((name) => [changeCase[name](name), (s: string) => changeCase[name](s)])),
};

export const ChangeCaseNode: NodeDefinition = {
  id: "Text/ChangeCase",
  description: "Change the case of the text",
  icon: IconFileText,
  tags: ["Text"],
  dataInputs: [
    //
    Port.string("source", "Hello World"),
  ],
  dataOutputs: [{ id: "result", type: "string", defaultValue: [] }],
  codeBlockType: "expression",
  settings: [{ id: "case", type: "dropdown", options: Object.keys(CASE_CHANGE), defaultValue: "UPPERCASE" }],
  getData: (portId, node, context) => {
    const source = context.getInputValueString(node, "source");
    var change = node.settings.case as keyof typeof CASE_CHANGE;
    return CASE_CHANGE[change](source) as string;
  },
};
