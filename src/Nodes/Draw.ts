import { IconBrush, IconBucketDroplet } from "@tabler/icons-react";
import { AddNode } from "../Data/NodeLibrary";
import * as P5 from "p5";

AddNode({
  id: "FillBackground",
  description: "Fill the entire canvas",
  icon: IconBucketDroplet,
  tags: ["Draw"],
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
    var color = context.getInputValue(data, "color");
    context.p5.background(color);
  },
});

AddNode({
  id: "DrawCircle",
  description: "Draw a circle",
  icon: IconBrush,
  tags: ["Draw"],
  inputPorts: [
    {
      id: "color",
      type: "color",
      defaultValue: "#aaaaaa",
    },
    {
      id: "position",
      type: "vector2",
      defaultValue: P5.prototype.createVector(0, 0, 0),
    },
    {
      id: "radius",
      type: "number",
      defaultValue: 10,
    },
  ],
  outputPorts: [],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    var color = context.getInputValue(data, "color");
    var position = context.getInputValue(data, "position") as P5.Vector;
    var radius = context.getInputValue(data, "radius") as number;
    context.p5.noStroke();
    context.p5.fill(color);
    context.p5.circle(position.x, position.y, radius);
  },
});

AddNode({
  id: "DrawLine",
  description: "Draw a circle",
  icon: IconBrush,
  tags: ["Draw"],
  inputPorts: [
    {
      id: "color",
      type: "color",
      defaultValue: "#aaaaaa",
    },
    {
      id: "start",
      type: "vector2",
      defaultValue: P5.prototype.createVector(0, 0, 0),
    },
    {
      id: "end",
      type: "vector2",
      defaultValue: P5.prototype.createVector(0, 0, 0),
    },
    {
      id: "lineWidth",
      type: "number",
      defaultValue: 10,
    },
  ],
  outputPorts: [],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    var color = context.getInputValue(data, "color");
    var p1 = context.getInputValue(data, "start") as P5.Vector;
    var p2 = context.getInputValue(data, "end") as P5.Vector;
    var lineWidth = context.getInputValue(data, "lineWidth") as number;
    context.p5.stroke(color);
    context.p5.strokeWeight(lineWidth);
    context.p5.line(p1.x, p1.y, p2.x, p2.y);
  },
});
