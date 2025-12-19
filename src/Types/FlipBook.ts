import { Color } from "./vectorDataType";

export type Flipbook = FlipbookFrame[];

export type FlipbookFrame = FlipbookLine[]

export type FlipbookLine = {
    color: Color;
    lineWidth: number
    points: number[]
}

export const createDefaultFlipbook = () => [[]];