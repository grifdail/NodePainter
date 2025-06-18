import { ConstrainDeclaration } from "../Utils/graph/applyConstraints";
import { PortType } from "./PortType";

export type PortDefinition = {
  id: string;
  type: PortType;
  defaultValue: any;
  label?: string;
  constrains?: ConstrainDeclaration[];
  tooltip?: string;
};
