import { IconArrowsHorizontal, IconClock, IconFrame, IconMouse } from "@tabler/icons-react";
import { AddNode } from "../Data/NodeLibrary";
import { createVector } from "./Vector";

AddNode({
  id: "Time",
  description: "The current time relative to the execution of the preview, in second",
  icon: IconClock,
  tags: ["Input"],
  inputPorts: [],
  outputPorts: [{ id: "time", type: "number", defaultValue: 0 }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.p5.millis() / 1000;
  },
  execute: null,
});
AddNode({
  id: "Frame",
  description: "The current frame index relative to the execution of the preview",
  icon: IconFrame,
  tags: ["Input"],
  inputPorts: [],
  outputPorts: [{ id: "frame", type: "number", defaultValue: 0 }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.p5.frameCount;
  },
  execute: null,
});
AddNode({
  id: "MousePosition",
  description: "The position of the cursor relative to the canvas",
  icon: IconMouse,
  tags: ["Input"],
  inputPorts: [],
  outputPorts: [{ id: "pos", type: "vector2", defaultValue: createVector() }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return createVector(context.p5.mouseX, context.p5.mouseY);
  },
  execute: null,
});
AddNode({
  id: "MouseMovement",
  description: "The movement of the cursor since the last frame",
  icon: IconMouse,
  tags: ["Input"],
  inputPorts: [],
  outputPorts: [{ id: "pos", type: "vector2", defaultValue: createVector() }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return createVector(context.p5.pmouseX - context.p5.mouseX, context.p5.pmouseY - context.p5.mouseY);
  },
  execute: null,
});
AddNode({
  id: "DeltaTime",
  description: "The time since the last frame, in second",
  icon: IconClock,
  tags: ["Input"],
  inputPorts: [],
  outputPorts: [{ id: "dt", type: "number", defaultValue: 0 }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.p5.deltaTime / 1000;
  },
  execute: null,
});
AddNode({
  id: "Dimension",
  description: "The dimension of the canvas",
  icon: IconArrowsHorizontal,
  tags: ["Input"],
  inputPorts: [],
  outputPorts: [{ id: "dim", type: "vector2", defaultValue: createVector(0, 0) }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return createVector(context.p5.width, context.p5.height);
  },
  execute: null,
});
