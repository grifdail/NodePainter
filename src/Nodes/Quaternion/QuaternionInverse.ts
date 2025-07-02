import { IconRotate3d } from "@tabler/icons-react";
import { Quaternion } from "three";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { toQuaternion } from "../../Utils/math/quaternionUtils";

export const QuaternionInverse: NodeDefinition = {
  id: "QuaternionInverse",
  description: "Return the inverse of the input rotation",
  icon: IconRotate3d,
  tags: ["Vector"],
  settings: [],
  dataInputs: [Port.quaternion("in")],
  dataOutputs: [Port.quaternion("out")],
  codeBlockType: "expression",
  getData: (portId, node, context) => {
    return toQuaternion(new Quaternion(...context.getInputValueQuaternion(node, "in")).invert());
  },
};
