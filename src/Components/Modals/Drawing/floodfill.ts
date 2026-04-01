import { Graphics } from "p5";
import { Vector, Vector4 } from "../../../Types/vectorDataType";
import { vectorBiReduce } from "../../../Utils/math/vectorUtils";

function arrayEquals<T extends Vector>(a: T, b: T, sensibility: number = 10) {
    return vectorBiReduce(a, b, (prev, a, b) => prev + Math.abs(a - b), 0) < sensibility * sensibility;
}
type vec = { x: number; y: number };

function expandToNeighbours(queue: vec[], current: vec, width: number, height: number, visited: any, pixelDensity: number) {
    const x = current.x;
    const y = current.y;

    if (x - 1 > 0 && !visited[pixelDensity * (width * y + (x - 1))]) {
        queue.push({ x: x - 1, y });
        visited[pixelDensity * (width * y + (x - 1))] = true;
    }

    if (x + 1 < width && !visited[pixelDensity * (width * y + (x + 1))]) {
        queue.push({ x: x + 1, y });
        visited[pixelDensity * (width * y + (x + 1))] = true;
    }

    if (y - 1 > 0 && !visited[pixelDensity * (width * (y - 1) + x)]) {
        queue.push({ x, y: y - 1 });
        visited[pixelDensity * (width * (y - 1) + x)] = true;
    }

    if (y + 1 < height && !visited[pixelDensity * (width * (y + 1) + x)]) {
        queue.push({ x, y: y + 1 });
        visited[pixelDensity * (width * (y + 1) + x)] = true;
    }

    return queue;
}

export function floodFill(seed: vec, fillColor: number[], graphics: Graphics, sensibility: number = 10) {
    graphics.loadPixels();

    let index = 4 * (graphics.width * seed.y + seed.x) * graphics.pixelDensity();
    let seedColor: Vector4 = [graphics.pixels[index], graphics.pixels[index + 1], graphics.pixels[index + 2], graphics.pixels[index + 3]];

    let queue = [];
    queue.push(seed);

    let visited: any = { [index]: true };

    while (queue.length > 0 && queue.length < 1000000) {
        let current = queue.shift();
        if (current === undefined) {
            continue;
        }

        index = 4 * (graphics.width * current.y + current.x) * graphics.pixelDensity();
        let color: Vector4 = [graphics.pixels[index], graphics.pixels[index + 1], graphics.pixels[index + 2], graphics.pixels[index + 3]];

        if (!arrayEquals(color, seedColor, sensibility)) {
            continue;
        }

        for (let i = 0; i < 4; i++) {
            graphics.pixels[index + i] = fillColor[0 + i];
        }

        queue = expandToNeighbours(queue, current, graphics.width, graphics.height, visited, graphics.pixelDensity());
    }

    graphics.updatePixels();
}
