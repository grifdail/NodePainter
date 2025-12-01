import { Icon, IconArrowUpRightCircle, IconBadge3d, IconBrush, IconColorSwatch, IconCube, IconNumber2, IconNumber3, IconNumber4, IconNumbers, IconPackage, IconPaint, IconPalette, IconPhoto, IconQuote, IconRotate3d, IconToggleLeft } from "@tabler/icons-react";
import { Euler, Quaternion, Vector2, Vector3, Vector4 } from "three";
import { BoolInput } from "../Components/Generics/Inputs/BoolInput";
import { ColorInput } from "../Components/Generics/Inputs/ColorInput";
import { MaterialInput } from "../Components/Generics/Inputs/MaterialInput";
import { NumberInput } from "../Components/Generics/Inputs/NumberInput";
import { QuaternionInput } from "../Components/Generics/Inputs/QuaternionInput";
import { TextInput } from "../Components/Generics/Inputs/TextInput";
import { VectorInput } from "../Components/Generics/Inputs/VectorInput";
import { createGradientFromPalette } from "../Data/Palettes";
import { createDefaultMaterial } from "../Utils/graph/definition/createDefaultMaterial";
import { convertToShaderNumber } from "../Utils/graph/execution/convertToShaderNumber";
import { clamp01 } from "../Utils/math/clamp01";
import { fromHex, White } from "../Utils/math/colorUtils";
import { compareVector } from "../Utils/math/compareVector";
import { toQuaternion } from "../Utils/math/quaternionUtils";
import { vectorAddition, vectorDivision, vectorLerp, vectorMultiplication, vectorSubstraction } from "../Utils/math/vectorUtils";
import { defaultEqual } from "../Utils/misc/defaultEqual";
import { InputComponent } from "./InputComponent";
import { ArrayPortType, BasePortType, PortType } from "./PortType";
import { vector2bool } from "./vector2bool";
import { createColor, createDefaultGradient, createVector2, createVector3, createVector4 } from "./vectorDataType";

type PortTypeTags = "common" | "vector" | "true-vector" | "array" | "utils" | "complex" | "spatial" | "hidden";

const BasePortTypeDefinitions: { [key in BasePortType]: PortTypeDefinition } = {
  number: {
    tags: ["common", "vector", "spatial"],
    color: "#29adff",
    icon: IconNumbers,
    inlineInput: NumberInput,
    smallIcon: IconNumbers,
    createDefaultValue: () => 0,
    convert: {
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
    subtractionOperator: (a, b) => a - b,
    additionOperator: (a, b) => a + b,
    multiplicationOperator: (a, b) => a * b,
    divisionOperator: (a, b) => a / b,
    equalityOperator: (a, b) => Math.abs(a - b) < Number.EPSILON,
    lerpOperator: (a, b, t) => (b - a) * t + a,
    vectorLength: 1,
    shaderConvert: {
      number: (v) => v,
      color: (v) => `vec4(${v},${v},${v},1.0)`,
      bool: (v) => `bool(${v})`,
      unknown: (v) => v,
      vector: (v) => v,
      vector2: (v) => `vec2(${v})`,
      vector3: (v) => `vec3(${v})`,
      vector4: (v) => `vec4(${v})`,
    },
    convertToShaderValue: convertToShaderNumber,
    convertToShaderType: "float",
    convertToShaderP5Uniform: (value) => value,
    convertToThreeType: (value) => value,
    convertToJs: JSON.stringify
  },
  vector: {
    tags: ["vector", "true-vector", "hidden"],
    color: "#7073c3",
    icon: IconArrowUpRightCircle,
    inlineInput: VectorInput,
    smallIcon: IconArrowUpRightCircle,
    createDefaultValue: createVector2,
    convert: {
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
    subtractionOperator: vectorSubstraction,
    additionOperator: vectorAddition,
    multiplicationOperator: vectorMultiplication,
    divisionOperator: vectorDivision,
    equalityOperator: compareVector,
    lerpOperator: vectorLerp,
    shaderConvert: {},
    convertToJs: JSON.stringify
  },
  vector2: {
    tags: ["common", "spatial", "vector", "true-vector"],
    color: "#7073c3",
    icon: IconArrowUpRightCircle,
    inlineInput: VectorInput,
    smallIcon: IconNumber2,
    createDefaultValue: createVector2,
    vectorLength: 2,
    convert: {
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
    subtractionOperator: vectorSubstraction,
    additionOperator: vectorAddition,
    multiplicationOperator: vectorMultiplication,
    divisionOperator: vectorDivision,
    equalityOperator: compareVector,
    lerpOperator: vectorLerp,
    shaderConvert: {
      number: (v) => `${v}.x`,
      color: (v) => `vec4(${v}.xy, 0.0, 1.0)`,
      unknown: (v) => v,
      vector: (v) => v,
      vector2: (v) => v,
      vector3: (v) => `vec3(${v}.xy, 0.0)`,
      vector4: (v) => `vec4(${v}.xy, 0.0, 0.0)`,
    },
    convertToShaderValue: (value) => `vec2(${convertToShaderNumber(value[0])}, ${convertToShaderNumber(value[1])})`,
    convertToShaderType: "vec2",
    convertToThreeType: (value) => new Vector2(...value),
    componentNames: ["x", "y"],
    convertToJs: JSON.stringify
  },
  vector3: {
    tags: ["common", "spatial", "vector", "true-vector"],
    color: "#f145bc",
    icon: IconArrowUpRightCircle,
    inlineInput: VectorInput,
    smallIcon: IconNumber3,
    createDefaultValue: createVector3,
    componentNames: ["x", "y", "z"],
    convert: {
      number: (a) => a[0],
      color: (a) => createColor(a[0], a[1], a[2], 1),
      string: (a) => a.toString(),
      bool: vector2bool,
      unknown: (a) => a,
      vector: (a) => a,
      vector2: (a) => createVector2(...a),
      vector3: (a) => a,
      vector4: (a) => createVector4(...a),
      quaternion: (a) => toQuaternion(new Quaternion().setFromEuler(new Euler(...a))),
    },
    subtractionOperator: vectorSubstraction,
    additionOperator: vectorAddition,
    multiplicationOperator: vectorMultiplication,
    divisionOperator: vectorDivision,
    equalityOperator: compareVector,
    lerpOperator: vectorLerp,
    vectorLength: 3,
    shaderConvert: {
      number: (v) => `${v}.x`,
      color: (v) => `vec4(${v}.xyz, 1.0)`,
      unknown: (v) => v,
      vector: (v) => v,
      vector2: (v) => `${v}.xy`,
      vector3: (v) => v,
      vector4: (v) => `vec4(${v}.xyz, 0.0)`,
    },
    convertToShaderType: "vec3",
    convertToThreeType: (value) => new Vector3(...value),
    convertToShaderValue: (value) => `vec3(${convertToShaderNumber(value[0])}, ${convertToShaderNumber(value[1])}, ${convertToShaderNumber(value[2])})`,
    convertToJs: JSON.stringify
  },
  vector4: {
    tags: ["spatial", "vector", "true-vector"],
    color: "#f76707",
    icon: IconArrowUpRightCircle,
    inlineInput: VectorInput,
    smallIcon: IconNumber4,
    createDefaultValue: createVector4,
    componentNames: ["x", "y", "z", "w"],
    convert: {
      number: (a) => a[0],
      color: (a) => a,
      string: (a) => a.toString(),
      bool: vector2bool,
      unknown: (a) => a,
      vector: (a) => a,
      vector2: (a) => createVector2(...a),
      vector3: (a) => createVector3(...a),
      vector4: (a) => a,
      quaternion: (a) => a,
    },
    subtractionOperator: vectorSubstraction,
    additionOperator: vectorAddition,
    multiplicationOperator: vectorMultiplication,
    divisionOperator: vectorDivision,
    equalityOperator: compareVector,
    lerpOperator: vectorLerp,
    vectorLength: 4,
    shaderConvert: {
      number: (v) => `${v}.x`,
      color: (v) => v,
      bool: (v) => `bool(${v})`,
      unknown: (v) => v,
      vector: (v) => v,
      vector2: (v) => `${v}.xy`,
      vector3: (v) => `${v}.xyz`,
      vector4: (v) => v,
    },
    convertToShaderType: "vec4",
    convertToThreeType: (value) => new Vector4(...value),
    convertToShaderValue: (value) => `vec4(${convertToShaderNumber(value[0])}, ${convertToShaderNumber(value[1])}, ${convertToShaderNumber(value[2])}, ${convertToShaderNumber(value[3])})`,
    convertToJs: JSON.stringify
  },
  quaternion: {
    tags: ["common"],
    color: "#f73f07",
    icon: IconRotate3d,
    smallIcon: IconRotate3d,
    inlineInput: QuaternionInput,
    componentNames: ["x", "y", "z", "w"],
    createDefaultValue: () => createVector4(0, 0, 0, 1),
    convert: {},
    vectorLength: 4,
    multiplicationOperator: (a, b) => {
      var aq = new Quaternion(...a);
      var bq = new Quaternion(...b);
      return toQuaternion(aq.multiply(bq));
    },
    lerpOperator: (a, b, t) => {
      var aq = new Quaternion(...a);
      var bq = new Quaternion(...b);
      return toQuaternion(aq.slerp(bq, t));
    },
    equalityOperator: compareVector,
    shaderConvert: {},
    convertToThreeType: (value) => new Vector4(...value),
    convertToJs: JSON.stringify
  },
  color: {
    tags: ["common", "vector", "true-vector"],
    color: "#f76707",
    icon: IconPalette,
    inlineInput: ColorInput,
    smallIcon: IconPalette,
    createDefaultValue: createColor,
    componentNames: ["red", "green", "blue", "alpha"],
    convert: {
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
      material: (a) => createDefaultMaterial(a),
    },
    subtractionOperator: vectorSubstraction,
    additionOperator: vectorAddition,
    multiplicationOperator: vectorMultiplication,
    divisionOperator: vectorDivision,
    equalityOperator: compareVector,
    vectorLength: 4,
    lerpOperator: vectorLerp,
    shaderConvert: {
      number: (v) => `${v}.x`,
      vector: (v) => v,
      vector2: (v) => `${v}.xy`,
      vector3: (v) => `${v}.xyz`,
      vector4: (v) => v,
      color: (v) => v,
    },
    convertToShaderType: "vec4",
    convertToThreeType: (value) => new Vector4(...value),
    convertToShaderValue: (value) => `vec4(${convertToShaderNumber(value[0])}, ${convertToShaderNumber(value[1])}, ${convertToShaderNumber(value[2])}, ${convertToShaderNumber(value[3])})`,
    convertToJs: JSON.stringify
  },
  string: {
    tags: ["common"],
    color: "#ae3ec9",
    icon: IconQuote,
    inlineInput: TextInput,
    smallIcon: IconQuote,
    createDefaultValue: () => "",
    convert: {
      number: (a) => (Number.isNaN(Number.parseFloat(a)) ? 0 : Number.parseFloat(a)),
      color: (a) => fromHex(a),
      string: (a) => a,
      unknown: (a) => a,
    },
    additionOperator: (a, b) => a + b,
    equalityOperator: defaultEqual,
    shaderConvert: {},
    convertToJs: JSON.stringify
  },
  bool: {
    tags: ["common"],
    color: "#FF77A8",
    icon: IconToggleLeft,
    inlineInput: BoolInput,
    smallIcon: IconToggleLeft,
    createDefaultValue: () => false,
    convert: {
      number: (a) => (a ? 1 : 0),
      vector: (a) => [a ? 0 : 1],
      vector2: (a) => (a ? createVector2(1, 1) : createVector2()),
      vector3: (a) => (a ? createVector3(1, 1, 1) : createVector3()),
      vector4: (a) => (a ? createVector4(1, 1, 1, 1) : createVector2()),
      color: (a) => (a ? White() : createColor(0, 0, 0, 1)),
      string: (a) => a.toString(),
      bool: (a) => a,
      unknown: (a) => a,
    },
    subtractionOperator: (a, b) => a ^ b,
    additionOperator: (a, b) => a | b,
    multiplicationOperator: (a, b) => a * b,
    equalityOperator: defaultEqual,
    shaderConvert: {
      number: (v) => `float(${v})`,
      vector2: (v) => `vec2(${v})`,
      vector3: (v) => `vec3(${v})`,
      vector4: (v) => `vec4(${v})`,
      color: (v) => `vec4(${v})`,
      bool: (v) => v,
      unknown: (v) => v,
    },
    convertToShaderType: "bool",
    convertToShaderValue: (value) => value.toString(),
    convertToThreeType: (value) => value,
    convertToJs: JSON.stringify
  },
  image: {
    tags: ["common"],
    color: "#ab5236",
    icon: IconPhoto,
    smallIcon: IconPhoto,
    inlineInput: undefined,
    createDefaultValue: () => null,
    convert: {
      image: (a) => a,
      unknown: (a) => a,
    },
    shaderConvert: {
      image: (v) => v,
      unknown: (v) => v,
    },
    convertToShaderP5Uniform: (value) => value.getP5Uniform(),
    convertToShaderType: "sampler2D",
    convertToThreeType(value) {
      return value ? value.getThreeJs() : null;
    },
    convertToJs: (value) => `null`
  },
  gradient: {
    tags: ["common"],
    color: "#f59f00",
    icon: IconColorSwatch,
    smallIcon: IconColorSwatch,
    inlineInput: undefined,
    createDefaultValue: createDefaultGradient,
    convert: {
      string: (a) => a.toString(),
      gradient: (a) => a,
      unknown: (a) => a,
    },
    shaderConvert: {},
    convertToJs: JSON.stringify
  },
  material: {
    tags: ["common"],
    color: "#f7df07",
    icon: IconPaint,
    inlineInput: MaterialInput,
    smallIcon: IconPaint,
    createDefaultValue: () => createDefaultMaterial(),
    convert: {},
    shaderConvert: {},
    convertToJs: () => "null",
  },
  mesh: {
    tags: ["common"],
    color: "#7e2553",
    icon: IconCube,
    smallIcon: IconCube,
    createDefaultValue: () => null,
    convert: {},
    shaderConvert: {},
    convertToJs: () => "null",
  },
  struct: {
    tags: ["common"],
    color: "#ff004d",
    icon: IconPackage,
    smallIcon: IconPackage,
    createDefaultValue: () => null,
    convert: {
      string: (a) => JSON.stringify(a),
    },
    shaderConvert: {},
    convertToJs: JSON.stringify
  },
  object3d: {
    tags: ["common"],
    color: "#008751",
    icon: IconBadge3d,
    smallIcon: IconBadge3d,
    createDefaultValue: () => null,
    convert: {},
    shaderConvert: {},
    convertToJs: () => "null",
  },
  drawing2d: {
    tags: ["common"],
    color: "#00e436",
    icon: IconBrush,
    smallIcon: IconBrush,
    createDefaultValue: () => null,
    convert: {},
    shaderConvert: {},
    convertToJs: () => "null",
  },
};

export const ArrayPortTypeDefinitions: { [key in ArrayPortType]: PortTypeDefinition } = Object.fromEntries(
  Object.entries(BasePortTypeDefinitions).map(([baseType, baseDef]) => {
    const newType: PortTypeDefinition = {
      tags: ["array", ...baseDef.tags],
      color: baseDef.color,
      icon: baseDef.icon,
      smallIcon: baseDef.smallIcon,
      createDefaultValue: () => [],
      convert: {
        ...Object.fromEntries(
          Object.entries(baseDef.convert).map(([target, converter]) => {
            return [`array-${target}`, (newArray: any[]) => newArray.map(converter)];
          })
        ),
        string: baseDef.convert.string === undefined ? undefined : (newArray: any[]) => newArray.map((item) => baseDef.convert.string && baseDef.convert.string(item)).join(", "),
      },
      shaderConvert: {},
      convertToJs: baseDef.convertToJs === JSON.stringify ? JSON.stringify : () => `null`,
    };
    return [`array-${baseType}`, newType];
  })
) as any;

export const PortTypeDefinitions: { [key in PortType]: PortTypeDefinition } = {
  ...BasePortTypeDefinitions,
  ...ArrayPortTypeDefinitions,
  unknown: {
    tags: [],
    color: "",
    icon: undefined as any as Icon,
    createDefaultValue: () => null,
    convert: {},
    shaderConvert: {},
  },
};

export function portTypesWith(cb: (def: PortTypeDefinition) => boolean): PortType[] {
  return Object.keys(PortTypeDefinitions).filter((type) => cb(PortTypeDefinitions[type as PortType])) as PortType[];
}

export function portTypesWithProperty(property: keyof PortTypeDefinition, exclude: PortTypeTags[] = ["hidden"]): PortType[] {
  return portTypesWith((def) => property in def && (!exclude || exclude.every((tag) => !def.tags.includes(tag))));
}

export function portTypesWithTags(tags: PortTypeTags[], exclude: PortTypeTags[] = ["hidden"]): PortType[] {
  return portTypesWith((def) => tags.every((tag) => def.tags.includes(tag)) && (!exclude || exclude.every((tag) => !def.tags.includes(tag))));
}

type PortTypeDefinition = {
  tags: PortTypeTags[];
  color: string;
  icon: Icon;
  smallIcon?: Icon;
  inlineInput?: InputComponent;
  createDefaultValue: () => any;
  convert: { [key in PortType]?: (value: any) => any };
  subtractionOperator?: (a: any, b: any) => any;
  additionOperator?: (a: any, b: any) => any;
  multiplicationOperator?: (a: any, b: any) => any;
  divisionOperator?: (a: any, b: any) => any;
  equalityOperator?: (a: any, b: any) => boolean;
  lerpOperator?: (a: any, b: any, t: number) => any;
  shaderConvert: { [key in PortType]?: (value: any) => string };
  vectorLength?: number;
  convertToShaderValue?: (value: any) => string;
  convertToShaderType?: string;
  convertToShaderP5Uniform?: (value: any) => any;
  convertToThreeType?: (value: any) => any;
  componentNames?: string[];
  convertToJs?: (value: any) => string
};
