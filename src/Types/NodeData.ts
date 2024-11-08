import { PortConnection } from "./PortConnection";
import { PortDefinition } from "./PortDefinition";
import { PortType } from "./PortType";

export type NodeData = {
  id: string;
  type: string;
  graph?: string;
  dataInputs: { [key: string]: PortConnection }; //Hold the potential connection to another node
  execOutputs: { [key: string]: string | null }; //Hold the refference to another node
  dataOutputs: { [key: string]: PortDefinition }; //Hold the definition
  settings: { [key: string]: any };
  positionX: number;
  positionY: number;
  selectedType: PortType;
  label?: string;
  pairedNode?: string;
};
