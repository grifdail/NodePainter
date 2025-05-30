import { lerp } from "three/src/math/MathUtils";
import { Vector2 } from "./vectorDataType";

export type PathData = number[];

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
