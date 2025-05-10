import { ConstrainDeclaration } from "../Utils/applyConstraints";
import { SettingType } from "./SettingType";

export type SettingDefinition = {
  id: string;
  type: SettingType;
  defaultValue: any;
  globalKey?: string;
  constrains?: ConstrainDeclaration[];
  [key: string]: any;
};
