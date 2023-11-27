import { IconAssembly, IconBrush, IconBucketDroplet } from "@tabler/icons-react";
import { AddNode } from "../Data/NodeLibrary";
import { getInputValue } from "../Data/NodeDefinition";
import * as p5 from "p5";

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
  id: "FillBackground",
  description: "Execute two instruction",
  icon: IconBucketDroplet,
  tags: ["System"],
  inputPorts: [
    {
      id: "color",
      type: "color",
      defaultValue: "#aaaaaa",
    },
  ],
  outputPorts: [],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    var color = getInputValue(data, "color", context);
    context.p5.background(color);
  },
});

AddNode({
  id: "DrawPoints",
  description: "Execute two instruction",
  icon: IconBrush,
  tags: ["System"],
  inputPorts: [
    {
      id: "color",
      type: "color",
      defaultValue: "#aaaaaa",
    },
    {
      id: "position",
      type: "vector2",
      defaultValue: p5.prototype.createVector(0, 0, 0),
    },
  ],
  outputPorts: [],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    var color = getInputValue(data, "color", context);
    //Do the processing thing here
  },
});
