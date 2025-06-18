import { IconRotate3d } from "@tabler/icons-react";
import { Matrix4, Quaternion, Vector3 } from "three";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector3 } from "../../Types/vectorDataType";
import { toQuaternion } from "../../Utils/math/quaternionUtils";

const m = new Matrix4();

export const LookAtRotation: NodeDefinition = {
  id: "LookAtRotation",
  description: "Create a rotation that align vector axis to vector target",
  icon: IconRotate3d,
  featureLevel: 3,
  tags: ["Vector"],
  settings: [],
  dataInputs: [Port.vector3("eye", createVector3(0, 0, 1)), Port.vector3("target", createVector3(0, 0, 1)), Port.vector3("up", [0, 1, 0])],
  dataOutputs: [Port.quaternion("out")],
  getData: (portId, node, context) => {
    const eye = context.getInputValueVector3(node, "eye");
    const target = context.getInputValueVector3(node, "target");
    const up = context.getInputValueVector3(node, "up");
    m.lookAt(new Vector3(...eye), new Vector3(...target), new Vector3(...up));
    var tq = new Quaternion().setFromRotationMatrix(m);
    return toQuaternion(tq);
  },
};
