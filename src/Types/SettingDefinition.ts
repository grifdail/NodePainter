import { Icon } from "@tabler/icons-react";
import { EasingFunctionType } from "../libs/easing";
import { AnimationSequenceData } from "../Utils/animationSequence/AnimationSequenceData";
import { ConstrainDeclaration } from "../Utils/ui/applyConstraints";
import { AnimationTrack } from "./AnimationTrack";
import { CodeBlock } from "./CodeBlock/CodeBlock";
import { JavascriptFunction } from "./CodeBlock/JavascriptFunction";
import { EnvelopeData } from "./EnvelopeData";
import { Flipbook } from "./FlipBook";
import { NodeData } from "./NodeData";
import { Color, Gradient, Vector2 } from "./vectorDataType";


type BaseSettingDefinition = {
  id: string;
  globalKey?: string;
  label?: string;
  tooltip?: string;
  onChange?: (node: NodeData, newValue: any, oldValue: any, definitions: SettingDefinition) => void;
};

export type NumberSettingDefinition = BaseSettingDefinition & {
  type: "number";
  defaultValue: number;
  constrains?: ConstrainDeclaration[];
};
export type Vector2SettingDefinition = BaseSettingDefinition & {
  type: "vector2";
  defaultValue: Vector2;
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
export type ImagePreviewSettingDefinition = BaseSettingDefinition & {
  type: "image-preview";
};
export type ImagePaintSettingDefinition = BaseSettingDefinition & {
  type: "image-paint";
};
export type FlipbookAnimationSettingDefinition = BaseSettingDefinition & {
  type: "flipbook";
  defaultValue: Flipbook
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
  validation?: (value: string, node: NodeData) => null | string;
  constrains?: ConstrainDeclaration[];
};
export type HiddenSettingDefinition = BaseSettingDefinition & {
  type: "hidden";
  defaultValue: any;
  [key: string]: any;
};

export type AnimationSequenceSettingDefinition = BaseSettingDefinition & {
  type: "animation-sequence";
  defaultValue: AnimationSequenceData
};

export type ButtonSettingDefinition = BaseSettingDefinition & {
  type: "button";
  button: {
    label: string;
    /**
     * @TJS-ignore
     */
    icon: Icon;
    /**
     * @TJS-ignore
     */
    onClick: (node: NodeData) => void;
    /**
     * @TJS-ignore
     */
    hide?: (node: NodeData) => boolean;
  };
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

export type JavascriptFunctionSettingDefinition = BaseSettingDefinition & {
  type: "js-function";
  defaultValue: JavascriptFunction;
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
export type GraphAreaSettingDefinition = BaseSettingDefinition & {
  type: "graph-area";
};
export type SettingDefinition =
  | NumberSettingDefinition
  | Vector2SettingDefinition
  | DropdownSettingDefinition
  | ImageSelectSettingDefinition
  | PaletteSettingDefinition
  | BoolSettingDefinition
  | GradientSettingDefinition
  | ImageUploadSettingDefinition
  | ImagePaintSettingDefinition
  | FlipbookAnimationSettingDefinition
  | ImagePreviewSettingDefinition
  | EnvelopeSettingDefinition
  | StringSettingDefinition
  | TextAreaSettingDefinition
  | HiddenSettingDefinition
  | ButtonSettingDefinition
  | AnimationTrackSettingDefinition
  | MeshUploadSettingDefinition
  | EasingPreviewSettingDefinition
  | CodeBlockSettingDefinition
  | JavascriptFunctionSettingDefinition
  | PathSettingDefinition
  | BezierPathSettingDefinition
  | GroupSettingDefinition
  | GraphAreaSettingDefinition
  | AnimationSequenceSettingDefinition;

export type SettingType = SettingDefinition["type"];


