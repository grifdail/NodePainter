import { Vector2 } from "@use-gesture/react";

export function computeNewScale(viewbox: { x: number; y: number; scale: number; }, scale: number, origin: Vector2): number[] {
    var scaleDiff = viewbox.scale - viewbox.scale / scale;
    return [viewbox.x + origin[0] * scaleDiff, viewbox.y + origin[1] * scaleDiff, viewbox.scale / scale];
}
