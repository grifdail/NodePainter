import { clamp01 } from "./colorUtils";
import { createColor, createVector2, createVector3, createVector4 } from "../Types/vectorDataType";
import { createDefaultValue } from "./createDefaultValue";
import { PortType } from "../Types/PortType";
import { createGradientFromPalette } from "../Data/Palettes";
import { createDefaultMaterial } from "../Types/MaterialData";

const vector2bool = (a: number[]) => a.some((x: number) => x !== 0);
type ConverterType = {
  shader?: (v: string) => string;

  code: (v: any) => any;
};

const Converter: { [key1 in PortType]: { [key2 in PortType]: null | undefined | ConverterType } } = {
  execute: {
    string: undefined,
    number: undefined,
    execute: undefined,
    unknown: undefined,
    vector2: undefined,
    color: undefined,
    bool: undefined,
    image: undefined,
    gradient: undefined,
    vector: undefined,
    vector3: undefined,
    vector4: undefined,
    material: undefined,
  },
  number: {
    number: {
      code: (a) => a,
      shader: (v) => v,
    },
    color: {
      code: (a) => createColor(clamp01(a), clamp01(a), clamp01(a), clamp01(a)),
      shader: (v) => `vec4(${v},${v},${v},1.0)`,
    },
    string: {
      code: (a) => a.toString(),
    },
    bool: {
      code: (a) => a !== 0,
      shader: (v) => `bool(${v})`,
    },
    unknown: {
      code: (a) => a,
      shader: (v) => v,
    },
    vector: {
      code: (a) => [a],
      shader: (v) => v,
    },
    vector2: {
      code: (a) => createVector2(a),
      shader: (v) => `vec2(${v})`,
    },
    vector3: {
      code: (a) => createVector3(a),
      shader: (v) => `vec3(${v})`,
    },
    vector4: {
      code: (a) => createVector4(a),
      shader: (v) => `vec4(${v})`,
    },
    execute: undefined,
    image: undefined,
    gradient: undefined,
    material: undefined,
  },
  vector2: {
    number: {
      code: (a) => a[0],
      shader: (v) => `${v}.x`,
    },
    color: {
      code: (a) => createColor(a[0], a[1], 0, 1),
      shader: (v) => `vec4(${v}.xy, 0.0, 1.0)`,
    },
    string: {
      code: (a) => a.toString(),
    },
    bool: {
      code: vector2bool,
    },
    unknown: {
      code: (a) => a,
      shader: (v) => v,
    },
    vector: {
      code: (a) => a,
      shader: (v) => v,
    },
    vector2: {
      code: (a) => a,
      shader: (v) => v,
    },
    vector3: {
      code: (a) => createVector3(...a),
      shader: (v) => `vec3(${v}.xy, 0.0)`,
    },
    vector4: {
      code: (a) => createVector4(...a),
      shader: (v) => `vec4(${v}.xy, 0.0, 0.0)`,
    },
    execute: undefined,
    image: undefined,
    gradient: undefined,
    material: undefined,
  },
  vector3: {
    number: {
      code: (a) => a[0],
      shader: (v) => `${v}.x`,
    },
    color: {
      code: (a) => createColor(a[0], a[1], a[2], 1),
      shader: (v) => `vec4(${v}.xyz, 1.0)`,
    },
    string: {
      code: (a) => a.toString(),
    },
    bool: {
      code: vector2bool,
    },
    unknown: {
      code: (a) => a,
      shader: (v) => v,
    },
    vector: {
      code: (a) => a,
      shader: (v) => v,
    },
    vector2: {
      code: (a) => createVector2(...a),
      shader: (v) => `${v}.xy`,
    },
    vector3: {
      code: (a) => a,
      shader: (v) => v,
    },
    vector4: {
      code: (a) => createVector4(...a),
      shader: (v) => `vec4(${v}.xyz, 0.0)`,
    },
    execute: undefined,
    image: undefined,
    gradient: undefined,
    material: undefined,
  },
  vector4: {
    number: {
      code: (a) => a[0],
      shader: (v) => `${v}.x`,
    },
    color: {
      code: (a) => a,
      shader: (v) => v,
    },
    string: {
      code: (a) => a.toString(),
    },
    bool: {
      code: vector2bool,
      shader: (v) => `bool(${v})`,
    },
    unknown: {
      code: (a) => a,
      shader: (v) => v,
    },
    vector: {
      code: (a) => a,
      shader: (v) => v,
    },
    vector2: {
      code: (a) => createVector2(...a),
      shader: (v) => `${v}.xy`,
    },
    vector3: {
      code: (a) => createVector3(...a),
      shader: (v) => `${v}.xyz`,
    },
    vector4: {
      code: (a) => a,
      shader: (v) => v,
    },
    execute: undefined,
    image: undefined,
    gradient: undefined,
    material: undefined,
  },
  vector: {
    number: {
      code: (a) => a[0],
    },
    color: {
      code: (a) => createColor(...a),
      shader: (v) => v,
    },
    string: {
      code: (a) => a.toString(),
    },
    bool: {
      code: vector2bool,
    },
    unknown: {
      code: (a) => a,
      shader: (v) => v,
    },
    vector: {
      code: (a) => a,
      shader: (v) => v,
    },
    vector2: {
      code: (a) => createVector2(...a),
    },
    vector3: {
      code: (a) => createVector3(...a),
    },
    vector4: {
      code: (a) => createVector4(...a),
    },
    execute: undefined,
    image: undefined,
    gradient: undefined,
    material: undefined,
  },
  color: {
    number: {
      code: (a) => (a[0] + a[1] + a[2] + a[3]) / 4,
      shader: (v) => `${v}.x`,
    },
    vector: {
      code: (a) => a,
      shader: (v) => v,
    },
    bool: {
      code: vector2bool,
    },
    vector2: {
      code: (a) => createVector2(...a),
      shader: (v) => `${v}.xy`,
    },
    vector3: {
      code: (a) => createVector3(...a),
      shader: (v) => `${v}.xyz`,
    },
    vector4: {
      code: (a) => createVector4(...a),
      shader: (v) => v,
    },
    color: {
      code: (a) => a,
      shader: (v) => v,
    },
    string: {
      code: (a) => a.toString(),
    },
    gradient: {
      code: (a) => createGradientFromPalette([a]),
    },
    unknown: {
      code: (a) => a,
    },
    execute: undefined,
    image: undefined,
    material: {
      code: (a) => createDefaultMaterial(a),
    },
  },
  string: {
    string: {
      code: (a) => a,
    },
    unknown: {
      code: (a) => a,
    },
    number: undefined,
    execute: undefined,
    vector2: undefined,
    color: undefined,
    bool: undefined,
    image: undefined,
    gradient: undefined,
    vector: undefined,
    vector3: undefined,
    vector4: undefined,
    material: undefined,
  },
  bool: {
    execute: null,
    number: {
      code: (a) => (a ? 1 : 0),
      shader: (v) => `float(${v})`,
    },
    vector: {
      code: (a) => [a ? 0 : 1],
    },
    vector2: {
      code: (a) => (a ? createVector2(1, 1) : createVector2()),
      shader: (v) => `vec2(${v})`,
    },
    vector3: {
      code: (a) => (a ? createVector3(1, 1, 1) : createVector3()),
      shader: (v) => `vec3(${v})`,
    },
    vector4: {
      code: (a) => (a ? createVector4(1, 1, 1, 1) : createVector2()),
      shader: (v) => `vec4(${v})`,
    },
    color: {
      code: (a) => (a ? createColor(1, 1, 1, 1) : createColor(0, 0, 0, 0)),
      shader: (v) => `vec4(${v})`,
    },
    string: {
      code: (a) => a.toString(),
    },
    bool: {
      code: (a) => a,
      shader: (v) => v,
    },
    unknown: {
      code: (a) => a,
      shader: (v) => v,
    },
    image: undefined,
    gradient: undefined,
    material: undefined,
  },
  image: {
    image: {
      code: (a) => a,
      shader: (v) => v,
    },
    unknown: {
      code: (a) => a,
      shader: (v) => v,
    },
    string: undefined,
    number: undefined,
    execute: undefined,
    vector2: undefined,
    color: undefined,
    bool: undefined,
    gradient: undefined,
    vector: undefined,
    vector3: undefined,
    vector4: undefined,
    material: undefined,
  },
  gradient: {
    string: {
      code: (a) => a.toString(),
    },
    gradient: {
      code: (a) => a,
    },
    unknown: {
      code: (a) => a,
    },
    number: undefined,
    execute: undefined,
    vector2: undefined,
    color: undefined,
    bool: undefined,
    image: undefined,
    vector: undefined,
    vector3: undefined,
    vector4: undefined,
    material: undefined,
  },
  unknown: {
    unknown: {
      code: (a) => a,
      shader: (v) => v,
    },
    string: undefined,
    number: undefined,
    execute: undefined,
    vector2: undefined,
    color: undefined,
    bool: undefined,
    image: undefined,
    gradient: undefined,
    vector: undefined,
    vector3: undefined,
    vector4: undefined,
    material: undefined,
  },
  material: {
    string: undefined,
    number: undefined,
    execute: undefined,
    vector2: undefined,
    color: undefined,
    bool: undefined,
    image: undefined,
    gradient: undefined,
    vector: undefined,
    vector3: undefined,
    vector4: undefined,
    material: undefined,
    unknown: undefined,
  },
};

export function convertTypeValue(value: any, from: PortType, to: PortType) {
  if (from === to) {
    return value;
  }
  var fn = Converter[from][to];
  if (fn != null) {
    return fn.code(value);
  } else {
    return createDefaultValue(to);
  }
}

export function canConvert(from: PortType, to: PortType) {
  return from === to || !!Converter[from][to];
}
export function convertShaderType(varName: string, from: PortType, to: PortType): string {
  var fn = Converter[from][to]?.shader;
  if (fn != null) {
    return fn(varName);
  } else {
    return createDefaultValue(to);
  }
}
