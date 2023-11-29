import { IconArrowUpRightCircle, IconColorFilter, IconPalette } from "@tabler/icons-react";
import { AddNode } from "../Data/NodeLibrary";

export type Color = { r: number; g: number; b: number; a: number };

export const createColor = (r: number = 0, g: number = 0, b: number = 0, a: number = 1): Color => ({ r, g, b, a });

AddNode({
  id: "ColorCompose",
  description: "Create a color from a set of number",
  icon: IconPalette,
  tags: ["Color"],
  inputPorts: [
    { id: "red", type: "number", defaultValue: 1 },
    { id: "green", type: "number", defaultValue: 1 },
    { id: "blue", type: "number", defaultValue: 1 },
    { id: "alpha", type: "number", defaultValue: 1 },
  ],
  outputPorts: [{ id: "color", type: "color", defaultValue: createColor() }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return createColor(context.getInputValue(nodeData, "red") as number, context.getInputValue(nodeData, "green") as number, context.getInputValue(nodeData, "blue") as number, context.getInputValue(nodeData, "alpha") as number);
  },
  execute: null,
});

AddNode({
  id: "ColorDecompose",
  description: "Decompose a color to set of number",
  icon: IconPalette,
  tags: ["Color"],
  inputPorts: [{ id: "color", type: "color", defaultValue: createColor() }],
  outputPorts: [
    { id: "red", type: "number", defaultValue: 1 },
    { id: "green", type: "number", defaultValue: 1 },
    { id: "blue", type: "number", defaultValue: 1 },
    { id: "alpha", type: "number", defaultValue: 1 },
  ],
  executeOutputPorts: [],
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
});

AddNode({
  id: "ColorDecompose",
  description: "Mix two color togerther using rgb mixing",
  icon: IconColorFilter,
  tags: ["Color"],
  inputPorts: [
    { id: "start", type: "color", defaultValue: createColor(0, 0, 0, 1) },
    { id: "end", type: "color", defaultValue: createColor(1, 1, 1, 1) },
    { id: "t", type: "number", defaultValue: 0 },
  ],
  outputPorts: [{ id: "color", type: "color", defaultValue: 1 }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var start = context.getInputValue(nodeData, "start") as Color;
    var end = context.getInputValue(nodeData, "start") as Color;
    var t = context.getInputValue(nodeData, "t") as number;
    return createColor(lerp(start.r, end.r, t), lerp(start.g, end.g, t), lerp(start.b, end.b, t), lerp(start.a, end.a, t));
  },
  execute: null,
});

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
export function toHex(c: Color, includeAlpha: boolean = false): string {
  return `#${componentToHex(c.r)}${componentToHex(c.g)}${componentToHex(c.b)}${includeAlpha ? componentToHex(c.a) : ""}`;
}
export function fromHex(hex: string): Color {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
        a: result[4] != undefined ? parseInt(result[4], 16) / 255 : 0,
      }
    : createColor();
}

export function validateHex(hex: string) {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.test(hex);
}

function componentToHex(c: number) {
  var hex = (c * 255).toString(16);
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
