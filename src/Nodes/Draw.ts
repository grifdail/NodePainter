import { IconBucketDroplet, IconCircle, IconCursorText, IconLine, IconPolygon, IconRectangle, IconTriangle, IconVectorBezier2, IconVectorTriangle } from "@tabler/icons-react";
import * as P5 from "p5";
import { Vector, createVector } from "./Vector";
import { Gradient, createColor, createDefaultGradient, toHex, toP5Color } from "./Color";
import { createPortConnection } from "../Data/createPortConnection";
import { NodeDefinition } from "../Data/NodeDefinition";

export const DrawNodes: Array<NodeDefinition> = [
  {
    id: "FillBackground",
    description: "Fill the entire canvas",
    icon: IconBucketDroplet,
    tags: ["Draw"],
    dataInputs: [
      {
        id: "color",
        type: "color",
        defaultValue: createColor(1, 1, 1),
      },
    ],
    dataOutputs: [],
    executeOutputs: [],
    settings: [],
    canBeExecuted: true,
    getData: (portId, nodeData, getNodeOutput) => {},
    execute: (data, context) => {
      var color = context.getInputValue(data, "color");
      context.target.background(toP5Color(color, context.p5));
    },
  },
  {
    id: "Clear",
    description: "Clear the entire canvas",
    icon: IconBucketDroplet,
    tags: ["Draw"],
    dataInputs: [],
    dataOutputs: [],
    executeOutputs: [],
    settings: [],
    canBeExecuted: true,
    getData: (portId, nodeData, getNodeOutput) => {},
    execute: (data, context) => {
      context.target.clear(0, 0, 0, 0);
    },
  },
  {
    id: "DrawCircle",
    description: "Draw a circle",
    icon: IconCircle,
    tags: ["Draw"],
    dataInputs: [
      {
        id: "color",
        type: "color",
        defaultValue: createColor(1, 1, 1),
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
      context.target.noStroke();
      context.target.fill(toP5Color(color, context.p5));
      context.target.circle(position.x, position.y, radius);
    },
  },
  {
    id: "DrawCircleStroke",
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
      context.target.stroke(toP5Color(color, context.p5));
      context.target.noFill();
      context.target.strokeWeight(lineWidth);
      context.target.circle(position.x, position.y, radius);
    },
  },
  {
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
      context.target.noStroke();
      context.target.fill(toP5Color(color, context.p5));
      context.target.beginShape();
      const count = Math.ceil((angle * 180) / Math.PI);
      for (let i = 0; i <= count; i++) {
        const alpha = (i / count) * angle + startAngle;

        context.target.vertex(center.x + Math.cos(alpha) * outerRadius, center.y + Math.sin(alpha) * outerRadius);
      }
      for (let i = 0; i <= count; i++) {
        const alpha = (1 - i / count) * angle + startAngle;
        context.target.vertex(center.x + Math.cos(alpha) * innerRadius, center.y + Math.sin(alpha) * innerRadius);
      }
      context.target.endShape();
    },
  },
  {
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
      context.target.noStroke();
      context.target.fill(toP5Color(color, context.p5));
      context.target.beginShape();
      for (let i = 0; i < side; i++) {
        const alpha = (i / side + offset) * Math.PI * 2;

        context.target.vertex(center.x + Math.cos(alpha) * radius, center.y + Math.sin(alpha) * radius);
      }

      context.target.endShape();
    },
  },
  {
    id: "DrawLine",
    description: "Draw a line between two point",
    icon: IconLine,
    tags: ["Draw"],
    dataInputs: [
      {
        id: "color",
        type: "color",
        defaultValue: createColor(1, 1, 1),
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
      context.target.stroke(toP5Color(color, context.p5));
      context.target.strokeWeight(lineWidth);
      context.target.line(p1.x, p1.y, p2.x, p2.y);
    },
  },
  {
    id: "DrawRect",
    description: "Draw a rectangle starting at the top left corner with a width and height",
    icon: IconRectangle,
    tags: ["Draw"],
    dataInputs: [
      {
        id: "color",
        type: "color",
        defaultValue: createColor(1, 1, 1),
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
      context.target.fill(toP5Color(color, context.p5));
      context.target.noStroke();
      context.target.rect(p1.x, p1.y, width, height);
    },
  },
  {
    id: "DrawGradientRect",
    description: "Draw a rectangle with a gradient",
    icon: IconRectangle,
    tags: ["Draw"],
    dataInputs: [
      {
        id: "gradient",
        type: "gradient",
        defaultValue: createDefaultGradient(),
      },
      {
        id: "direction",
        type: "number",
        defaultValue: 0,
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
      var gradient = context.getInputValue(data, "gradient") as Gradient;
      var gradientDirection = context.getInputValue(data, "direction");
      var p1 = context.getInputValue(data, "corner") as P5.Vector;
      var width = context.getInputValue(data, "width") as number;
      var height = context.getInputValue(data, "height") as number;
      context.target.noFill();
      context.target.noStroke();
      const ctx = context.target.drawingContext as CanvasRenderingContext2D;
      var c = Math.cos(gradientDirection);
      var s = Math.sin(gradientDirection);
      var px = p1.x + width * 0.5;
      var py = p1.y + height * 0.5;
      var ctxGrad = ctx.createLinearGradient(px - c * width * 0.5, py - s * height * 0.5, px + c * width * 0.5, py + s * height * 0.5);
      gradient.forEach((stop) => {
        ctxGrad.addColorStop(stop.pos, toHex(stop.color));
      });
      ctx.fillStyle = ctxGrad;
      ctx.fillRect(p1.x, p1.y, width, height);
    },
  },
  {
    id: "DrawTriangle",
    description: "Draw a triangle defined by 3 points",
    icon: IconVectorTriangle,
    tags: ["Draw"],
    dataInputs: [
      {
        id: "color",
        type: "color",
        defaultValue: createColor(),
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
      context.target.fill(toP5Color(color, context.p5));
      context.target.noStroke();
      context.target.triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    },
  },
  {
    id: "DrawQuad",
    description: "Draw a quad defined by 4 points",
    icon: IconPolygon,
    tags: ["Draw"],
    dataInputs: [
      {
        id: "color",
        type: "color",
        defaultValue: createColor(),
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
      context.target.fill(toP5Color(color, context.p5));
      context.target.noStroke();
      context.target.quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
    },
  },
  {
    id: "DrawPoligon",
    description: "Draw a poligon with up to 20 points",
    icon: IconPolygon,
    tags: ["Draw"],
    dataInputs: [
      {
        id: "color",
        type: "color",
        defaultValue: createColor(),
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
      context.target.fill(toP5Color(color, context.p5));
      context.target.noStroke();
      context.target.beginShape();
      for (let i = 1; i < 20; i++) {
        const key = `corner-${i}`;
        if (data.dataInputs[key]) {
          const p = context.getInputValue(data, key) as Vector;
          context.target.vertex(p.x, p.y);
        }
      }
      context.target.endShape();
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
  },
  {
    id: "DrawText",
    description: "Draw a line of text",
    icon: IconCursorText,
    tags: ["Draw"],
    dataInputs: [
      {
        id: "color",
        type: "color",
        defaultValue: createColor(),
      },
      {
        id: "text",
        type: "string",
        defaultValue: "Hello !",
      },
      {
        id: "position",
        type: "vector2",
        defaultValue: createVector(200, 200),
      },
      {
        id: "size",
        type: "number",
        defaultValue: 25,
      },
    ],
    dataOutputs: [],
    executeOutputs: [],
    settings: [
      { id: "HorizontalAlign", type: "dropdown", defaultValue: "LEFT", options: ["LEFT", "RIGHT", "CENTER"] },
      { id: "VerticalAlign", type: "dropdown", defaultValue: "BASELINE", options: ["TOP", "CENTER", "BASELINE", "BOTTOM"] },
      { id: "Font", type: "dropdown", defaultValue: "Josefin Sans", options: ["Agbalumo", "Amatic SC", "Concert One", "Josefin Sans", "Lobster", "Merriweather", "Monomaniac One", "Oleo Script", "Open Sans", "Orbitron", "Permanent Marker", "Pixelify Sans", "Titan One"] },
    ],
    canBeExecuted: true,
    getData: (portId, nodeData, getNodeOutput) => {},
    execute: (data, context) => {
      var color = context.getInputValue(data, "color");
      var text = context.getInputValue(data, "text") as string;
      var pos = context.getInputValue(data, "position") as Vector;
      var size = context.getInputValue(data, "size") as number;
      context.target.fill(toP5Color(color, context.p5));
      context.target.noStroke();
      context.target.textFont(data.settings.Font);
      context.target.textAlign((context.p5 as any)[data.settings.HorizontalAlign], (context.p5 as any)[data.settings.VerticalAlign]);
      context.target.textSize(size);
      context.target.text(text, pos.x, pos.y);
    },
  },
  {
    id: "DrawBezier",
    description: "Draw a bezier curve, from start to end, with control point cp1 and cp2",
    icon: IconVectorBezier2,
    tags: ["Draw"],
    dataInputs: [
      {
        id: "color",
        type: "color",
        defaultValue: "#aaaaaa",
      },
      {
        id: "lineWidth",
        type: "number",
        defaultValue: 10,
      },
      {
        id: "start",
        type: "vector2",
        defaultValue: createVector(100, 200),
      },
      {
        id: "cp1",
        type: "vector2",
        defaultValue: createVector(200, 100),
      },
      {
        id: "cp2",
        type: "vector2",
        defaultValue: createVector(200, 300),
      },
      {
        id: "end",
        type: "vector2",
        defaultValue: createVector(300, 200),
      },
    ],
    dataOutputs: [],
    executeOutputs: [],
    settings: [],
    canBeExecuted: true,
    getData: (portId, nodeData, getNodeOutput) => {},
    execute: (data, context) => {
      var color = context.getInputValue(data, "color");
      var size = context.getInputValue(data, "lineWidth") as number;
      var start = context.getInputValue(data, "start") as Vector;
      var p1 = context.getInputValue(data, "cp1") as Vector;
      var p2 = context.getInputValue(data, "cp2") as Vector;
      var end = context.getInputValue(data, "end") as Vector;
      context.target.noFill();
      context.target.stroke(toP5Color(color, context.p5));
      context.target.strokeWeight(size);
      context.target.bezier(start.x, start.y, p1.x, p1.y, p2.x, p2.y, end.x, end.y);
    },
  },
];
