import { PortType } from "./PortType";

export type CodeBlockParameterFieldValue = {
  label?: string;
  type: "value";
  targetType: PortType;
  value: any;
};
