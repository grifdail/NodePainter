import { P5CanvasInstance } from "@p5-wrapper/react";
import { Color as TColor } from "three";
import { Color, createColor, Gradient } from "../Types/vectorDataType";
import { VectorLerp } from "./vectorUtils";

export function clamp01(a: number) {
  return Math.min(1, Math.max(0, a));
}
export function map(a: number, b: number, c: number) {
  return (c - a) / (b - a);
}

export function toHex(c: Color, includeAlpha: boolean = false): string {
  return `#${componentToHex(c[0])}${componentToHex(c[1])}${componentToHex(c[2])}${includeAlpha ? componentToHex(c[3]) : ""}`;
}

export function toP5Color(c: Color, p5: P5CanvasInstance) {
  return p5.color(c[0] * 255, c[1] * 255, c[2] * 255, c[3] * 255);
}

export function toThreeColor(c: Color) {
  return new TColor(c[0], c[1], c[2]);
}
export function toThreeColorWithAlpha(c: Color): [TColor, number] {
  return [new TColor(c[0], c[1], c[2]), c[3]];
}

export function toRGB255Array(c: Color, floored: boolean = true) {
  const floor = floored ? Math.floor : (a: any) => a;
  return [floor(c[0] * 255), floor(c[1] * 255), floor(c[2] * 255), floor(c[3] * 255)];
}

export function fromHex(hex: string): Color {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);

  return result ? createColor(parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255, result[4] !== undefined ? parseInt(result[4], 16) / 255 : 0) : createColor();
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
export function hslToRgb(h: number, s: number, l: number) {
  let r: number, g: number, b: number;

  function hue2rgb(p: number, q: number, t: number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return createColor(r, g, b);
}
export function hsvToRgb(h: number, s: number, v: number) {
  let r: number = 0,
    g: number = 0,
    b: number = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return createColor(r, g, b);
}
export function evaluateGradient(gradient: Gradient, pos: number) {
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
}

export function White() {
  return createColor(1, 1, 1, 1);
}
export function Black() {
  return createColor(0, 0, 0, 1);
}
