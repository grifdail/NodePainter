import { invertLerp } from "../math/invertLerp";

export function calculateSVGPathForMathFunction(values: number[], width: number, height: number, max: number, min: number, close: boolean = true) {
  const path = [`M 0,${height} `];
  for (let i = 0; i < values.length; i++) {
    path.push(`L ${(i / (values.length - 1)) * width}, ${height * invertLerp(min, max, values[i])}`);
  }
  if (close) {
    path.push(`L ${width},${height} Z`);
  }

  return path;
}
