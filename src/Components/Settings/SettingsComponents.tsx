import { HiddenSettingDefinition, SettingDefinition, SettingType } from "../../Types/SettingDefinition";
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
import { AnimationTrackSettings } from "./AnimationTrackSettings";
import { ModelUploadSetting } from "./ModelUploadSetting";
import { EasingSetting } from "./EasingPreview";
import { CodeBlockSetting } from "./CodeBlockSetting";
import { GroupSetting } from "./GroupSetting";
import { BoolSetting } from "./BoolSetting";
import { ImageSelectSetting } from "./ImageSelectSetting";

export type SettingProps<T extends SettingDefinition> = {
  onChange: (value: any) => void;
  value: any;
  def: T;
  node: NodeData;
};

export type SettingComponent<T extends SettingDefinition> = ((props: SettingProps<T>) => any) & {
  getSize: (value: any, def: T, node?: NodeData) => number;
};

export const EmptySetting = ({ onChange, value, def }: SettingProps<HiddenSettingDefinition>) => {
  return null;
};
EmptySetting.getSize = (value: any, def: SettingDefinition) => 0;

export const SettingComponents: { [TDefinition in SettingDefinition as TDefinition["type"]]: SettingComponent<TDefinition> } = {
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
  "animation-track": AnimationTrackSettings,
  "mesh-upload": ModelUploadSetting,
  "easing-preview": EasingSetting,
  "code-block": CodeBlockSetting,
  group: GroupSetting,
  bool: BoolSetting,
  "image-select": ImageSelectSetting,
};
