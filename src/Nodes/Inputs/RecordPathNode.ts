import { IconRoute } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { interpolatePath, PathData } from "../../Types/PathData";
import { Port } from "../../Types/PortTypeGenerator";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const RecordPathNode: NodeDefinition = {
  id: "Input/RecordPath",
  label: "Record Path",
  description: "Replay a handdrawn path",
  icon: IconRoute,
  tags: ["Input"],
  dataInputs: [Port.number("pos", 0, [Constraints.Clamp01()]), Port.vector2("scale", [400, 400])],
  dataOutputs: [Port.vector2("out")],

  settings: [
    {
      id: "path",
      type: "path",
    },
  ],
  getData: (portId, nodeData, context) => {
    const path = nodeData.settings["path"] as PathData;
    const pos = context.getInputValueNumber(nodeData, "pos");
    const scale = context.getInputValueVector2(nodeData, "scale");
    var pp = interpolatePath(path, pos);
    return [pp[0] * scale[0], pp[1] * scale[1]];
  },
};
