import { HiddenSettingDefinition, SettingDefinition } from "../../Types/SettingDefinition";
import { SettingProps } from "./SettingProps";

export const EmptySetting = ({ onChange, value, def }: SettingProps<HiddenSettingDefinition>) => {
  return null;
};
EmptySetting.getSize = (value: any, def: SettingDefinition) => 0;
