import { IconRotate3d } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createMultiTypeNodeDefinition } from "../../../Utils/graph/definition/createMultyTypeNodeDefinition";
import { eulerToQuat } from "../../../Utils/math/quaternionUtils";

export const EulerAngle: NodeDefinition = createMultiTypeNodeDefinition(
  {
    id: "Math/Quaternion/EulerAngle",
    label: "Euler Angle",
    description: "Create a rotation from rotation around the main axis",
    icon: IconRotate3d,
    featureLevel: 3,
    tags: ["Vector"],
    codeBlockType: "expression",
    settings: [
      {
        id: "order",
        type: "dropdown",
        defaultValue: "XYZ",
        options: ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"],
      },
    ],
  },
  {
    number: {
      dataInputs: [Port.number("x"), Port.number("y"), Port.number("z")],
      dataOutputs: [Port.quaternion("out")],
      getData: (portId, node, context) => {
        return eulerToQuat([context.getInputValueNumber(node, "x"), context.getInputValueNumber(node, "y"), context.getInputValueNumber(node, "z")], node.settings.order);
      },
    },
    vector3: {
      dataInputs: [Port.vector3("vec")],
      dataOutputs: [Port.quaternion("out")],
      getData: (portId, node, context) => {
        return eulerToQuat(context.getInputValueVector3(node, "vec"), node.settings.order);
      },
    },
  }
);
