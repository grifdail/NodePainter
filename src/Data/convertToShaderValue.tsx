import { PortType } from "./NodeDefinition";

export function convertToShaderValue(value: any, type: PortType): string {
  switch (type) {
    case "bool":
      return value.toString();
    case "color":
      return `vec4(${convertToShaderValue(value.r, "number")}, ${convertToShaderValue(value.g, "number")}, ${convertToShaderValue(value.b, "number")}, ${convertToShaderValue(value.a, "number")})`;
    case "execute":
      return "";
    case "gradient":
      return "";
    case "image":
      return "";
    case "string":
      return "";
    case "vector2":
      return `vec4(${convertToShaderValue(value.x, "number")}, ${convertToShaderValue(value.y, "number")}, 0.0, 0.0)`;
    case "number":
      var str: string = Number.isNaN(value) ? "0.0" : value.toString();
      if (str.indexOf(".") < 0) {
        return `${str}.0`;
      } else {
        return str;
      }
    default:
      return "";
  }
}

export function getShaderType(type: PortType): string {
  switch (type) {
    case "bool":
      return "bool";
    case "color":
      return `vec4`;
    case "execute":
      return "";
    case "gradient":
      return "";
    case "image":
      return "sampler2D";
    case "string":
      return "";
    case "vector2":
      return `vec2`;
    case "vector3":
      return `vec3`;
    case "vector4":
      return `vec4`;
    case "number":
      return "float";
    default:
      return "";
  }
}

export function convertToUniform(type: PortType, value: any): any {
  switch (type) {
    case "bool":
      return value;
    case "color":
      return [value.r, value.g, value.b, value.a];
    case "execute":
      return "";
    case "gradient":
      return "";
    case "image":
      return value.image;
    case "string":
      return "";
    case "vector2":
      return [value.x, value.y, 0, 0];
    case "number":
      return value;
    default:
      return "";
  }
}
