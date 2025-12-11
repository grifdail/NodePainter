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
import { BezierPathSetting } from "./BezierPathSetting";
import { GraphAreaSetting } from "./GraphAreaSetting";
import { Vector2Setting } from "./Vector2Setting";
import { ImagePreviewSetting } from "./ImagePreviewSetting";
import { JavascriptFunctionSetting } from "./JavascriptFunctionSetting";
import { FlipbookAnimationSetting } from "./FlipbookAnimationSetting";

export const SettingComponents: { [TDefinition in SettingDefinition as TDefinition["type"]]: SettingComponent<TDefinition> } = {
  dropdown: DropdownSetting,
  palette: PaletteSetting,
  number: NumberSetting,
  vector2: Vector2Setting,
  "image-preview": ImagePreviewSetting,
  string: StringSetting,
  gradient: GradientSetting,
  "image-upload": ImageUploadSetting,
  "image-paint": ImagePaintSetting,
  flipbook: FlipbookAnimationSetting,
  envelope: EnvelopeSetting,
  hidden: EmptySetting,
  button: ButtonsSettings,
  "animation-track": AnimationTrackSettings,
  "mesh-upload": ModelUploadSetting,
  "easing-preview": EasingSetting,
  "code-block": CodeBlockSetting,
  "js-function": JavascriptFunctionSetting,
  group: GroupSetting,
  bool: BoolSetting,
  "image-select": ImageSelectSetting,
  path: PathSetting,
  "text-area": TextAreaSetting,
  "bezier-path": BezierPathSetting,
  "graph-area": GraphAreaSetting,
};
