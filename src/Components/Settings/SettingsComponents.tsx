import { SettingType } from "../../Types/SettingType";
import { SettingDefinition } from "../../Types/SettingDefinition";
import { DropdownSetting } from "./DropdownSetting";
import { NumberSetting } from "./NumberSetting";
import { StringSetting } from "./StringSetting";
import { PaletteSetting } from "./PaletteSetting";
import { GradientSetting } from "./GradientSetting";
import { ImageUploadSetting } from "./ImageUploadSetting";
import { EnvelopeSetting } from "./EnvelopeSetting";

export type SettingComponent = (({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) => any) & {
  getSize: (value: any, def: SettingDefinition) => number;
};

export const SettingComponents: { [key in SettingType]: SettingComponent } = {
  dropdown: DropdownSetting,
  palette: PaletteSetting,
  number: NumberSetting,
  string: StringSetting,
  gradient: GradientSetting,
  "image-upload": ImageUploadSetting,
  envelope: EnvelopeSetting,
};
