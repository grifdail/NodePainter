import { tesselate } from 'tess2-ts';
import { BufferAttribute, BufferGeometry, PlaneGeometry, Vector3 } from "three";
import { PortDefinition } from "../../../Types/PortDefinition";
import { Vector2 } from "../../../Types/vectorDataType";
import { SimpleNodeVirtualNodeType } from "./SimpleNodeVirtualNodeType";

const up = new Vector3(0, 1, 0);

export class ShapeGeometryNodeType extends SimpleNodeVirtualNodeType<BufferGeometry, [path: Vector2[], extrude: number, side: boolean, top: boolean, bottom: boolean]> {
    getInputs(): PortDefinition[] {
        return [];
    }
    getOutput(): PortDefinition {
        return {
            id: "",
            type: "string",
            defaultValue: undefined,
        };
    }
    getId(): string {
        return "ShapeGeometry";
    }
    getDescription(): string {
        return "";
    }
    create(path: Vector2[], extrude: number, side: boolean, top: boolean, bottom: boolean): BufferGeometry {
        const geo = new BufferGeometry();
        var points = path.flat();
        const triangulation = tesselate({
            contours: [points]
        })
        const positions: number[] = [];
        const indices: number[] = [];
        const UV: number[] = [];
        const normal: number[] = [];

        if (side) {
            for (let i = 0; i < path.length; i++) {
                const self = path[i];
                const next = path[(i + 1) % path.length]
                const prev = path[(i + path.length - 1) % path.length]
                var bb = new Vector3(self[0], -extrude * 0.5, self[1])
                var tt = new Vector3(self[0], extrude * 0.5, self[1])
                var ttnext = new Vector3(next[0], extrude * 0.5, next[1])
                var ttprev = new Vector3(prev[0], extrude * 0.5, prev[1])
                UV.push(0, 1, 0, 1);
                positions.push(bb.x, bb.y, bb.z)
                positions.push(tt.x, tt.y, tt.z)
                var n = ttnext.sub(ttprev).cross(up).normalize()
                normal.push(n.x, n.y, n.z, n.x, n.y, n.z);// Both vertext have the same normal
                if (i >= 1) {

                    indices.push((i - 0) * 2 + 0, (i - 1) * 2 + 0, (i - 1) * 2 + 1)
                    indices.push((i - 0) * 2 + 1, (i - 0) * 2 + 0, (i - 1) * 2 + 1)
                }
            }
            indices.push(0, (path.length - 1) * 2 + 0, (path.length - 1) * 2 + 1)
            indices.push(1, 0, (path.length - 1) * 2 + 1)
        }
        if (triangulation) {
            if (top) {
                const vertextCount = positions.length / 3;
                for (let i = 0; i < triangulation.vertexCount; i++) {
                    positions.push(triangulation.vertices[i * 2], extrude * 0.5, triangulation.vertices[i * 2 + 1])
                    UV.push(0, 0)
                    normal.push(0, 1, 0)
                }
                for (let i = 0; i < triangulation.elements.length; i += 3) {
                    indices.push(vertextCount + triangulation.elements[i + 0])
                    indices.push(vertextCount + triangulation.elements[i + 2])
                    indices.push(vertextCount + triangulation.elements[i + 1])
                }
            }
            if (bottom) {
                const vertextCount = positions.length / 3;
                for (let i = 0; i < triangulation.vertexCount; i++) {
                    positions.push(triangulation.vertices[i * 2], -extrude * 0.5, triangulation.vertices[i * 2 + 1])
                    UV.push(0, 0)
                    normal.push(0, -1, 0)
                }
                for (let i = 0; i < triangulation.elements.length; i += 3) {
                    indices.push(vertextCount + triangulation.elements[i + 0])
                    indices.push(vertextCount + triangulation.elements[i + 1])
                    indices.push(vertextCount + triangulation.elements[i + 2])
                }
            }
        }

        geo.setIndex(indices);
        geo.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
        geo.setAttribute("uv", new BufferAttribute(new Float32Array(UV), 2));
        geo.setAttribute("normal", new BufferAttribute(new Float32Array(normal), 2));
        return geo;
    }
    update(element: PlaneGeometry): void { }
    remove(element: PlaneGeometry): void { }

}
