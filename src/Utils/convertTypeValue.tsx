import { createDefaultValue } from "./createDefaultValue";
import { PortType } from "../Types/PortType";
import { ConverterCode } from "./ConverterCode";
import { ConverterShader } from "./ConverterShader";

export function convertTypeValue(value: any, from: PortType, to: PortType): any {
  if (from === to || from === "unknown" || to === "unknown") {
    return value;
  }

  var converterFrom = ConverterCode[from];
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
    return createDefaultValue(to);
  }
}

export function canConvertCode(from: PortType, to: PortType): boolean {
  if (from === to || from === "unknown" || to === "unknown" || to === `array-${from}`) {
    return true;
  }
  var converterFrom = ConverterCode[from];
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
  var converterFrom = ConverterShader[from];
  if (converterFrom) {
    return converterFrom[to] !== undefined;
  }
  return false;
}

export function convertShaderType(varName: string, from: PortType, to: PortType): string {
  if (from === to || from === "unknown" || to === "unknown") {
    return varName;
  }
  var converterFrom = ConverterShader[from];
  if (converterFrom === undefined) {
    return createDefaultValue(to);
  }
  var fn = converterFrom[to];
  if (fn !== undefined) {
    return fn(varName);
  } else {
    return createDefaultValue(to);
  }
}
