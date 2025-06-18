import { CodeBlockParameterField } from "./CodeBlockParameterField";

export type CodeBlockStatement = {
  type: string;
  parameters: { [key: string]: CodeBlockParameterField };
};
