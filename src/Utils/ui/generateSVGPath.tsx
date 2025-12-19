import { PathData } from "../../Types/PathData";

export function generateSVGPath(path: number[], elemCount: number = 2, offset: number = 0): string | undefined {
    if (path.length < 3) {
        return undefined;
    }
    const points = [`M ${path[0 + offset]} ${path[1 + offset]}`];
    for (let i = elemCount; i < path.length; i += elemCount) {
        points.push(`L ${path[i + offset]} ${path[i + 1 + offset]}`);
    }
    return points.join("\n");
}
