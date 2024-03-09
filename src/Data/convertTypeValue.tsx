import { clamp01, createColor, createDefaultGradient } from "../Nodes/Color";
import { createVector } from "../Nodes/Vector";
import { PortType } from "./NodeDefinition";
import { createGradientFromPalette } from "./Palettes";

const Converter: { [key1: string]: { [key2: string]: null | undefined | ((value: any) => any) } } = {
  execute: {},
  number: {
    number: (a) => a,
    vector2: (a) => createVector(a, 0),
    color: (a) => createColor(clamp01(a), clamp01(a), clamp01(a), clamp01(a)),
    string: (a) => a.toString(),
    bool: (a) => a !== 0,
    unknown: (a) => a,
  },
  vector2: {
    number: (a) => a.x,
    vector2: (a) => a,
    color: (a) => createColor(a.x, a.y, 0, 1),
    string: (a) => a.toString(),
    bool: (a) => a.x !== 0 && a.y !== 0,
    unknown: (a) => a,
  },
  color: {
    number: (a) => (a.r + a.g + a.b + a.a) / 4,
    vector2: (a) => createVector(a.r, a.g),
    color: (a) => a,
    string: (a) => a.toString(),
    gradient: (a) => createGradientFromPalette([a]),
    unknown: (a) => a,
  },
  string: {
    string: (a) => a,
    unknown: (a) => a,
  },
  bool: {
    execute: null,
    number: (a) => (a ? 1 : 0),
    vector2: (a) => (a ? createVector(1, 1) : createVector(0, 0)),
    color: (a) => (a ? createColor(1, 1, 1, 1) : createColor(0, 0, 0, 0)),
    string: (a) => a.toString(),
    bool: (a) => a,
    unknown: (a) => a,
  },
  image: {
    image: (a) => a,
    unknown: (a) => a,
  },
  gradient: {
    string: (a) => a.toString(),
    gradient: (a) => a,
    unknown: (a) => a,
  },
  unknown: {
    unknown: (a) => a,
  },
};

export function convertTypeValue(value: any, from: PortType, to: PortType) {
  var fn = Converter[from][to];
  if (fn != null) {
    return fn(value);
  } else {
    return value;
  }
}
