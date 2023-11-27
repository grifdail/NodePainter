import { IconArrowsHorizontal, IconArrowsVertical, IconAssembly, IconClock } from "@tabler/icons-react";
import { AddNode } from "../Data/NodeLibrary";

AddNode({
  id: "Start",
  description: "The start of the program",
  icon: IconAssembly,
  tags: ["System"],
  inputPorts: [],
  outputPorts: [],
  executeOutputPorts: ["execute"],
  settings: [],
  getData: (portId, nodeData, context) => {},
  execute: (data, context) => {
    if (data.output.execute) {
      context.execute(data.output.execute);
    }
  },
  IsUnique: true,
});

AddNode({
  id: "Then",
  description: "Execute two instruction",
  icon: IconAssembly,
  tags: ["System"],
  inputPorts: [],
  outputPorts: [],
  executeOutputPorts: ["first", "second"],
  settings: [],
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    if (data.output.first) {
      context.execute(data.output.first);
    }
    if (data.output.second) {
      context.execute(data.output.second);
    }
  },
});

AddNode({
  id: "Time",
  description: "The current time relative to the execution of the preview, in second",
  icon: IconClock,
  tags: ["System"],
  inputPorts: [],
  outputPorts: [{ id: "time", type: "number", defaultValue: 0 }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.p5.millis() / 1000.0;
  },
  execute: null,
});

AddNode({
  id: "Width",
  description: "The dimension of the canvas",
  icon: IconArrowsHorizontal,
  tags: ["System"],
  inputPorts: [],
  outputPorts: [{ id: "width", type: "number", defaultValue: 0 }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.p5.width;
  },
  execute: null,
});

AddNode({
  id: "Height",
  description: "The dimension of the canvas",
  icon: IconArrowsVertical,
  tags: ["System"],
  inputPorts: [],
  outputPorts: [{ id: "height", type: "number", defaultValue: 0 }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.p5.height;
  },
  execute: null,
});
