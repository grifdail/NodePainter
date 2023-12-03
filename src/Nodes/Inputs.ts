import { IconArrowsHorizontal, IconCalendar, IconClock, IconFrame, IconMouse } from "@tabler/icons-react";
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
    return context.time / 1000;
  },
  execute: null,
});

AddNode({
  id: "Clock",
  description: "The current system time.",
  icon: IconClock,
  tags: ["Input"],
  inputPorts: [],
  outputPorts: [
    { id: "hour24", type: "number", defaultValue: 0 },
    { id: "hour12", type: "number", defaultValue: 0 },
    { id: "minute", type: "number", defaultValue: 0 },
    { id: "seconds", type: "number", defaultValue: 0 },
  ],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    if (portId === "hour24") {
      return context.p5.hour();
    }
    if (portId === "hour12") {
      return context.p5.hour() % 12;
    }
    if (portId === "minute") {
      return context.p5.minute();
    }
    if (portId === "seconds") {
      return context.p5.second();
    }
  },
  execute: null,
});

AddNode({
  id: "Calendar",
  description: "The current date.",
  icon: IconCalendar,
  tags: ["Input"],
  inputPorts: [],
  outputPorts: [
    { id: "day", type: "number", defaultValue: 0 },
    { id: "month", type: "number", defaultValue: 0 },
    { id: "year", type: "number", defaultValue: 0 },
    { id: "dayOfTheWeek", type: "number", defaultValue: 0 },
  ],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    if (portId === "day") {
      return context.p5.day();
    }
    if (portId === "month") {
      return context.p5.month() % 12;
    }
    if (portId === "year") {
      return context.p5.year();
    }
    if (portId === "dayOfTheWeek") {
      return new Date().getDay();
    }
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
