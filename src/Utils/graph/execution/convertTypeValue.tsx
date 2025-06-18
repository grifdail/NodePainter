import { PortTypeDefinitions } from "../../../Types/PortTypeDefinitions";
import { PortType } from "../../../Types/PortType";

export function convertTypeValue(value: any, from: PortType | "any", to: PortType): any {
  if (from === to || from === "unknown" || to === "unknown") {
    return value;
  }
  if (from === "any") {
    return PortTypeDefinitions[to].createDefaultValue();
  }

  var converterFrom = PortTypeDefinitions[from].convert;
  if (converterFrom !== undefined) {
    var fn = converterFrom[to];
    if (fn !== undefined) {
      return fn(value);
    }
  }
  if (to === `array-${from}`) {
    return [value];
  } else if (to.startsWith("array-") && !from.startsWith("array-") && canConvertCode(from, to.slice(6) as PortType)) {
    return [convertTypeValue(value, from, to.slice(6) as PortType)];
  } else if (to.startsWith("array-") && from.startsWith("array-") && canConvertCode(from.slice(6) as PortType, to.slice(6) as PortType)) {
    return value.map((item: any) => convertTypeValue(item, from.slice(6) as PortType, to.slice(6) as PortType));
  } else {
    console.log(to);
    return PortTypeDefinitions[to].createDefaultValue();
  }
}

export function canConvertCode(from: PortType, to: PortType): boolean {
  if (from === to || from === "unknown" || to === "unknown" || to === `array-${from}`) {
    return true;
  }
  var converterFrom = PortTypeDefinitions[from].convert;
  if (converterFrom) {
    if (converterFrom[to] !== undefined) {
      return true;
    }
  }
  if (to.startsWith("array-") && !from.startsWith("array-") && canConvertCode(from, to.slice(6) as PortType)) {
    return true;
  } else if (to.startsWith("array-") && from.startsWith("array-") && canConvertCode(from.slice(6) as PortType, to.slice(6) as PortType)) {
    return true;
  } else {
    return false;
  }
}
export function canConvertShader(from: PortType, to: PortType): boolean {
  if (from === to || from === "unknown" || to === "unknown") {
    return true;
  }
  var converterFrom = PortTypeDefinitions[from].shaderConvert;
  if (converterFrom) {
    return converterFrom[to] !== undefined;
  }
  return false;
}

export function convertShaderType(varName: string, from: PortType, to: PortType): string {
  if (from === to || from === "unknown" || to === "unknown") {
    return varName;
  }
  var converterFrom = PortTypeDefinitions[from].shaderConvert;
  if (converterFrom === undefined) {
    return PortTypeDefinitions[to].createDefaultValue();
  }
  var fn = converterFrom[to];
  if (fn !== undefined) {
    return fn(varName);
  } else {
    return PortTypeDefinitions[to].createDefaultValue();
  }
}
