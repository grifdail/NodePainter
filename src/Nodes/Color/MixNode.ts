import { IconColorFilter } from "@tabler/icons-react";
import convert from "color-convert";
import { lerp } from "three/src/math/MathUtils";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Color } from "../../Types/vectorDataType";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { clamp01 } from "../../Utils/math/clamp01";
import { Black } from "../../Utils/math/colorUtils";
import { vectorAddition, vectorLerp, vectorMultiplication, vectorScale, vectorSubstraction, zipVector } from "../../Utils/math/vectorUtils";

const to255RGB = (a: Color): [number, number, number] => [a[0] * 255, a[1] * 255, a[2] * 255];

const anyConvert = convert as any;

const convertLerp = (converter: string) => (a: Color, b: Color, t: number) => [...vectorScale(anyConvert[converter].rgb(vectorLerp(anyConvert.rgb[converter].raw(to255RGB(a)), anyConvert.rgb[converter].raw(to255RGB(b)), t)), 1 / 255), lerp(a[3], b[3], t)];

const ignoreAlphaAndEnforce = (fn: (a: number[], b: number[]) => number[]) => (a: Color, b: Color, t: number) => [...vectorLerp(a.slice(0, 3), fn(vectorScale(a.slice(0, 3), a[3]), vectorScale(b.slice(0, 3), b[3])), t), lerp(a[3], b[3], t)].map(clamp01);

const BLEND_MODES = {
  rgb: (a: Color, b: Color, t: number) => vectorLerp(a, b, t),
  hsv: convertLerp("hsv"),
  hsl: convertLerp("hsl"),
  cmyk: convertLerp("cmyk"),
  oklch: convertLerp("oklch"),
  additive: ignoreAlphaAndEnforce((a: number[], b: number[]) => vectorAddition(a, b)),
  subtractive: ignoreAlphaAndEnforce((a: number[], b: number[]) => vectorSubstraction(a, b)),
  multiplicative: ignoreAlphaAndEnforce((a: number[], b: number[]) => vectorMultiplication(a, b)),
  darken: ignoreAlphaAndEnforce((a: number[], b: number[]) => zipVector(a, b).map(([a, b]) => Math.min(a, b))),
  lighten: ignoreAlphaAndEnforce((a: number[], b: number[]) => zipVector(a, b).map(([a, b]) => Math.max(a, b))),
  screen: ignoreAlphaAndEnforce((a: number[], b: number[]) => zipVector(a, b).map(([a, b]) => 1 - (1 - a) * (1 - b))),
  dodge: ignoreAlphaAndEnforce((a: number[], b: number[]) => zipVector(a, b).map(([a, b]) => a / (1 - b))),
  burn: ignoreAlphaAndEnforce((a: number[], b: number[]) => zipVector(a, b).map(([a, b]) => 1 - (1 - a) / b)),
  divide: ignoreAlphaAndEnforce((a: number[], b: number[]) => zipVector(a, b).map(([a, b]) => 1 - (1 - a) / b)),
};

export const MixNode: NodeDefinition = {
  id: "Color/Mix",
  label: "Mix Color",
  description: "Mix two color according to the specified blend mode",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [
    //
    Port.color("a", Black()),
    Port.color("b", Black()),
    Port.number("t", 0.5),
  ],
  dataOutputs: [{ id: "out", type: "color", defaultValue: 1 }],

  codeBlockType: "expression",
  settings: [{ id: "blend", type: "dropdown", options: Object.keys(BLEND_MODES), defaultValue: "rgb" }],
  getData: (portId, nodeData, context) => {
    const a = context.getInputValueColor(nodeData, "a");
    const b = context.getInputValueColor(nodeData, "b");
    const t = context.getInputValueNumber(nodeData, "t");
    const option = nodeData.settings.blend as keyof typeof BLEND_MODES;
    return BLEND_MODES[option](a, b, t);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["color", "alpha"], ({ color, alpha }) => `vec4(${color}.rgb, ${alpha})`);
  },
};
