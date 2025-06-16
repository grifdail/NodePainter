import { inverseLerp, lerp } from "three/src/math/MathUtils";
import { Vector2 } from "./vectorDataType";
import p5 from "p5";

export type PathData = number[];

export type BezierPathData = number[]; // Point X, Point Y, CP delta X, CP delta Y

export function interpolatePath(path: PathData, pos: number): Vector2 {
  if (path.length < 3) {
    return [0, 0];
  }
  if (path.length < 6) {
    return [path[0], path[1]];
  }
  var t = (pos % 1) * path[path.length - 1];
  for (let i = 3; i < path.length; i += 3) {
    const nextPointX = path[i + 0];
    const nextPointY = path[i + 1];
    const nextPointT = path[i + 2];
    if (t < nextPointT) {
      var pastPointX = path[i - 3];
      var pastPointY = path[i - 2];
      var pastPointT = path[i - 1];
      var dt = 1 - (nextPointT - t) / (nextPointT - pastPointT);
      return [lerp(pastPointX, nextPointX, dt), lerp(pastPointY, nextPointY, dt)];
    }
  }
  return [path[path.length - 3], path[path.length - 2]];
}

export function interpolateBezierPath(path: BezierPathData, pos: number): Vector2 {
  if (path.length < 4) {
    return [0, 0];
  }
  if (path.length < 8) {
    return [path[0], path[1]];
  }
  if (pos >= 1) {
    return [path[path.length - 4], path[path.length - 3]];
  }
  pos = pos % 1;
  var stopCount = Math.floor(path.length / 4) - 1;
  var tPrev = Math.floor(pos * stopCount);
  var dt = (pos * stopCount) % 1;
  return [p5.prototype.bezierPoint(path[tPrev * 4 + 0], path[tPrev * 4 + 0] + path[tPrev * 4 + 2], path[tPrev * 4 + 4] - path[tPrev * 4 + 6], path[tPrev * 4 + 4], dt), p5.prototype.bezierPoint(path[tPrev * 4 + 1], path[tPrev * 4 + 1] + path[tPrev * 4 + 3], path[tPrev * 4 + 5] - path[tPrev * 4 + 7], path[tPrev * 4 + 5], dt)];
}

export function interpolateBezierPathDir(path: BezierPathData, pos: number): Vector2 {
  if (path.length < 4) {
    return [0, 0];
  }
  if (path.length < 8) {
    return [path[2], path[3]];
  }
  pos = pos % 1;
  var stopCount = Math.floor(path.length / 4) - 1;
  var tPrev = Math.floor(pos * stopCount);
  var dt = (pos * stopCount) % 1;
  return [p5.prototype.bezierTangent(path[tPrev * 4 + 0], path[tPrev * 4 + 0] + path[tPrev * 4 + 2], path[tPrev * 4 + 4] - path[tPrev * 4 + 6], path[tPrev * 4 + 4], dt), p5.prototype.bezierTangent(path[tPrev * 4 + 1], path[tPrev * 4 + 1] + path[tPrev * 4 + 3], path[tPrev * 4 + 5] - path[tPrev * 4 + 7], path[tPrev * 4 + 5], dt)];
}
