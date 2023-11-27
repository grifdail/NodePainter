export type PortType = "execute" | "number" | "vector2" | "color" | "string" | "bool";
export type SettingType = "number-field";

export const MainExecuteId = "mainExecute";

export enum PortLocation {
  InputData,
  OutputData,
  InputExec,
  OutputExec,
}
