import { ConstrainDeclaration } from "../Utils/ui/applyConstraints";
import { PortType } from "./PortType";

export type PortConnection = {
  label?: string;
  id: string;
  hasConnection: boolean;
  ownValue: any;
  connectedNode: string | null;
  connectedPort: string | null;
  type: PortType;
  constrains?: ConstrainDeclaration[];
  tooltip?: string;
};
