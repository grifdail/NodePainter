import { PortType } from "../PortType";

export type CodeBlockParameterFieldVariable = {
  label?: string;
  type: "variable";
  targetType: PortType | "any";
  variableName?: string;
  affectTypes?: string[];
};
