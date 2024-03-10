import { clamp01 } from "./colorUtils";
import { createColor, createVector2, createVector3, createVector4 } from "./vectorDataType";
import { PortType, createDefaultValue } from "./NodeDefinition";
import { createGradientFromPalette } from "./Palettes";

const vector2bool = (a: number[]) => a.some((x: number) => x !== 0);

const Converter: { [key1: string]: { [key2: string]: null | undefined | ((value: any) => any) } } = {
  execute: {},
  number: {
    number: (a) => a,
    color: (a) => createColor(clamp01(a), clamp01(a), clamp01(a), clamp01(a)),
    string: (a) => a.toString(),
    bool: (a) => a !== 0,
    unknown: (a) => a,
    vector: (a) => [a],
    vector2: (a) => createVector2(a),
    vector3: (a) => createVector3(a),
    vector4: (a) => createVector4(a),
  },
  vector2: {
    number: (a) => a[0],
    color: (a) => createColor(a[0], a[1], 0, 1),
    string: (a) => a.toString(),
    bool: vector2bool,
    unknown: (a) => a,
    vector: (a) => a,
    vector2: (a) => a,
    vector3: (a) => createVector3(...a),
    vector4: (a) => createVector4(...a),
  },
  vector3: {
    number: (a) => a[0],
    color: (a) => createColor(a[0], a[1], a[2], 1),
    string: (a) => a.toString(),
    bool: vector2bool,
    unknown: (a) => a,
    vector: (a) => a,
    vector2: (a) => createVector2(...a),
    vector3: (a) => a,
    vector4: (a) => createVector4(...a),
  },
  vector4: {
    number: (a) => a[0],
    color: (a) => a,
    string: (a) => a.toString(),
    bool: vector2bool,
    unknown: (a) => a,
    vector: (a) => a,
    vector2: (a) => createVector2(...a),
    vector3: (a) => createVector3(...a),
    vector4: (a) => a,
  },
  vector: {
    number: (a) => a[0],
    color: (a) => createColor(...a),
    string: (a) => a.toString(),
    bool: vector2bool,
    unknown: (a) => a,
    vector: (a) => a,
    vector2: (a) => createVector2(...a),
    vector3: (a) => createVector3(...a),
    vector4: (a) => createVector4(...a),
  },
  color: {
    number: (a) => (a[0] + a[1] + a[2] + a[3]) / 4,
    vector: (a) => a,
    bool: vector2bool,
    vector2: (a) => createVector2(...a),
    vector3: (a) => createVector3(...a),
    vector4: (a) => createVector4(...a),
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
    vector: (a) => [a ? 0 : 1],
    vector2: (a) => (a ? createVector2(1, 1) : createVector2()),
    vector3: (a) => (a ? createVector3(1, 1, 1) : createVector3()),
    vector4: (a) => (a ? createVector4(1, 1, 1, 1) : createVector2()),
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
    return createDefaultValue(to);
  }
}

export function canConvert(from: PortType, to: PortType) {
  return !!Converter[from][to];
}
