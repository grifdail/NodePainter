import { IconRotate3d } from "@tabler/icons-react";
import { Quaternion, Vector3 } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector3 } from "../../../Types/vectorDataType";
import { toQuaternion } from "../../../Utils/math/quaternionUtils";
import { vectorNormalize } from "../../../Utils/math/vectorUtils";

export const AxisAngle: NodeDefinition = {
  id: "Math/Quaternion/AxisAngle",
  label: "Axis Angle",
  description: "Create a rotation from rotation around the specified axis",
  icon: IconRotate3d,
  featureLevel: 3,
  tags: ["Vector"],
  settings: [],
  dataInputs: [Port.vector3("axis", createVector3(0, 1, 0)), Port.number("angle")],
  dataOutputs: [Port.quaternion("out")],
  codeBlockType: "expression",
  getData: (portId, node, context) => {
    const axis = context.getInputValueVector3(node, "axis");
    const angle = context.getInputValueNumber(node, "angle");
    const axisNorm = vectorNormalize(axis);
    var tq = new Quaternion().setFromAxisAngle(new Vector3(...axisNorm), angle);
    return toQuaternion(tq);
  },
};
