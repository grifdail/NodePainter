import { Easing, EasingFunctionType, evaluate } from "../libs/easing";
import { clamp01, map } from "../Utils/colorUtils";
import { convertTypeValue } from "../Utils/convertTypeValue";
import { createDefaultValue } from "../Utils/createDefaultValue";
import { VectorLerp } from "../Utils/vectorUtils";
import { PortType, VectorTypesFull } from "./PortType";

export type AnimationTrack = {
  type: PortType;
  keyframes: AnimationKeyFrame[];
};
export type AnimationKeyFrame = {
  pos: number;
  value: any;
  lerp: EasingFunctionType;
};
export const createDefaultAnimationTrack = (type: PortType): AnimationTrack => ({
  type: type,
  keyframes: [
    { pos: 0, value: createDefaultValue(type), lerp: Easing.Linear },
    { pos: 1, value: createDefaultValue(type), lerp: Easing.Linear },
  ],
});

export const convertAnimationTrackType = (type: PortType, oldTrack: AnimationTrack) => ({
  type,
  keyframes: oldTrack.keyframes.map((frame) => ({
    ...frame,
    value: convertTypeValue(frame.value, oldTrack.type, type),
  })),
});

export const createDefaultAnimationKeyframe = (type: PortType): AnimationKeyFrame => ({
  pos: 0.5,
  value: createDefaultValue(type),
  lerp: "Linear",
});

export function interpolateAnimation(track: AnimationTrack, pos: number): any {
  if (track.keyframes.length === 0) {
    return createDefaultValue(track.type);
  }
  var isLerpable = VectorTypesFull.includes(track.type);
  let prev = track.keyframes[0];
  if (pos <= prev.pos) {
    return prev.value;
  }
  for (var stop of track.keyframes) {
    if (pos < stop.pos) {
      if (isLerpable) {
        var a = track.type === "number" ? [prev.value] : prev.value;
        var b = track.type === "number" ? [stop.value] : stop.value;
        return VectorLerp(a, b, evaluate(prev.lerp, clamp01(map(prev.pos, stop.pos, pos))));
      } else {
        return prev.value;
      }
    } else {
      prev = stop;
    }
  }
  return prev.value;
}
