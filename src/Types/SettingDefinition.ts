import { SettingType } from "./SettingType";

export type SettingDefinition = {
  id: string;
  type: SettingType;
  defaultValue: any;
  [key: string]: any;
};
