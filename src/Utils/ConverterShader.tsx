import { PortType } from "../Types/PortType";

export const ConverterShader: {
  [key1 in PortType]?: {
    [key2 in PortType]?: (v: string) => string;
  };
} = {
  number: {
    number: (v) => v,
    color: (v) => `vec4(${v},${v},${v},1.0)`,
    bool: (v) => `bool(${v})`,
    unknown: (v) => v,
    vector: (v) => v,
    vector2: (v) => `vec2(${v})`,
    vector3: (v) => `vec3(${v})`,
    vector4: (v) => `vec4(${v})`,
  },
  vector2: {
    number: (v) => `${v}.x`,
    color: (v) => `vec4(${v}.xy, 0.0, 1.0)`,
    unknown: (v) => v,
    vector: (v) => v,
    vector2: (v) => v,
    vector3: (v) => `vec3(${v}.xy, 0.0)`,
    vector4: (v) => `vec4(${v}.xy, 0.0, 0.0)`,
  },
  vector3: {
    number: (v) => `${v}.x`,
    color: (v) => `vec4(${v}.xyz, 1.0)`,
    unknown: (v) => v,
    vector: (v) => v,
    vector2: (v) => `${v}.xy`,
    vector3: (v) => v,
    vector4: (v) => `vec4(${v}.xyz, 0.0)`,
  },
  vector4: {
    number: (v) => `${v}.x`,
    color: (v) => v,
    bool: (v) => `bool(${v})`,
    unknown: (v) => v,
    vector: (v) => v,
    vector2: (v) => `${v}.xy`,
    vector3: (v) => `${v}.xyz`,
    vector4: (v) => v,
  },
  color: {
    number: (v) => `${v}.x`,
    vector: (v) => v,
    vector2: (v) => `${v}.xy`,
    vector3: (v) => `${v}.xyz`,
    vector4: (v) => v,
    color: (v) => v,
  },

  bool: {
    number: (v) => `float(${v})`,
    vector2: (v) => `vec2(${v})`,
    vector3: (v) => `vec3(${v})`,
    vector4: (v) => `vec4(${v})`,
    color: (v) => `vec4(${v})`,
    bool: (v) => v,
    unknown: (v) => v,
  },
  image: {
    image: (v) => v,
    unknown: (v) => v,
  },
};
