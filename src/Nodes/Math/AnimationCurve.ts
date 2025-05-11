import { IconEaseInOut } from "@tabler/icons-react";
import { AnimationTrack, convertAnimationTrackType, createDefaultAnimationTrack, interpolateAnimation } from "../../Types/AnimationTrack";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { CommonTypes } from "../../Types/PortType";
import { EnforceGoodType } from "../../Utils/vectorUtils";

export const AnimationCurve: NodeDefinition = {
  id: "AnimationCurve",
  label: "Animation Curve",
  description: "Transform the value betwen 0 & 1 passed in to match the shape.",
  icon: IconEaseInOut,
  tags: ["Misc"],
  dataInputs: [{ id: "pos", type: "number", defaultValue: 0 }],
  dataOutputs: [{ id: "value", type: "vector2", defaultValue: 0 }],

  availableTypes: CommonTypes,
  onChangeType(node, type) {
    node.settings["track"] = convertAnimationTrackType(type, node.settings["track"]);
  },
  settings: [
    {
      id: "track",
      type: "animationTrack",
      defaultValue: createDefaultAnimationTrack("vector2"),
    },
  ],
  getData: (portId, nodeData, context) => {
    const envelope = nodeData.settings["track"] as AnimationTrack;
    const pos = context.getInputValueNumber(nodeData, "pos");
    return EnforceGoodType(nodeData, interpolateAnimation(envelope, pos));
  },
};
