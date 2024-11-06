import { SettingType } from "../../Types/SettingType";
import { SettingDefinition } from "../../Types/SettingDefinition";
import { DropdownSetting } from "./DropdownSetting";
import { NumberSetting } from "./NumberSetting";
import { StringSetting } from "./StringSetting";
import { PaletteSetting } from "./PaletteSetting";
import { GradientSetting } from "./GradientSetting";
import { ImageUploadSetting } from "./ImageUploadSetting";
import { EnvelopeSetting } from "./EnvelopeSetting";
import { ImagePaintSetting } from "./ImagePaintSetting";
import { NodeData } from "../../Types/NodeData";
import { ButtonsSettings } from "./ButtonsSettings";
import { AnimationTrackSettings as AnimationTrackSetting } from "./AnimationTrackSettings";
import { ModelUploadSetting } from "./ModelUploadSetting";

export type SettingProps = {
  onChange: (value: any) => void;
  value: any;
  def: SettingDefinition;
  node: NodeData;
};

export type SettingComponent = ((props: SettingProps) => any) & {
  getSize: (value: any, def: SettingDefinition, node: NodeData) => number;
};

export const EmptySetting = ({ onChange, value, def }: SettingProps) => {
  return null;
};
EmptySetting.getSize = (value: any, def: SettingDefinition) => 0;

export const SettingComponents: { [key in SettingType]: SettingComponent } = {
  dropdown: DropdownSetting,
  palette: PaletteSetting,
  number: NumberSetting,
  string: StringSetting,
  gradient: GradientSetting,
  "image-upload": ImageUploadSetting,
  "image-paint": ImagePaintSetting,
  envelope: EnvelopeSetting,
  hidden: EmptySetting,
  buttons: ButtonsSettings,
  animationTrack: AnimationTrackSetting,
  "model-upload": ModelUploadSetting,
};
