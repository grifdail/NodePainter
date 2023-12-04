import { createColor } from "../Nodes/Color";
import { createVector } from "../Nodes/Vector";

export type PortType = "execute" | "number" | "vector2" | "color" | "string" | "bool";
export type SettingType = "dropdown" | "palette";

export const MainExecuteId = "mainExecute";

export enum PortLocation {
  InputData,
  OutputData,
  InputExec,
  OutputExec,
}

export const PortTypeDefaultValue = {
  number: 0,
  vector2: createVector(),
  color: createColor(),
  string: "",
  bool: "",
} as { [key: string]: any };
