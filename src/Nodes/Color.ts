import { IconColorFilter, IconPalette } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { createPortConnection } from "../Data/createPortConnection";
import { genShader } from "./genShader";
import { VectorAddition, VectorLerp, VectorMultiplication } from "./vectorUtils";
import { Gradient, createColor, createDefaultGradient } from "./vectorDataType";
import { hslToRgb, clamp01, hsvToRgb, map } from "./colorUtils";

export const ColorNodes: Array<NodeDefinition> = [
  {
    id: "ColorCompose",
    description: "Create a color from a set of number",
    icon: IconPalette,
    tags: ["Color"],
    dataInputs: [
      { id: "red", type: "number", defaultValue: 1 },
      { id: "green", type: "number", defaultValue: 1 },
      { id: "blue", type: "number", defaultValue: 1 },
      { id: "alpha", type: "number", defaultValue: 1 },
    ],
    dataOutputs: [{ id: "color", type: "color", defaultValue: createColor() }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return createColor(context.getInputValueNumber(nodeData, "red"), context.getInputValueNumber(nodeData, "green"), context.getInputValueNumber(nodeData, "blue"), context.getInputValueNumber(nodeData, "alpha"));
    },
    getShaderCode(node, context) {
      return `vec4 ${context.getShaderVar(node, "color", true)} = vec4(${context.getShaderVar(node, "red")}, ${context.getShaderVar(node, "green")}, ${context.getShaderVar(node, "blue")}, ${context.getShaderVar(node, "alpha")});`;
    },
  },
  {
    id: "ColorDecompose",
    description: "Decompose a color to set of number",
    icon: IconPalette,
    tags: ["Color"],
    dataInputs: [{ id: "color", type: "color", defaultValue: createColor() }],
    dataOutputs: [
      { id: "red", type: "number", defaultValue: 1 },
      { id: "green", type: "number", defaultValue: 1 },
      { id: "blue", type: "number", defaultValue: 1 },
      { id: "alpha", type: "number", defaultValue: 1 },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var c = context.getInputValueColor(nodeData, "color");
      if (portId === "red") {
        return c[0];
      }
      if (portId === "green") {
        return c[1];
      }
      if (portId === "blue") {
        return c[2];
      }
      if (portId === "alpha") {
        return c[3];
      }
    },
    getShaderCode(node, context) {
      var ownVar = context.getShaderVar(node, "c", true);
      return `
      vec4 ${ownVar} = ${context.getShaderVar(node, "color")};
      float ${context.getShaderVar(node, "red", true)} = ${ownVar}.r;
      float ${context.getShaderVar(node, "green", true)} = ${ownVar}.g;
      float ${context.getShaderVar(node, "blue", true)} = ${ownVar}.b;
      float ${context.getShaderVar(node, "alpha", true)} = ${ownVar}.a;
      `;
    },
  },
  {
    id: "ColorMix",
    description: "Mix two color togerther using rgb mixing",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [
      { id: "start", type: "color", defaultValue: createColor(0, 0, 0, 1) },
      { id: "end", type: "color", defaultValue: createColor(1, 1, 1, 1) },
      { id: "t", type: "number", defaultValue: 0 },
    ],
    dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var start = context.getInputValueColor(nodeData, "start");
      var end = context.getInputValueColor(nodeData, "end");
      var t = context.getInputValueNumber(nodeData, "t");
      return VectorLerp(start, end, t);
    },
    getShaderCode(node, context) {
      return `vec4 ${context.getShaderVar(node, "color", true)} = mix(${context.getShaderVar(node, "start")}, ${context.getShaderVar(node, "end")}, ${context.getShaderVar(node, "t")});`;
    },
  },
  {
    id: "ColorMultiply",
    description: "Multiply color together",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [
      { id: "a", type: "color", defaultValue: createColor(0, 0, 0, 1) },
      { id: "b", type: "color", defaultValue: createColor(1, 1, 1, 1) },
    ],
    dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValueColor(nodeData, "a");
      var b = context.getInputValueColor(nodeData, "b");
      return VectorMultiplication(a, b);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "color", ["a", "b"], ([a, b]) => `${a}*${b}`);
    },
  },
  {
    id: "ColorAdd",
    description: "Add color together",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [
      { id: "a", type: "color", defaultValue: createColor(0, 0, 0, 1) },
      { id: "b", type: "color", defaultValue: createColor(1, 1, 1, 1) },
    ],
    dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValueColor(nodeData, "a");
      var b = context.getInputValueColor(nodeData, "b");
      return VectorAddition(a, b);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "color", ["a", "b"], ([a, b]) => `${a}+${b}`);
    },
  },

  {
    id: "ColorScale",
    description: "Boost a color",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [
      { id: "source", type: "color", defaultValue: createColor(0, 0, 0, 1) },
      { id: "scale", type: "number", defaultValue: 1 },
    ],
    dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var source = context.getInputValueColor(nodeData, "source");
      var scale = context.getInputValueNumber(nodeData, "scale");
      return source.map((a) => a * scale);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "color", ["source", "scale"], ([a, b]) => `${a}*${b}`);
    },
  },
  {
    id: "HSL",
    description: "create a color from hue, saturation and lightness",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [
      { id: "hue", type: "number", defaultValue: 0 },
      { id: "saturation", type: "number", defaultValue: 1 },
      { id: "lightness", type: "number", defaultValue: 1 },
    ],
    dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var hue = context.getInputValueNumber(nodeData, "hue");
      var saturation = context.getInputValueNumber(nodeData, "saturation");
      var lightness = context.getInputValueNumber(nodeData, "lightness");
      return hslToRgb(hue % 1, clamp01(saturation), clamp01(lightness));
    },
    shaderRequirement: `
    vec3 hsl2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}`,
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "color", ["hue", "saturation", "lightness"], ([a, b, c]) => `vec4(hsl2rgb(vec3(${a},${b},${c})),1.0)`);
    },
  },
  {
    id: "HSV",
    description: "create a color from hue, saturation and value",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [
      { id: "hue", type: "number", defaultValue: 0 },
      { id: "saturation", type: "number", defaultValue: 1 },
      { id: "value", type: "number", defaultValue: 1 },
    ],
    dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var hue = context.getInputValueNumber(nodeData, "hue");
      var saturation = context.getInputValueNumber(nodeData, "saturation");
      var value = context.getInputValueNumber(nodeData, "value");
      return hsvToRgb(hue % 1, clamp01(saturation), clamp01(value));
    },
    shaderRequirement: `vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}`,
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "color", ["hue", "saturation", "value"], ([a, b, c]) => `vec4(hsv2rgb(vec3(${a},${b},${c})),1.0)`);
    },
  },
  {
    id: "WithAlpha",
    description: "Set the transparency of a color",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [
      { id: "color", type: "color", defaultValue: createColor(1, 1, 1, 1) },
      { id: "alpha", type: "number", defaultValue: 0 },
    ],
    dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var color = context.getInputValueColor(nodeData, "color");
      var alpha = context.getInputValueNumber(nodeData, "alpha");
      return [color[0], color[1], color[2], alpha];
    },
    getShaderCode(node, context) {
      return `vec4 ${context.getShaderVar(node, "color", true)} = vec4(${context.getShaderVar(node, "color")}.rgb,  ${context.getShaderVar(node, "alpha")});`;
    },
  },
  {
    id: "PickFromPalette",
    description: "Pick a color from a palette",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [{ id: "index", type: "number", defaultValue: 0 }],
    dataOutputs: [{ id: "color", type: "color", defaultValue: createColor() }],
    executeOutputs: [],
    settings: [{ id: "palette", type: "palette", defaultValue: [createColor(0, 0, 0, 1), createColor(1, 1, 1, 1)] }],
    getData: (portId, nodeData, context) => {
      var index = context.getInputValueNumber(nodeData, "index");
      var palette = nodeData.settings.palette as Array<any>;
      var tindex = Math.floor(index % palette.length);
      return palette[tindex];
    },
  },
  {
    id: "Gradient",
    description: "Create a manualy defined gradient",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [],
    dataOutputs: [{ id: "gradient", type: "gradient", defaultValue: createDefaultGradient() }],
    executeOutputs: [],
    settings: [{ id: "gradient", type: "gradient", defaultValue: createDefaultGradient() }],
    getData: (portId, nodeData, context) => {
      return nodeData.settings.gradient;
    },
  },
  {
    id: "Sample Gradient",
    description: "Sample a gradient",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [
      { id: "gradient", type: "gradient", defaultValue: createDefaultGradient() },
      { id: "pos", type: "number", defaultValue: 0.5 },
    ],
    dataOutputs: [{ id: "color", type: "color", defaultValue: createColor() }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      const gradient = context.getInputValueGradient(nodeData, "gradient") || createDefaultGradient();
      const pos = context.getInputValueNumber(nodeData, "pos");
      if (gradient.length === 0) {
        return createColor();
      }
      let prev = gradient[0];
      if (pos <= prev.pos) {
        return prev.color;
      }
      for (var stop of gradient) {
        if (pos < stop.pos) {
          return VectorLerp(prev.color, stop.color, clamp01(map(prev.pos, stop.pos, pos)));
        } else {
          prev = stop;
        }
      }
      return prev.color;
    },
  },
  {
    id: "Create Gradient",
    description: "Create a gradient from dynamics color",
    icon: IconColorFilter,
    tags: ["Color"],
    dataInputs: [
      { id: "color-0", type: "color", defaultValue: createColor() },
      { id: "pos-0", type: "number", defaultValue: 0 },
      { id: "color-1", type: "color", defaultValue: createColor(0, 0, 0) },
      { id: "pos-1", type: "number", defaultValue: 1 },
    ],
    dataOutputs: [{ id: "gradient", type: "gradient", defaultValue: createDefaultGradient() }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var list: Gradient = [];
      for (let i = 0; i < 10; i++) {
        if (nodeData.dataInputs[`color-${i}`] && nodeData.dataInputs[`pos-${i}`]) {
          list.push({
            pos: context.getInputValueNumber(nodeData, `pos-${i}`),
            color: context.getInputValueColor(nodeData, `color-${i}`),
          });
        }
      }
      list.sort((a, b) => a.pos - b.pos);
      return list;
    },
    contextMenu: {
      "Add color": (node) => {
        var count = Object.keys(node.dataInputs).length / 2;
        if (count > 10) {
          return;
        }
        var keyColor = `color-${count}`;
        node.dataInputs[keyColor] = createPortConnection({
          id: keyColor,
          type: "color",
          defaultValue: createColor(1, 1, 1),
        });
        var keyPos = `pos-${count}`;
        node.dataInputs[keyPos] = createPortConnection({
          id: keyPos,
          type: "number",
          defaultValue: 0.5,
        });
      },
      "Remove last color": (node) => {
        var count = Object.keys(node.dataInputs).length / 2;
        if (count <= 2) {
          return;
        }
        var keyColor = `color-${count - 1}`;
        var keyPos = `pos-${count - 1}`;
        delete node.dataInputs[keyColor];
        delete node.dataInputs[keyPos];
      },
    },
  },
];
