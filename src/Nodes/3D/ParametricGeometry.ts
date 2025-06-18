import { IconCube, IconPlus } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector2 } from "../../Types/vectorDataType";
import { createOrSelectFromCache } from "../../Utils/graph/execution/blackboardCache";
import { applyConstraint, Constraints } from "../../Utils/ui/applyConstraints";
import { VirtualNodes } from "../3D/VirtualNodeTypes/VirtualNodeTypes";

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

export const ParametricGeometry: NodeDefinition = {
  id: "ParametricGeometry",
  label: "Parametric Geometry",
  icon: IconCube,
  description: "Create a 3D geometric based on as plane deformed based on it's uv coordinate",
  featureLevel: 101,
  dataInputs: [Port.vector2("dimension", createVector2(10, 10), [Constraints.VecInteger(), Constraints.VecGreaterThan(1)]), Port.vector3("value"), Port.CacheId()],
  dataOutputs: [Port.mesh("output")],
  tags: ["3D", "Mesh"],
  settings: [
    {
      id: "buttons",
      type: "buttons",
      buttons: [
        {
          label: "Create index node",
          icon: IconPlus,
          onClick: createIndexNode,
        },
      ],
    },
  ],
  getData(portId, node, context) {
    let dimension = context.getInputValueVector2(node, "dimension");
    dimension = applyConstraint(dimension, [Constraints.VecInteger(), Constraints.VecGreaterThan(1)]);
    var id = `${node.id}_${context.getInputValueNumber(node, "cache-id")}_${dimension[0]}_${dimension[1]}`;
    const positions = createOrSelectFromCache(context, node, () => {
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
      return posArray;
    });

    const callId = context.getCallId(node, id);
    return VirtualNodes.ParametricGeometryNodeType.generate(callId, [], dimension, positions);
  },
  contextMenu: {
    "Create the index node": createIndexNode,
  },
};
