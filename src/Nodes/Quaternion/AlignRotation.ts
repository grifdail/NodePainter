import { IconRotate3d } from "@tabler/icons-react";
import { Quaternion, Vector3 } from "three";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector3 } from "../../Types/vectorDataType";
import { toQuaternion } from "../../Utils/quaternionUtils";
import { VectorNormalize } from "../../Utils/vectorUtils";

export const AlignRotation: NodeDefinition = {
  id: "AlignRotation",
  label: "Align Rotation",
  description: "Create a rotation that align vector axis to vector target",
  icon: IconRotate3d,
  featureLevel: 3,
  tags: ["Vector"],
  settings: [],
  dataInputs: [Port.vector3("axis", createVector3(0, 0, 1)), Port.vector3("target", createVector3(0, 0, 1))],
  dataOutputs: [Port.quaternion("out")],
  getData: (portId, node, context) => {
    const axis = context.getInputValueVector3(node, "axis");
    const target = context.getInputValueVector3(node, "target");
    const axisNorm = VectorNormalize(axis);
    const targetNorm = VectorNormalize(target);
    var tq = new Quaternion().setFromUnitVectors(new Vector3(...axisNorm), new Vector3(...targetNorm));
    return toQuaternion(tq);
  },
};
