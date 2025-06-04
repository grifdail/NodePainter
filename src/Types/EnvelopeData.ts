import { Easing, EasingFunctionType, evaluate } from "../libs/easing";
import { clamp01 } from "../Utils/clamp01";
import { map } from "../Utils/colorUtils";
import { VectorLerp } from "../Utils/vectorUtils";

export type EnvelopeData = EnvelopeStop[];
export type EnvelopeStop = {
  pos: number;
  height: number;
  lerp: EasingFunctionType;
};
export const createDefaultEnvelope = (): EnvelopeData => [
  { pos: 0, height: 0, lerp: "Linear" },
  { pos: 1, height: 1, lerp: "Linear" },
];

export const createDefaultEnvelopeStop = (): EnvelopeStop => ({
  pos: 0.5,
  height: 0.5,
  lerp: Easing.Linear,
});
export function interpolateEnvelope(envelope: EnvelopeData, pos: number): number {
  if (envelope.length === 0) {
    return 0;
  }
  let prev = envelope[0];
  if (pos <= prev.pos) {
    return prev.height;
  }
  for (var stop of envelope) {
    if (pos < stop.pos) {
      return VectorLerp([prev.height], [stop.height], evaluate(prev.lerp, clamp01(map(prev.pos, stop.pos, pos))))[0];
    } else {
      prev = stop;
    }
  }
  return prev.height;
}
