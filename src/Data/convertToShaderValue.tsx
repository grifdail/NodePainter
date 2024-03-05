import { PortType } from "./NodeDefinition";

export function convertToShaderValue(value: any, type: PortType): string {
  switch (type) {
    case "bool":
      return value.tostring();
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
