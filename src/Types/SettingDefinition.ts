import { SettingType } from "./SettingType";

export type SettingDefinition = {
  id: string;
  type: SettingType;
  defaultValue: any;
  globalKey?: string;
  [key: string]: any;
};
