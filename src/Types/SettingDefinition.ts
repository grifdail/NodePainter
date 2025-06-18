import { Icon } from "@tabler/icons-react";
import { EasingFunctionType } from "../libs/easing";
import { ConstrainDeclaration } from "../Utils/ui/applyConstraints";
import { AnimationTrack } from "./AnimationTrack";
import { CodeBlock } from "./CodeBlock";
import { EnvelopeData } from "./EnvelopeData";
import { NodeData } from "./NodeData";
import { Color, Gradient } from "./vectorDataType";

type BaseSettingDefinition = {
  id: string;
  globalKey?: string;
  label?: string;
  tooltip?: string;
};

export type NumberSettingDefinition = BaseSettingDefinition & {
  type: "number";
  defaultValue: number;
  constrains?: ConstrainDeclaration[];
};
export type DropdownSettingDefinition = BaseSettingDefinition & {
  type: "dropdown";
  defaultValue: string;
  options: string[];
};
export type ImageSelectSettingDefinition = BaseSettingDefinition & {
  type: "image-select";
  options: Array<{
    label: string;
    url: string;
  }>;
};
export type PaletteSettingDefinition = BaseSettingDefinition & {
  type: "palette";
  defaultValue: Color[];
};
export type BoolSettingDefinition = BaseSettingDefinition & {
  type: "bool";
  defaultValue: boolean;
};
export type GradientSettingDefinition = BaseSettingDefinition & {
  type: "gradient";
  defaultValue: Gradient;
};
export type ImageUploadSettingDefinition = BaseSettingDefinition & {
  type: "image-upload";
};
export type ImagePaintSettingDefinition = BaseSettingDefinition & {
  type: "image-paint";
};
export type EnvelopeSettingDefinition = BaseSettingDefinition & {
  type: "envelope";
  defaultValue: EnvelopeData;
};
export type StringSettingDefinition = BaseSettingDefinition & {
  type: "string";
  defaultValue: string;
  constrains?: ConstrainDeclaration[];
};
export type TextAreaSettingDefinition = BaseSettingDefinition & {
  type: "text-area";
  defaultValue: string;
  constrains?: ConstrainDeclaration[];
};
export type HiddenSettingDefinition = BaseSettingDefinition & {
  type: "hidden";
  defaultValue: any;
  [key: string]: any;
};

export type ButtonSettingDefinition = BaseSettingDefinition & {
  type: "buttons";
  buttons: {
    label: string;
    /**
     * @TJS-ignore
     */
    icon: Icon;
    onClick: (node: NodeData) => void;
  }[];
};
export type AnimationTrackSettingDefinition = BaseSettingDefinition & {
  type: "animation-track";
  defaultValue: AnimationTrack;
};
export type MeshUploadSettingDefinition = BaseSettingDefinition & {
  type: "mesh-upload";
};
export type EasingPreviewSettingDefinition = BaseSettingDefinition & {
  type: "easing-preview";
  defaultValue: EasingFunctionType;
};
export type CodeBlockSettingDefinition = BaseSettingDefinition & {
  type: "code-block";
  defaultValue: CodeBlock;
};
export type GroupSettingDefinition = BaseSettingDefinition & {
  type: "group";
  defaultValue: { [key: string]: any };
  settings: SettingDefinition[];
  label?: string;
};
export type PathSettingDefinition = BaseSettingDefinition & {
  type: "path";
};
export type BezierPathSettingDefinition = BaseSettingDefinition & {
  type: "bezier-path";
};
export type SettingDefinition =
  | NumberSettingDefinition
  | DropdownSettingDefinition
  | ImageSelectSettingDefinition
  | PaletteSettingDefinition
  | BoolSettingDefinition
  | GradientSettingDefinition
  | ImageUploadSettingDefinition
  | ImagePaintSettingDefinition
  | EnvelopeSettingDefinition
  | StringSettingDefinition
  | TextAreaSettingDefinition
  | HiddenSettingDefinition
  | ButtonSettingDefinition
  | AnimationTrackSettingDefinition
  | MeshUploadSettingDefinition
  | EasingPreviewSettingDefinition
  | CodeBlockSettingDefinition
  | PathSettingDefinition
  | BezierPathSettingDefinition
  | GroupSettingDefinition;

export type SettingType = SettingDefinition["type"];
