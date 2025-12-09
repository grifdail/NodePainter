import { Color } from "./vectorDataType";

export type PaintAnimation = PaintAnimationLine[];

export type PaintAnimationLine = {
    color: Color;
    lineWidth: number
    points: Float32Array
}