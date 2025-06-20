import { IconMathFunction } from "@tabler/icons-react";
import Rand from "rand-seed";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Vector2 } from "../../Types/vectorDataType";
import { createOrSelectFromCache } from "../../Utils/graph/execution/blackboardCache";
import { vectorSquareDistance } from "../../Utils/math/vectorUtils";

export const PoissonDisk: NodeDefinition = {
  id: "PoissonDisk",
  tags: ["Math", "Vector", "Array"],
  icon: IconMathFunction,
  description: "Generate an number of 2d points uniformely distributed on the unit square.",
  dataInputs: [Port.number("min-dist", 0.01), Port.CacheId()],
  dataOutputs: [Port["array-vector2"]("points")],

  settings: [],
  getData: (portId, nodeData, context) => {
    const minDist = context.getInputValueNumber(nodeData, "min-dist");

    return createOrSelectFromCache(context, nodeData, () => poissonDisk(minDist, context.RNG));
  },
};

function poissonDisk(minDist: number, rng: Rand, tries: number = 20) {
  if (minDist <= 0) {
    return [];
  }
  const points: Vector2[] = [];
  const candidates: Vector2[] = [];
  const minDistSq = minDist * minDist;

  var startPoint: Vector2 = [rng.next(), rng.next()];
  const cellSize = minDist / Math.sqrt(2);
  const grid = new CellGrid(cellSize);
  points.push(startPoint);
  candidates.push(startPoint);
  grid.add(startPoint);

  while (candidates.length > 0) {
    const currentPoint = candidates.pop() as Vector2;
    for (let i = 0; i < tries; i++) {
      const alpha = rng.next() * Math.PI * 2;
      const radius = rng.next() * minDist + minDist;
      const newPoint: Vector2 = [currentPoint[0] + Math.cos(alpha) * radius, currentPoint[1] + Math.sin(alpha) * radius];
      if (newPoint[0] > 0 && newPoint[0] <= 1 && newPoint[1] > 0 && newPoint[1] <= 1) {
        var neightbors = grid.getNeightbors(newPoint);
        if (neightbors.length === 0 || neightbors.every((point) => vectorSquareDistance(newPoint, point) > minDistSq)) {
          candidates.push(newPoint);
          points.push(newPoint);
          grid.add(newPoint);
        }
      }
    }
  }
  console.log(points);
  return points;
}

class CellGrid {
  data: { [key: string]: Vector2 } = {};
  cellSize: number;
  constructor(size: number) {
    this.cellSize = size;
  }
  add(vec: Vector2) {
    var x = (this.data[this.getKey(vec)] = vec);
  }
  getNeightbors(vec: Vector2) {
    var { x, y } = this.getCellCoordinate(vec);
    var result = [];
    if (this.data[`${x - 1}_${y - 1}`]) {
      result.push(this.data[`${x - 1}_${y - 1}`]);
    }
    if (this.data[`${x}_${y - 1}`]) {
      result.push(this.data[`${x}_${y - 1}`]);
    }
    if (this.data[`${x + 1}_${y - 1}`]) {
      result.push(this.data[`${x + 1}_${y - 1}`]);
    }
    if (this.data[`${x - 1}_${y}`]) {
      result.push(this.data[`${x - 1}_${y}`]);
    }
    if (this.data[`${x}_${y}`]) {
      result.push(this.data[`${x}_${y}`]);
    }
    if (this.data[`${x + 1}_${y}`]) {
      result.push(this.data[`${x + 1}_${y}`]);
    }
    if (this.data[`${x - 1}_${y + 1}`]) {
      result.push(this.data[`${x - 1}_${y + 1}`]);
    }
    if (this.data[`${x}_${y + 1}`]) {
      result.push(this.data[`${x}_${y + 1}`]);
    }
    if (this.data[`${x + 1}_${y + 1}`]) {
      result.push(this.data[`${x + 1}_${y + 1}`]);
    }
    return result;
  }

  private getKey(vec: Vector2) {
    var { x, y } = this.getCellCoordinate(vec);
    return `${x}_${y}`;
  }

  private getCellCoordinate(vec: Vector2) {
    var x = Math.floor(vec[0] / this.cellSize);
    var y = Math.floor(vec[1] / this.cellSize);
    return { x, y };
  }
}
