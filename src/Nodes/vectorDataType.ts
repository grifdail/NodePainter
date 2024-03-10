export type Vector2 = [number, number];
export type Vector4 = [number, number, number, number];
export type Vector3 = [number, number, number];
export type Color = [number, number, number, number];
export type GradientStop = { pos: number; color: Color };
export type Gradient = GradientStop[];
export type Vector = Vector2 | Vector3 | Vector4 | Color;

export const createVector2 = (x: number = 0, y: number = 0): Vector2 => [x, y];
export const createVector3 = (x: number = 0, y: number = 0, z: number = 0): Vector3 => [x, y, z];
export const createVector4 = (x: number = 0, y: number = 0, z: number = 0, w: number = 0): Vector4 => [x, y, z, w];

export function createColor(r: number = 0, g: number = 0, b: number = 0, a: number = 1): Color {
  return [r, g, b, a];
}
export function createDefaultGradient(): Gradient {
  return [
    { pos: 0, color: createColor(0, 0, 0) },
    { pos: 1, color: createColor(1, 1, 1) },
  ];
}

export type ColorPalette = Array<Color>;
export type PaletteCollection = { [key: string]: ColorPalette };
export type GradientCollection = { [key: string]: Gradient };
