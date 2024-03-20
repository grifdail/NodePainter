import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const ExecuteWithMotionBlur: NodeDefinition = {
  id: "WithMotionBlur",
  label: "Render with motion blur",
  description: "Execute the next instruction multiple time to create a motion blur effect",
  icon: IconColorFilter,
  tags: ["Transform"],
  dataInputs: [
    { id: "imageCount", type: "number", defaultValue: 5 },
    { id: "timeFrame", type: "number", defaultValue: 1 / 60 },
    { id: "opacity", type: "number", defaultValue: 0.1 },
  ],
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [],
  canBeExecuted: true,
  execute: (node, context) => {
    var graphic = context.blackboard[`${node.id}-canvas-cache`];
    if (!graphic) {
      graphic = context.p5.createGraphics(context.target.width, context.target.height);
      context.blackboard[`${node.id}-canvas-cache`] = graphic;
    }

    var imageCount = Math.floor(context.getInputValueNumber(node, "imageCount"));
    var timeFrame = context.getInputValueNumber(node, "timeFrame");
    var opacity = context.getInputValueNumber(node, "opacity");
    var oldTarget = context.target;
    var oldTime = context.time;
    for (let i = 0; i < imageCount; i++) {
      graphic.clear();
      context.target = graphic;
      context.time = oldTime - (i / imageCount) * timeFrame * 1000;
      if (node.execOutputs.execute) {
        context.execute(node.execOutputs.execute);
      }
      oldTarget.tint(255, opacity * 255);
      oldTarget.image(graphic, 0, 0);
    }
    context.time = oldTime;
    context.target = oldTarget;
    oldTarget.tint(255, 255);
    if (node.execOutputs.execute) {
      context.execute(node.execOutputs.execute);
    }
  },
};
