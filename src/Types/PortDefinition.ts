import { PortType } from "./PortType";

export type PortDefinition = {
  id: string;
  type: PortType;
  defaultValue: any;
  label?: string;
};
