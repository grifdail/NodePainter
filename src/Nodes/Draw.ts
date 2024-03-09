import { IconBucketDroplet, IconCircle, IconCursorText, IconLine, IconPolygon, IconRectangle, IconTriangle, IconVectorBezier2, IconVectorTriangle } from "@tabler/icons-react";
import { createVector2 } from "./Vector";
import { createColor, createDefaultGradient, toHex, toP5Color } from "./Color";
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
    execute: (data, context) => {
      var color = context.getInputValueColor(data, "color");
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
        defaultValue: createVector2(),
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
    execute: (data, context) => {
      var color = context.getInputValueColor(data, "color");
      var position = context.getInputValueVector(data, "position");
      var radius = context.getInputValueNumber(data, "radius");
      context.target.noStroke();
      context.target.fill(toP5Color(color, context.p5));
      context.target.circle(position[0], position[1], radius);
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
        defaultValue: createVector2(),
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
    execute: (data, context) => {
      var color = context.getInputValueColor(data, "color");
      var position = context.getInputValueVector(data, "position");
      var radius = context.getInputValueNumber(data, "radius");
      var lineWidth = context.getInputValueNumber(data, "lineWidth");
      context.target.stroke(toP5Color(color, context.p5));
      context.target.noFill();
      context.target.strokeWeight(lineWidth);
      context.target.circle(position[0], position[1], radius);
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
        defaultValue: createVector2(),
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
    execute: (data, context) => {
      const color = context.getInputValueColor(data, "color");
      const center = context.getInputValueVector(data, "center");
      const innerRadius = context.getInputValueNumber(data, "innerRadius");
      const outerRadius = context.getInputValueNumber(data, "outerRadius");
      const startAngle = context.getInputValueNumber(data, "startAngle");
      const angle = context.getInputValueNumber(data, "angle");
      context.target.noStroke();
      context.target.fill(toP5Color(color, context.p5));
      context.target.beginShape();
      const count = Math.ceil((angle * 180) / Math.PI);
      for (let i = 0; i <= count; i++) {
        const alpha = (i / count) * angle + startAngle;

        context.target.vertex(center[0] + Math.cos(alpha) * outerRadius, center[1] + Math.sin(alpha) * outerRadius);
      }
      for (let i = 0; i <= count; i++) {
        const alpha = (1 - i / count) * angle + startAngle;
        context.target.vertex(center[0] + Math.cos(alpha) * innerRadius, center[1] + Math.sin(alpha) * innerRadius);
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
        defaultValue: createVector2(),
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
    execute: (data, context) => {
      const color = context.getInputValueColor(data, "color");
      const center = context.getInputValueVector(data, "center");
      const radius = context.getInputValueNumber(data, "radius");
      const side = context.getInputValueNumber(data, "side");
      const offset = context.getInputValueNumber(data, "offset");
      context.target.noStroke();
      context.target.fill(toP5Color(color, context.p5));
      context.target.beginShape();
      for (let i = 0; i < side; i++) {
        const alpha = (i / side + offset) * Math.PI * 2;

        context.target.vertex(center[0] + Math.cos(alpha) * radius, center[1] + Math.sin(alpha) * radius);
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
        defaultValue: createVector2(10, 10),
      },
      {
        id: "end",
        type: "vector2",
        defaultValue: createVector2(90, 90),
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
    execute: (data, context) => {
      var color = context.getInputValueColor(data, "color");
      var p1 = context.getInputValueVector(data, "start");
      var p2 = context.getInputValueVector(data, "end");
      var lineWidth = context.getInputValueNumber(data, "lineWidth");
      context.target.stroke(toP5Color(color, context.p5));
      context.target.strokeWeight(lineWidth);
      context.target.line(p1[0], p1[1], p2[0], p2[1]);
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
        defaultValue: createVector2(10, 10),
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
    execute: (data, context) => {
      var color = context.getInputValueColor(data, "color");
      var p1 = context.getInputValueVector(data, "corner");
      var width = context.getInputValueNumber(data, "width");
      var height = context.getInputValueNumber(data, "height");
      context.target.fill(toP5Color(color, context.p5));
      context.target.noStroke();
      context.target.rect(p1[0], p1[1], width, height);
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
        defaultValue: createVector2(10, 10),
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
    execute: (data, context) => {
      var gradient = context.getInputValueGradient(data, "gradient");
      var gradientDirection = context.getInputValueNumber(data, "direction");
      var p1 = context.getInputValueVector(data, "corner");
      var width = context.getInputValueNumber(data, "width");
      var height = context.getInputValueNumber(data, "height");
      context.target.noFill();
      context.target.noStroke();
      const ctx = context.target.drawingContext as CanvasRenderingContext2D;
      var c = Math.cos(gradientDirection);
      var s = Math.sin(gradientDirection);
      var px = p1[0] + width * 0.5;
      var py = p1[1] + height * 0.5;
      var ctxGrad = ctx.createLinearGradient(px - c * width * 0.5, py - s * height * 0.5, px + c * width * 0.5, py + s * height * 0.5);
      gradient.forEach((stop) => {
        ctxGrad.addColorStop(stop.pos, toHex(stop.color));
      });
      ctx.fillStyle = ctxGrad;
      ctx.fillRect(p1[0], p1[1], width, height);
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
        defaultValue: createVector2(25, 0),
      },
      {
        id: "corner2",
        type: "vector2",
        defaultValue: createVector2(0, 0),
      },
      {
        id: "corner3",
        type: "vector2",
        defaultValue: createVector2(0, 25),
      },
    ],
    dataOutputs: [],
    executeOutputs: [],
    settings: [],
    canBeExecuted: true,
    execute: (data, context) => {
      var color = context.getInputValueColor(data, "color");
      var p1 = context.getInputValueVector(data, "corner1");
      var p2 = context.getInputValueVector(data, "corner2");
      var p3 = context.getInputValueVector(data, "corner3");
      context.target.fill(toP5Color(color, context.p5));
      context.target.noStroke();
      context.target.triangle(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
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
        defaultValue: createVector2(25, 0),
      },
      {
        id: "corner2",
        type: "vector2",
        defaultValue: createVector2(0, 0),
      },
      {
        id: "corner3",
        type: "vector2",
        defaultValue: createVector2(0, 25),
      },
      {
        id: "corner4",
        type: "vector2",
        defaultValue: createVector2(25, 25),
      },
    ],
    dataOutputs: [],
    executeOutputs: [],
    settings: [],
    canBeExecuted: true,
    execute: (data, context) => {
      var color = context.getInputValueColor(data, "color");
      var p1 = context.getInputValueVector(data, "corner1");
      var p2 = context.getInputValueVector(data, "corner2");
      var p3 = context.getInputValueVector(data, "corner3");
      var p4 = context.getInputValueVector(data, "corner4");
      context.target.fill(toP5Color(color, context.p5));
      context.target.noStroke();
      context.target.quad(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);
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
        defaultValue: createVector2(25, 0),
      },
      {
        id: "corner-2",
        type: "vector2",
        defaultValue: createVector2(0, 0),
      },
      {
        id: "corner-3",
        type: "vector2",
        defaultValue: createVector2(0, 25),
      },
    ],
    dataOutputs: [],
    executeOutputs: [],
    settings: [],
    canBeExecuted: true,
    execute: (data, context) => {
      const color = context.getInputValueColor(data, "color");
      context.target.fill(toP5Color(color, context.p5));
      context.target.noStroke();
      context.target.beginShape();
      for (let i = 1; i < 20; i++) {
        const key = `corner-${i}`;
        if (data.dataInputs[key]) {
          const p = context.getInputValueVector(data, key);
          context.target.vertex(p[0], p[1]);
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
          defaultValue: createVector2(),
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
    tags: ["Draw", "Text"],
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
        defaultValue: createVector2(200, 200),
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
    execute: (data, context) => {
      var color = context.getInputValueColor(data, "color");
      var text = context.getInputValueString(data, "text");
      var pos = context.getInputValueVector(data, "position");
      var size = context.getInputValueNumber(data, "size");
      context.target.fill(toP5Color(color, context.p5));
      context.target.noStroke();
      context.target.textFont(data.settings.Font);
      context.target.textAlign((context.p5 as any)[data.settings.HorizontalAlign], (context.p5 as any)[data.settings.VerticalAlign]);
      context.target.textSize(size);
      context.target.text(text, pos[0], pos[1]);
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
        defaultValue: createVector2(100, 200),
      },
      {
        id: "cp1",
        type: "vector2",
        defaultValue: createVector2(200, 100),
      },
      {
        id: "cp2",
        type: "vector2",
        defaultValue: createVector2(200, 300),
      },
      {
        id: "end",
        type: "vector2",
        defaultValue: createVector2(300, 200),
      },
    ],
    dataOutputs: [],
    executeOutputs: [],
    settings: [],
    canBeExecuted: true,
    execute: (data, context) => {
      var color = context.getInputValueColor(data, "color");
      var size = context.getInputValueNumber(data, "lineWidth");
      var start = context.getInputValueVector(data, "start");
      var p1 = context.getInputValueVector(data, "cp1");
      var p2 = context.getInputValueVector(data, "cp2");
      var end = context.getInputValueVector(data, "end");
      context.target.noFill();
      context.target.stroke(toP5Color(color, context.p5));
      context.target.strokeWeight(size);
      context.target.bezier(start[0], start[1], p1[0], p1[1], p2[0], p2[1], end[0], end[1]);
    },
  },
];
