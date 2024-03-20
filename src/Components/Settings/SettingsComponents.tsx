import { SettingType } from "../../Types/SettingType";
import { SettingDefinition } from "../../Types/SettingDefinition";
import { DropdownSetting } from "./DropdownSetting";
import { NumberSetting } from "./NumberSetting";
import { PaletteSetting } from "./PaletteSetting";
import { GradientSetting } from "./GradientSetting";
import { NodeData } from "../../Types/NodeData";
import { ImageUploadSetting } from "./ImageUploadSetting";

export type SettingComponent = (({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition; nodeData: NodeData }) => any) & {
  getSize: (value: any, def: SettingDefinition, nodeData: NodeData) => number;
};

export const SettingComponents: { [key in SettingType]: SettingComponent } = {
  dropdown: DropdownSetting,
  palette: PaletteSetting,
  number: NumberSetting,
  gradient: GradientSetting,
  "image-upload": ImageUploadSetting,
};
