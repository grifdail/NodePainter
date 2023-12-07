import { IconBucketDroplet, IconCircle, IconLine, IconPolygon, IconRectangle, IconTriangle, IconVectorTriangle } from "@tabler/icons-react";
import { AddNode } from "../Data/NodeLibrary";
import * as P5 from "p5";
import { Vector, createVector } from "./Vector";
import { createColor, toP5Color } from "./Color";
import { createPortConnection } from "../Hooks/useTree";

AddNode({
  id: "FillBackground",
  description: "Fill the entire canvas",
  icon: IconBucketDroplet,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 0, 0),
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    var color = context.getInputValue(data, "color");
    context.p5.background(toP5Color(color, context.p5));
  },
});

AddNode({
  id: "DrawCircle",
  description: "Draw a circle",
  icon: IconCircle,
  tags: ["Draw"],
  dataInputs: [
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
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    var color = context.getInputValue(data, "color");
    var position = context.getInputValue(data, "position") as P5.Vector;
    var radius = context.getInputValue(data, "radius") as number;
    context.p5.noStroke();
    context.p5.fill(toP5Color(color, context.p5));
    context.p5.circle(position.x, position.y, radius);
  },
});
AddNode({
  id: "DrawCircleStroke",
  description: "Draw the contour of a circle.",
  icon: IconCircle,
  tags: ["Draw"],
  dataInputs: [
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
      defaultValue: 20,
    },
    {
      id: "lineWidth",
      type: "number",
      defaultValue: 10,
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    var color = context.getInputValue(data, "color");
    var position = context.getInputValue(data, "position") as P5.Vector;
    var radius = context.getInputValue(data, "radius") as number;
    var lineWidth = context.getInputValue(data, "lineWidth") as number;
    context.p5.stroke(toP5Color(color, context.p5));
    context.p5.noFill();
    context.p5.strokeWeight(lineWidth);
    context.p5.circle(position.x, position.y, radius);
  },
});

AddNode({
  id: "DrawArc",
  description: "Draw the contour of a circle.",
  icon: IconCircle,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1),
    },
    {
      id: "center",
      type: "vector2",
      defaultValue: createVector(),
    },
    {
      id: "innerRadius",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "outerRadius",
      type: "number",
      defaultValue: 50,
    },
    {
      id: "startAngle",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "angle",
      type: "number",
      defaultValue: 1,
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    const color = context.getInputValue(data, "color");
    const center = context.getInputValue(data, "center") as P5.Vector;
    const innerRadius = context.getInputValue(data, "innerRadius") as number;
    const outerRadius = context.getInputValue(data, "outerRadius") as number;
    const startAngle = context.getInputValue(data, "startAngle") as number;
    const angle = context.getInputValue(data, "angle") as number;
    context.p5.noStroke();
    context.p5.fill(toP5Color(color, context.p5));
    context.p5.beginShape();
    const count = Math.ceil((angle * 180) / Math.PI);
    for (let i = 0; i <= count; i++) {
      const alpha = (i / count) * angle + startAngle;

      context.p5.vertex(center.x + Math.cos(alpha) * outerRadius, center.y + Math.sin(alpha) * outerRadius);
    }
    for (let i = 0; i <= count; i++) {
      const alpha = (1 - i / count) * angle + startAngle;
      context.p5.vertex(center.x + Math.cos(alpha) * innerRadius, center.y + Math.sin(alpha) * innerRadius);
    }
    context.p5.endShape();
  },
});

AddNode({
  id: "DrawRegularPoligon",
  description: "Draw a regular poligon.",
  icon: IconTriangle,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1),
    },
    {
      id: "center",
      type: "vector2",
      defaultValue: createVector(),
    },
    {
      id: "radius",
      type: "number",
      defaultValue: 100,
    },
    {
      id: "side",
      type: "number",
      defaultValue: 3,
    },
    {
      id: "offset",
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    const color = context.getInputValue(data, "color");
    const center = context.getInputValue(data, "center") as P5.Vector;
    const radius = context.getInputValue(data, "radius") as number;
    const side = context.getInputValue(data, "side") as number;
    const offset = context.getInputValue(data, "offset") as number;
    context.p5.noStroke();
    context.p5.fill(toP5Color(color, context.p5));
    context.p5.beginShape();
    for (let i = 0; i < side; i++) {
      const alpha = (i / side + offset) * Math.PI * 2;

      context.p5.vertex(center.x + Math.cos(alpha) * radius, center.y + Math.sin(alpha) * radius);
    }

    context.p5.endShape();
  },
});

AddNode({
  id: "DrawLine",
  description: "Draw a line between two point",
  icon: IconLine,
  tags: ["Draw"],
  dataInputs: [
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
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    var color = context.getInputValue(data, "color");
    var p1 = context.getInputValue(data, "start") as P5.Vector;
    var p2 = context.getInputValue(data, "end") as P5.Vector;
    var lineWidth = context.getInputValue(data, "lineWidth") as number;
    context.p5.stroke(toP5Color(color, context.p5));
    context.p5.strokeWeight(lineWidth);
    context.p5.line(p1.x, p1.y, p2.x, p2.y);
  },
});

AddNode({
  id: "DrawRect",
  description: "Draw a rectangle starting at the top left corner with a width and height",
  icon: IconRectangle,
  tags: ["Draw"],
  dataInputs: [
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
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    var color = context.getInputValue(data, "color");
    var p1 = context.getInputValue(data, "corner") as P5.Vector;
    var width = context.getInputValue(data, "width") as number;
    var height = context.getInputValue(data, "height") as number;
    context.p5.fill(toP5Color(color, context.p5));
    context.p5.noStroke();
    context.p5.rect(p1.x, p1.y, width, height);
  },
});

AddNode({
  id: "DrawTriangle",
  description: "Draw a triangle defined by 3 points",
  icon: IconVectorTriangle,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: "#aaaaaa",
    },
    {
      id: "corner1",
      type: "vector2",
      defaultValue: createVector(25, 0),
    },
    {
      id: "corner2",
      type: "vector2",
      defaultValue: createVector(0, 0),
    },
    {
      id: "corner3",
      type: "vector2",
      defaultValue: createVector(0, 25),
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    var color = context.getInputValue(data, "color");
    var p1 = context.getInputValue(data, "corner1") as P5.Vector;
    var p2 = context.getInputValue(data, "corner2") as P5.Vector;
    var p3 = context.getInputValue(data, "corner3") as P5.Vector;
    context.p5.fill(toP5Color(color, context.p5));
    context.p5.noStroke();
    context.p5.triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  },
});

AddNode({
  id: "DrawQuad",
  description: "Draw a quad defined by 4 points",
  icon: IconPolygon,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: "#aaaaaa",
    },
    {
      id: "corner1",
      type: "vector2",
      defaultValue: createVector(25, 0),
    },
    {
      id: "corner2",
      type: "vector2",
      defaultValue: createVector(0, 0),
    },
    {
      id: "corner3",
      type: "vector2",
      defaultValue: createVector(0, 25),
    },
    {
      id: "corner4",
      type: "vector2",
      defaultValue: createVector(25, 25),
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    var color = context.getInputValue(data, "color");
    var p1 = context.getInputValue(data, "corner1") as P5.Vector;
    var p2 = context.getInputValue(data, "corner2") as P5.Vector;
    var p3 = context.getInputValue(data, "corner3") as P5.Vector;
    var p4 = context.getInputValue(data, "corner4") as P5.Vector;
    context.p5.fill(toP5Color(color, context.p5));
    context.p5.noStroke();
    context.p5.quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  },
});

AddNode({
  id: "DrawPoligon",
  description: "Draw a poligon with up to 20 points",
  icon: IconPolygon,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: "#aaaaaa",
    },
    {
      id: "corner-1",
      type: "vector2",
      defaultValue: createVector(25, 0),
    },
    {
      id: "corner-2",
      type: "vector2",
      defaultValue: createVector(0, 0),
    },
    {
      id: "corner-3",
      type: "vector2",
      defaultValue: createVector(0, 25),
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    const color = context.getInputValue(data, "color");
    context.p5.fill(toP5Color(color, context.p5));
    context.p5.noStroke();
    context.p5.beginShape();
    for (let i = 1; i < 20; i++) {
      const key = `corner-${i}`;
      if (data.dataInputs[key]) {
        const p = context.getInputValue(data, key) as Vector;
        context.p5.vertex(p.x, p.y);
      }
    }
    context.p5.endShape();
  },
  contextMenu: {
    "Add corner": (node) => {
      const count = Object.keys(node.dataInputs).length;
      const key = `corner-${count}`;
      node.dataInputs[key] = createPortConnection({
        id: key,
        type: "vector2",
        defaultValue: createVector(),
      });
    },
    "Remove corner": (node) => {
      const count = Object.keys(node.dataInputs).length - 1;
      const key = `corner-${count}`;
      delete node.dataInputs[key];
    },
  },
});
