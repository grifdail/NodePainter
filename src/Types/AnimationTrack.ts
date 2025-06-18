import { Easing, EasingFunctionType, evaluate } from "../libs/easing";
import { convertTypeValue } from "../Utils/convertTypeValue";
import { clamp01 } from "../Utils/math/clamp01";
import { map } from "../Utils/math/colorUtils";
import { PortType } from "./PortType";
import { PortTypeDefinitions } from "./PortTypeDefinitions";

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
    { pos: 0, value: PortTypeDefinitions[type].createDefaultValue(), lerp: Easing.Linear },
    { pos: 1, value: PortTypeDefinitions[type].createDefaultValue(), lerp: Easing.Linear },
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
  value: PortTypeDefinitions[type].createDefaultValue(),
  lerp: "Linear",
});

export function interpolateAnimation(track: AnimationTrack, pos: number): any {
  if (track.keyframes.length === 0) {
    return PortTypeDefinitions[track.type].createDefaultValue();
  }
  let prev = track.keyframes[0];
  if (pos <= prev.pos) {
    return prev.value;
  }
  for (var stop of track.keyframes) {
    if (pos < stop.pos) {
      const lerp = PortTypeDefinitions[track.type].lerpOperator;
      if (lerp) {
        return lerp(prev.value, stop.value, evaluate(prev.lerp, clamp01(map(prev.pos, stop.pos, pos))));
      } else {
        return prev.value;
      }
    } else {
      prev = stop;
    }
  }
  return prev.value;
}
