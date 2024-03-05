import { IconArrowsHorizontal, IconArrowsShuffle, IconCalendar, IconClock, IconFrame, IconMouse, IconPhone } from "@tabler/icons-react";

import { createVector } from "./Vector";
import { NodeDefinition } from "../Data/NodeDefinition";
import { convertToShaderValue } from "../Data/convertToShaderValue";

export const InputNodes: Array<NodeDefinition> = [
  {
    id: "Time",
    description: "The current time relative to the execution of the preview, in second",
    icon: IconClock,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [{ id: "time", type: "number", defaultValue: 0 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return context.time / 1000;
    },
    getShaderCode(node, context) {
      return `float ${context.getShaderVar(node, "time", true)} = time / 1000.0;`;
    },
  },
  {
    id: "Clock",
    description: "The current system time.",
    icon: IconClock,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [
      { id: "hour24", type: "number", defaultValue: 0 },
      { id: "hour12", type: "number", defaultValue: 0 },
      { id: "minute", type: "number", defaultValue: 0 },
      { id: "seconds", type: "number", defaultValue: 0 },
    ],
    executeOutputs: [],
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
  },
  {
    id: "Calendar",
    description: "The current date.",
    icon: IconCalendar,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [
      { id: "day", type: "number", defaultValue: 0 },
      { id: "month", type: "number", defaultValue: 0 },
      { id: "year", type: "number", defaultValue: 0 },
      { id: "dayOfTheWeek", type: "number", defaultValue: 0 },
    ],
    executeOutputs: [],
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
  },
  {
    id: "Frame",
    description: "The current frame index relative to the execution of the preview",
    icon: IconFrame,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [{ id: "frame", type: "number", defaultValue: 0 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return context.p5.frameCount;
    },
  },
  {
    id: "Progress",
    description: "Repressent the progress of the animation as a value between 0 and 1.",
    icon: IconClock,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [{ id: "progress", type: "number", defaultValue: 0 }],
    executeOutputs: [],
    settings: [{ id: "preview-duration", defaultValue: 1, type: "number" }],
    getData: (portId, nodeData, context) => {
      return (context.time / (nodeData.settings["preview-duration"] * 1000)) % 1;
    },
    getShaderCode(node, context) {
      return `float ${context.getShaderVar(node, "progress", true)} = mod(time / (${convertToShaderValue(node.settings["preview-duration"], "number")} * 1000.0), 1.0);`;
    },
  },
  {
    id: "MousePosition",
    description: "The position of the cursor relative to the canvas",
    icon: IconMouse,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [{ id: "pos", type: "vector2", defaultValue: createVector() }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return createVector(context.p5.mouseX, context.p5.mouseY);
    },
  },
  {
    id: "DeviceRotation",
    description: "The rotation of the phisical device you're using",
    icon: IconPhone,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [
      { id: "x", type: "number", defaultValue: 0 },
      { id: "y", type: "number", defaultValue: 0 },
      { id: "z", type: "number", defaultValue: 0 },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "x") {
        return context.p5.rotationX;
      }
      if (portId === "y") {
        return context.p5.rotationY;
      }
      if (portId === "z") {
        return context.p5.rotationZ;
      }
    },
  },
  {
    id: "Random",
    description: "A random value, consistant across frames",
    icon: IconArrowsShuffle,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [{ id: "value", type: "number", defaultValue: 0 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return context.p5.random();
    },
  },
  {
    id: "MouseMovement",
    description: "The movement of the cursor since the last frame",
    icon: IconMouse,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [{ id: "pos", type: "vector2", defaultValue: createVector() }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return createVector(context.p5.pmouseX - context.p5.mouseX, context.p5.pmouseY - context.p5.mouseY);
    },
  },
  {
    id: "DeltaTime",
    description: "The time since the last frame, in second",
    icon: IconClock,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [{ id: "dt", type: "number", defaultValue: 0 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return context.p5.deltaTime / 1000;
    },
  },
  {
    id: "Dimension",
    description: "The dimension of the canvas",
    icon: IconArrowsHorizontal,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [{ id: "dim", type: "vector2", defaultValue: createVector(0, 0) }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return createVector(context.p5.width, context.p5.height);
    },
  },
];
