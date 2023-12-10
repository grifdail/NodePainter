import { IconColorFilter, IconPalette } from "@tabler/icons-react";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { createPortConnection } from "../Data/createPortConnection";

export type Color = { r: number; g: number; b: number; a: number };
export type GradientStop = { pos: number; color: Color };
export type Gradient = GradientStop[];

export function createColor(r: number = 0, g: number = 0, b: number = 0, a: number = 1): Color {
  return { r, g, b, a };
}
export function createDefaultGradient(): any {
  return [
    { pos: 0, color: createColor(0, 0, 0) },
    { pos: 1, color: createColor(1, 1, 1) },
  ];
}

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
      return createColor(context.getInputValue(nodeData, "red") as number, context.getInputValue(nodeData, "green") as number, context.getInputValue(nodeData, "blue") as number, context.getInputValue(nodeData, "alpha") as number);
    },
    execute: null,
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
      var c = context.getInputValue(nodeData, "color") as Color;
      if (portId === "red") {
        return c.r;
      }
      if (portId === "green") {
        return c.g;
      }
      if (portId === "blue") {
        return c.b;
      }
      if (portId === "alpha") {
        return c.a;
      }
    },
    execute: null,
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
      var start = context.getInputValue(nodeData, "start") as Color;
      var end = context.getInputValue(nodeData, "end") as Color;
      var t = context.getInputValue(nodeData, "t") as number;
      return lerpColor(start, end, t);
    },
    execute: null,
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
      var color = context.getInputValue(nodeData, "color") as Color;
      var alpha = context.getInputValue(nodeData, "alpha") as number;
      return createColor(color.r, color.g, color.b, alpha);
    },
    execute: null,
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
      var index = context.getInputValue(nodeData, "index");
      var palette = nodeData.settings.palette as Array<any>;
      var tindex = Math.floor(index % palette.length);
      return palette[tindex];
    },
    execute: null,
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
    execute: null,
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
      const gradient = (context.getInputValue(nodeData, "gradient") as Gradient) || createDefaultGradient();
      const pos = context.getInputValue(nodeData, "pos") as number;
      if (gradient.length === 0) {
        return createColor();
      }
      let prev = gradient[0];
      if (pos <= prev.pos) {
        return prev.color;
      }
      for (var stop of gradient) {
        if (pos < stop.pos) {
          return lerpColor(prev.color, stop.color, clamp01(map(prev.pos, stop.pos, pos)));
        } else {
          prev = stop;
        }
      }
      return prev.color;
    },
    execute: null,
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
            pos: context.getInputValue(nodeData, `pos-${i}`),
            color: context.getInputValue(nodeData, `color-${i}`),
          });
        }
      }
      list.sort((a, b) => a.pos - b.pos);
      return list;
    },
    execute: null,
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

function lerpColor(start: Color, end: Color, t: number): any {
  return createColor(lerp(start.r, end.r, t), lerp(start.g, end.g, t), lerp(start.b, end.b, t), lerp(start.a, end.a, t));
}

function clamp01(a: number) {
  return Math.min(1, Math.max(0, a));
}

function map(a: number, b: number, c: number) {
  return (c - a) / (b - a);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
export function toHex(c: Color, includeAlpha: boolean = false): string {
  return `#${componentToHex(c.r)}${componentToHex(c.g)}${componentToHex(c.b)}${includeAlpha ? componentToHex(c.a) : ""}`;
}

export function toP5Color(c: Color, p5: P5CanvasInstance) {
  return p5.color(c.r * 255, c.g * 255, c.b * 255, c.a * 255);
}

export function fromHex(hex: string): Color {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
        a: result[4] !== undefined ? parseInt(result[4], 16) / 255 : 0,
      }
    : createColor();
}

export function validateHex(hex: string) {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.test(hex);
}

function componentToHex(c: number) {
  var hex = Math.floor(c * 255).toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function invertColor(hex: string, bw: boolean): string {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  }
  // invert color components
  const rs = (255 - r).toString(16);
  const gs = (255 - g).toString(16);
  const bs = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(rs) + padZero(gs) + padZero(bs);
}
function padZero(str: string) {
  const len = 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}
