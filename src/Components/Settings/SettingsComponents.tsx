import { SettingDefinition, SettingType } from "../../Types/SettingDefinition";
import { DropdownSetting } from "./DropdownSetting";
import { NumberSetting } from "./NumberSetting";
import { StringSetting } from "./StringSetting";
import { PaletteSetting } from "./PaletteSetting";
import { GradientSetting } from "./GradientSetting";
import { ImageUploadSetting } from "./ImageUploadSetting";
import { EnvelopeSetting } from "./EnvelopeSetting";
import { ImagePaintSetting } from "./ImagePaintSetting";
import { ButtonsSettings } from "./ButtonsSettings";
import { AnimationTrackSettings } from "./AnimationTrackSettings";
import { ModelUploadSetting } from "./ModelUploadSetting";
import { EasingSetting } from "./EasingPreview";
import { CodeBlockSetting } from "./CodeBlockSetting";
import { GroupSetting } from "./GroupSetting";
import { BoolSetting } from "./BoolSetting";
import { ImageSelectSetting } from "./ImageSelectSetting";
import { SettingComponent } from "./SettingComponent";
import { EmptySetting } from "./EmptySetting";
import { PathSetting } from "./PathSetting";
import { TextAreaSetting } from "./TextAreaSetting";

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
  path: PathSetting,
  "text-area": TextAreaSetting,
};
