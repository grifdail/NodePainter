import { clamp01, createColor } from "../Nodes/Color";
import { createVector2 } from "../Nodes/Vector";
import { PortType } from "./NodeDefinition";
import { createGradientFromPalette } from "./Palettes";

const Converter: { [key1: string]: { [key2: string]: null | undefined | ((value: any) => any) } } = {
  execute: {},
  number: {
    number: (a) => a,
    vector2: (a) => createVector2(a, 0),
    color: (a) => createColor(clamp01(a), clamp01(a), clamp01(a), clamp01(a)),
    string: (a) => a.toString(),
    bool: (a) => a !== 0,
    unknown: (a) => a,
  },
  vector2: {
    number: (a) => a[0],
    vector2: (a) => a,
    color: (a) => createColor(a[0], a[1], 0, 1),
    string: (a) => a.toString(),
    bool: (a) => a[0] !== 0 && a[1] !== 0,
    unknown: (a) => a,
  },
  color: {
    number: (a) => (a[0] + a[1] + a[2] + a[3]) / 4,
    vector2: (a) => createVector2(a[0], a[1]),
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
    vector2: (a) => (a ? createVector2(1, 1) : createVector2(0, 0)),
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

export function canConvert(from: PortType, to: PortType) {
  return !!Converter[from][to];
}
