import { createDefaultValue } from "./createDefaultValue";
import { PortType } from "../Types/PortType";
import { ConverterCode } from "./ConverterCode";
import { ConverterShader } from "./ConverterShader";

export function convertTypeValue(value: any, from: PortType, to: PortType) {
  if (from === to || from === "unknown" || to === "unknown") {
    return value;
  }
  var converterFrom = ConverterCode[from];
  if (converterFrom === undefined) {
    return createDefaultValue(to);
  }
  var fn = converterFrom[to];
  if (fn !== undefined) {
    return fn(value);
  } else {
    return createDefaultValue(to);
  }
}

export function canConvertCode(from: PortType, to: PortType) {
  if (from === to || from === "unknown" || to === "unknown") {
    return true;
  }
  var converterFrom = ConverterCode[from];
  if (converterFrom) {
    return converterFrom[to] !== undefined;
  }
}
export function canConvertShader(from: PortType, to: PortType) {
  if (from === to || from === "unknown" || to === "unknown") {
    return true;
  }
  var converterFrom = ConverterShader[from];
  if (converterFrom) {
    return converterFrom[to] !== undefined;
  }
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
