import { Graphics } from "p5";
import { VectorSquareDistance } from "../../../Utils/vectorUtils";

function arrayEquals(a: number[], b: number[], sensibility: number = 10) {
  return VectorSquareDistance(a, b) < sensibility * sensibility;
}
type vec = { x: number; y: number };

function expandToNeighbours(queue: vec[], current: vec, width: number, height: number) {
  const x = current.x;
  const y = current.y;

  if (x - 1 > 0) {
    queue.push({ x: x - 1, y });
  }

  if (x + 1 < width) {
    queue.push({ x: x + 1, y });
  }

  if (y - 1 > 0) {
    queue.push({ x, y: y - 1 });
  }

  if (y + 1 < height) {
    queue.push({ x, y: y + 1 });
  }

  return queue;
}

export function floodFill(seed: vec, fillColor: number[], graphics: Graphics, sensibility: number = 10) {
  graphics.loadPixels();

  let index = 4 * (graphics.width * seed.y + seed.x);
  let seedColor = [graphics.pixels[index], graphics.pixels[index + 1], graphics.pixels[index + 2], graphics.pixels[index + 3]];

  let queue = [];
  queue.push(seed);

  while (queue.length > 0 && queue.length < 1000000) {
    let current = queue.shift();
    if (current === undefined) {
      continue;
    }
    index = 4 * (graphics.width * current.y + current.x);
    let color = [graphics.pixels[index], graphics.pixels[index + 1], graphics.pixels[index + 2], graphics.pixels[index + 3]];

    if (!arrayEquals(color, seedColor, sensibility)) {
      continue;
    }

    for (let i = 0; i < 4; i++) {
      graphics.pixels[index + i] = fillColor[0 + i];
    }

    queue = expandToNeighbours(queue, current, graphics.width, graphics.height);
  }

  graphics.updatePixels();
}
