import { SettingDefinition } from "../../Data/NodeDefinition";
import { DropdownSetting } from "./DropdownSetting";
import { NumberSetting } from "./NumberSetting";
import { PaletteSetting } from "./PaletteSetting";
import { GradientSetting } from "./GradientSetting";
import { NodeData, TreeStore } from "../../Hooks/useTree";
import { ImageUploadSetting } from "./ImageUploadSetting";
import { ShaderDropdownSetting } from "./ShaderDropdown";

export type SettingComponent = (({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition; nodeData: NodeData }) => any) & {
  getSize: (value: any, def: SettingDefinition, nodeData: NodeData) => number;
};

export const SettingComponents: { [key: string]: SettingComponent } = {
  dropdown: DropdownSetting,
  palette: PaletteSetting,
  number: NumberSetting,
  gradient: GradientSetting,
  "image-upload": ImageUploadSetting,
  shader: ShaderDropdownSetting,
};
