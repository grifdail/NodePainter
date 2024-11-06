import { clamp01, map } from "../Utils/colorUtils";
import { VectorLerp } from "../Utils/vectorUtils";

export enum AnimationEasingType {
  Linear = "linear",
  Horizontal = "horizontal",
  Vertical = "vertical",
  Easein = "easein",
  Easeout = "easeout",
  Easeinout = "easeinout",
}
export const AnimationEasingTypeArray = Object.values(AnimationEasingType);

export type EnvelopeData = EnvelopeStop[];
export type EnvelopeStop = {
  pos: number;
  height: number;
  lerp: AnimationEasingType;
};
export const createDefaultEnvelope = (): EnvelopeData => [
  { pos: 0, height: 0, lerp: AnimationEasingType.Linear },
  { pos: 1, height: 1, lerp: AnimationEasingType.Linear },
];

export const AnimationLerpFunction: { [key in AnimationEasingType]: (x: number) => number } = {
  linear: (x) => x,
  horizontal: (x) => 0,
  vertical: (x) => 1,
  easein: (x) => x * x,
  easeout: (x) => x * (2 - x),
  easeinout: (x) => (x < 0.5 ? 2 * x * x : -1 + (4 - 2 * x) * x),
};

export const createDefaultEnvelopeStop = (): EnvelopeStop => ({
  pos: 0.5,
  height: 0.5,
  lerp: AnimationEasingType.Linear,
});
export function interpolateEnvelope(envelope: EnvelopeData, pos: number): any {
  if (envelope.length === 0) {
    return 0;
  }
  let prev = envelope[0];
  if (pos <= prev.pos) {
    return prev.height;
  }
  for (var stop of envelope) {
    if (pos < stop.pos) {
      return VectorLerp([prev.height], [stop.height], AnimationLerpFunction[prev.lerp](clamp01(map(prev.pos, stop.pos, pos))));
    } else {
      prev = stop;
    }
  }
  return prev.height;
}
