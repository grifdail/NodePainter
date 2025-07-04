import { IconEaseInOut } from "@tabler/icons-react";
import { AnimationTrack, convertAnimationTrackType, createDefaultAnimationTrack, interpolateAnimation } from "../../../Types/AnimationTrack";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";

const changeTypeData = changeTypeGenerator(portTypesWithTags(["common"], ["array"]), [], ["value"]);

export const AnimationCurveNode: NodeDefinition = {
  id: "Math/Interpolation/AnimationCurve",
  label: "Animation Curve",
  description: "Transform the value betwen 0 & 1 passed in to match the shape.",
  icon: IconEaseInOut,
  tags: ["Misc"],
  dataInputs: [{ id: "pos", type: "number", defaultValue: 0 }],
  dataOutputs: [{ id: "value", type: "vector2", defaultValue: 0 }],

  ...changeTypeData,
  onChangeType(node, type) {
    changeTypeData.onChangeType?.(node, type);
    node.settings["track"] = convertAnimationTrackType(type, node.settings["track"]);
  },
  settings: [
    {
      id: "track",
      type: "animation-track",
      defaultValue: createDefaultAnimationTrack("vector2"),
    },
  ],
  getData: (portId, nodeData, context) => {
    const envelope = nodeData.settings["track"] as AnimationTrack;
    const pos = context.getInputValueNumber(nodeData, "pos");
    return enforceCorrectVectorTypeForNode(nodeData, interpolateAnimation(envelope, pos));
  },
};
