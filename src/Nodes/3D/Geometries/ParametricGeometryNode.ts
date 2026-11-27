import { IconCube, IconPlus } from "@tabler/icons-react";
import { BufferAttribute, BufferGeometry } from "three";
import { useTree } from "../../../Hooks/useTree";
import { NodeData } from "../../../Types/NodeData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2 } from "../../../Types/vectorDataType";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { applyConstraint, Constraints } from "../../../Utils/ui/applyConstraints";

const createIndexNode = ({ id, positionX, positionY }: NodeData): void => {
    setTimeout(() => {
        useTree.getState().createBlackboardNode(
            [
                {
                    key: `${id}-uv`,
                    type: "vector2",
                    id: "uv",
                },
                {
                    key: `${id}-index`,
                    type: "number",
                    id: "index",
                },
            ],
            "Parametric geometry Index",
            positionX - 400,
            positionY,
            id
        );
    }, 10);
};

export const ParametricGeometryNode: NodeDefinition = {
    id: "3D/Geometry/ParametricGeometry",
    label: "Parametric Geometry",
    icon: IconCube,
    description: "Create a 3D geometric based on as plane deformed based on it's uv coordinate",
    featureLevel: 101,
    dataInputs: [
        Port.vector2("dimension", createVector2(10, 10), [Constraints.VecInteger(), Constraints.VecGreaterThan(1)]),
        Port.vector3("value"),
        Port.CacheId(),
        Port.Version()
    ],
    dataOutputs: [Port.mesh("output")],
    tags: ["3D", "Mesh"],
    settings: [
        {
            id: "buttons",
            type: "button",
            button: {
                label: "Create index node",
                icon: IconPlus,
                onClick: createIndexNode,
            },
        },
    ],
    getData(portId, node, context) {
        let dimension = context.getInputValueVector2(node, "dimension");
        dimension = applyConstraint(dimension, dimension, [Constraints.VecInteger(), Constraints.VecGreaterThan(1)]);
        const geo = readFromCacheWithVersion(context, node, () => {
            const posArray = new Float32Array((dimension[0] + 1) * (dimension[1] + 1) * 3);
            for (var x = 0; x <= dimension[0]; x++) {
                for (var y = 0; y <= dimension[1]; y++) {
                    var index = x * (dimension[1] + 1) + y;
                    context.blackboard[`${node.id}-uv`] = createVector2(x / dimension[0], y / dimension[1]);
                    context.blackboard[`${node.id}-index`] = index;
                    const result = context.getInputValueVector3(node, "value");
                    posArray.set(result, index * 3);
                }
            }


            const self = new BufferGeometry();
            const indices = new Array(6 * dimension[0] * dimension[1]);
            const UV = new Float32Array(2 * (dimension[0] + 1) * (dimension[1] + 1));
            let tri = 0;
            for (let x = 0; x <= dimension[0]; x++) {
                for (let y = 0; y <= dimension[1]; y++) {
                    UV[(x * (dimension[1] + 1) + y) * 2 + 0] = x / dimension[0];
                    UV[(x * (dimension[1] + 1) + y) * 2 + 1] = y / dimension[1];
                }
            }

            for (let x = 1; x <= dimension[0]; x++) {
                for (let y = 1; y <= dimension[1]; y++) {
                    const indexTopLeft = (x - 1) * (dimension[1] + 1) + (y - 1);
                    const indexTopRight = x * (dimension[1] + 1) + (y - 1);
                    const indexBottomLeft = (x - 1) * (dimension[1] + 1) + y;
                    const indexBottomRight = x * (dimension[1] + 1) + y;
                    if ((x + y) % 2 === 0) {
                        indices[tri + 0] = indexTopLeft;
                        indices[tri + 1] = indexTopRight;
                        indices[tri + 2] = indexBottomLeft;
                        indices[tri + 3] = indexBottomLeft;
                        indices[tri + 4] = indexTopRight;
                        indices[tri + 5] = indexBottomRight;
                    } else {
                        indices[tri + 0] = indexTopLeft;
                        indices[tri + 1] = indexTopRight;
                        indices[tri + 2] = indexBottomRight;
                        indices[tri + 3] = indexBottomRight;
                        indices[tri + 4] = indexBottomLeft;
                        indices[tri + 5] = indexTopLeft;
                    }
                    tri += 6;
                }
            }
            self.setIndex(indices);
            self.setAttribute("position", new BufferAttribute(posArray, 3));
            self.setAttribute("uv", new BufferAttribute(UV, 2));
            self.computeVertexNormals();
            return self;
        });

        return geo;
    }
};
