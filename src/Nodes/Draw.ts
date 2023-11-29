import { IconBucketDroplet, IconCircle, IconLine, IconRectangle } from "@tabler/icons-react";
import { AddNode } from "../Data/NodeLibrary";
import * as P5 from "p5";
import { createVector } from "./Vector";
import { createColor } from "./Color";

AddNode({
  id: "FillBackground",
  description: "Fill the entire canvas",
  icon: IconBucketDroplet,
  tags: ["Draw"],
  inputPorts: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 0, 0),
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
  icon: IconCircle,
  tags: ["Draw"],
  inputPorts: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 0, 0),
    },
    {
      id: "position",
      type: "vector2",
      defaultValue: createVector(),
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
  description: "Draw a line between two point",
  icon: IconLine,
  tags: ["Draw"],
  inputPorts: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 0, 0),
    },
    {
      id: "start",
      type: "vector2",
      defaultValue: createVector(10, 10),
    },
    {
      id: "end",
      type: "vector2",
      defaultValue: createVector(90, 90),
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

AddNode({
  id: "DrawRect",
  description: "Draw a rectangle starting at the top left corner with a width and height",
  icon: IconLine,
  tags: ["Draw"],
  inputPorts: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 0, 0),
    },
    {
      id: "corner",
      type: "vector2",
      defaultValue: createVector(10, 10),
    },
    {
      id: "width",
      type: "number",
      defaultValue: 10,
    },
    {
      id: "height",
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
    var p1 = context.getInputValue(data, "corner") as P5.Vector;
    var width = context.getInputValue(data, "width") as number;
    var height = context.getInputValue(data, "height") as number;
    context.p5.fill(color);
    context.p5.noStroke();
    context.p5.rect(p1.x, p1.y, width, height);
  },
});

AddNode({
  id: "DrawRect",
  description: "Draw a rectangle starting at the top left corner with a width and height",
  icon: IconRectangle,
  tags: ["Draw"],
  inputPorts: [
    {
      id: "color",
      type: "color",
      defaultValue: "#aaaaaa",
    },
    {
      id: "corner",
      type: "vector2",
      defaultValue: createVector(0, 0),
    },
    {
      id: "width",
      type: "number",
      defaultValue: 10,
    },
    {
      id: "height",
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
    var p1 = context.getInputValue(data, "corner") as P5.Vector;
    var width = context.getInputValue(data, "width") as number;
    var height = context.getInputValue(data, "height") as number;
    context.p5.fill(color);
    context.p5.noStroke();
    context.p5.rect(p1.x, p1.y, width, height);
  },
});
