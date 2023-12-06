import { SettingDefinition } from "../Data/NodeDefinition";
import { DropdownSetting } from "./DropdownSetting";
import { NumberSetting } from "./NumberSetting";
import { PaletteSetting } from "./PaletteSetting";

export type SettingComponent = (({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) => any) & {
  getSize: (value: any, def: SettingDefinition) => number;
};

export const SettingComponents: { [key: string]: SettingComponent } = {
  dropdown: DropdownSetting,
  palette: PaletteSetting,
  number: NumberSetting,
};
