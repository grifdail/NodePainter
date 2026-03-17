import { IconColorFilter } from "@tabler/icons-react";
import convert from "color-convert";
import { lerp } from "three/src/math/MathUtils";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Color, Vector3 } from "../../Types/vectorDataType";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { clamp01 } from "../../Utils/math/clamp01";
import { Black } from "../../Utils/math/colorUtils";
import { vectorAddition, vectorLerp, vectorMap, vectorMultiplication, vectorScale, vectorSlice, vectorSubstraction, zipVector } from "../../Utils/math/vectorUtils";

const to255RGB = (a: Color): [number, number, number] => [a[0] * 255, a[1] * 255, a[2] * 255];

const anyConvert = convert as any;

const convertLerp = (converter: string) => (a: Color, b: Color, t: number) => [...vectorScale(anyConvert[converter].rgb(vectorLerp(anyConvert.rgb[converter].raw(to255RGB(a)), anyConvert.rgb[converter].raw(to255RGB(b)), t)), 1 / 255), lerp(a[3], b[3], t)];

const ignoreAlphaAndEnforce = (fn: (a: Vector3, b: Vector3) => Vector3) => (a: Color, b: Color, t: number): Color => vectorMap([...vectorLerp(vectorSlice(a, 3), fn(vectorScale(vectorSlice(a, 3), a[3]), vectorScale(vectorSlice(b, 3), b[3])), t), lerp(a[3], b[3], t)], clamp01);

const BLEND_MODES = {
    rgb: (a: Color, b: Color, t: number) => vectorLerp(a, b, t),
    hsv: convertLerp("hsv"),
    hsl: convertLerp("hsl"),
    cmyk: convertLerp("cmyk"),
    oklch: convertLerp("oklch"),
    additive: ignoreAlphaAndEnforce((a: Vector3, b: Vector3) => vectorAddition(a, b)),
    subtractive: ignoreAlphaAndEnforce((a: Vector3, b: Vector3) => vectorSubstraction(a, b)),
    multiplicative: ignoreAlphaAndEnforce((a: Vector3, b: Vector3) => vectorMultiplication(a, b)),
    darken: ignoreAlphaAndEnforce((a: Vector3, b: Vector3) => zipVector(a, b).map(([a, b]) => Math.min(a, b)) as Vector3),
    lighten: ignoreAlphaAndEnforce((a: Vector3, b: Vector3) => zipVector(a, b).map(([a, b]) => Math.max(a, b)) as Vector3),
    screen: ignoreAlphaAndEnforce((a: Vector3, b: Vector3) => zipVector(a, b).map(([a, b]) => 1 - (1 - a) * (1 - b)) as Vector3),
    dodge: ignoreAlphaAndEnforce((a: Vector3, b: Vector3) => zipVector(a, b).map(([a, b]) => a / (1 - b)) as Vector3),
    burn: ignoreAlphaAndEnforce((a: Vector3, b: Vector3) => zipVector(a, b).map(([a, b]) => 1 - (1 - a) / b) as Vector3),
    divide: ignoreAlphaAndEnforce((a: Vector3, b: Vector3) => zipVector(a, b).map(([a, b]) => 1 - (1 - a) / b) as Vector3),
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
    getData: (portId, node, context) => {
        const a = context.getInputValueColor(node, "a");
        const b = context.getInputValueColor(node, "b");
        const t = context.getInputValueNumber(node, "t");
        const option = node.settings.blend as keyof typeof BLEND_MODES;
        return BLEND_MODES[option](a, b, t);
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "out", ["color", "alpha"], ({ color, alpha }) => `vec4(${color}.rgb, ${alpha})`);
    },
};
