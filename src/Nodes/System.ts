import { IconArrowsMove, IconAssembly, IconRotate } from "@tabler/icons-react";
import { AddNode } from "../Data/NodeLibrary";
import p5 from "p5";
import { createVector } from "./Vector";

AddNode({
  id: "Start",
  description: "The start of the program",
  icon: IconAssembly,
  tags: ["Control"],
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
  tags: ["Control"],
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
  id: "For",
  description: "Execute an instruction multiple time",
  icon: IconAssembly,
  tags: ["Control"],
  inputPorts: [{ id: "count", type: "number", defaultValue: 10 }],
  outputPorts: [{ id: "index", type: "number", defaultValue: 10 }],
  executeOutputPorts: ["loop"],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.blackboard[`${nodeData.id}-index`] || 0;
  },
  execute: (data, context) => {
    var count = context.getInputValue(data, "count") as number;
    for (var i = 0; i < count; i++) {
      context.blackboard[`${data.id}-index`] = i;
      if (data.output.loop) {
        context.execute(data.output.loop);
      }
    }
  },
});

AddNode({
  id: "ForGrid",
  description: "Execute an instruction multiple time for elements of a grid",
  icon: IconAssembly,
  tags: ["Control"],
  inputPorts: [
    { id: "width", type: "number", defaultValue: 10 },
    { id: "height", type: "number", defaultValue: 10 },
  ],
  outputPorts: [
    { id: "x", type: "number", defaultValue: 10 },
    { id: "y", type: "number", defaultValue: 10 },
  ],
  executeOutputPorts: ["loop"],
  settings: [],
  getData: (portId, nodeData, context) => {
    if (portId === "x") {
      return context.blackboard[`${nodeData.id}-x`] || 0;
    } else return context.blackboard[`${nodeData.id}-y`] || 0;
  },
  execute: (data, context) => {
    var width = context.getInputValue(data, "width") as number;
    var height = context.getInputValue(data, "height") as number;
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        context.blackboard[`${data.id}-x`] = x;
        context.blackboard[`${data.id}-y`] = y;
        if (data.output.loop) {
          context.execute(data.output.loop);
        }
      }
    }
  },
});

AddNode({
  id: "With rotation",
  description: "Execute the next instruction as if the canvas was rotated",
  icon: IconRotate,
  tags: ["Transform"],
  inputPorts: [{ id: "angle", type: "number", defaultValue: 0 }],
  outputPorts: [],
  executeOutputPorts: ["execute"],
  settings: [],
  getData: (portId, nodeData, context) => {},
  execute: (data, context) => {
    var angle = context.getInputValue(data, "angle") as number;
    context.p5.push();
    context.p5.rotate(angle);
    if (data.output.execute) {
      context.execute(data.output.execute);
    }
    context.p5.pop();
  },
});

AddNode({
  id: "With translation",
  description: "Execute the next instruction as if the canvas was moved",
  icon: IconArrowsMove,
  tags: ["Transform"],
  inputPorts: [{ id: "translation", type: "vector2", defaultValue: createVector() }],
  outputPorts: [],
  executeOutputPorts: ["execute"],
  settings: [],
  getData: (portId, nodeData, context) => {},
  execute: (data, context) => {
    var translation = context.getInputValue(data, "translation") as p5.Vector;
    context.p5.push();
    context.p5.translate(translation.x, translation.y);
    if (data.output.execute) {
      context.execute(data.output.execute);
    }
    context.p5.pop();
  },
});

AddNode({
  id: "With scale",
  description: "Execute the next instruction as if the canvas was scaled",
  icon: IconArrowsMove,
  tags: ["Transform"],
  inputPorts: [{ id: "scale", type: "vector2", defaultValue: createVector() }],
  outputPorts: [],
  executeOutputPorts: ["execute"],
  settings: [],
  getData: (portId, nodeData, context) => {},
  execute: (data, context) => {
    var scale = context.getInputValue(data, "scale") as p5.Vector;
    context.p5.push();
    context.p5.scale(scale.x, scale.y);
    if (data.output.execute) {
      context.execute(data.output.execute);
    }
    context.p5.pop();
  },
});
AddNode({
  id: "CustomFunction",
  description: "",
  IsUnique: true,
  icon: IconArrowsMove,
  tags: [],
  inputPorts: [],
  outputPorts: [],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    const source = context.findNodeOfType(`${nodeData.type}-end`);
    if (!source) {
      return null;
    }
    context.functionStack.push(context.createFunctionContext(nodeData, context));

    var result = context.getNodeOutput(source, portId);
    context.functionStack.pop();
    return result;
  },
  execute: (data, context) => {
    const source = context.findNodeOfType(`${data.type}-start`);
    if (!source) {
      return null;
    }
    context.functionStack.push(context.createFunctionContext(data, context));
    context.execute(source);
    context.functionStack.pop();
  },
});

AddNode({
  id: "CustomFunction-start",
  description: "",
  IsUnique: true,
  icon: IconArrowsMove,
  tags: [],
  inputPorts: [],
  outputPorts: [],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var contextFn = context.functionStack[context.functionStack.length - 1];
    return contextFn[portId];
  },
  execute: (data, context) => {
    if (data.output.execute) {
      context.execute(data.output.execute);
    }
  },
});

AddNode({
  id: "CustomFunction-end",
  description: "",
  IsUnique: true,
  icon: IconArrowsMove,
  tags: [],
  inputPorts: [],
  outputPorts: [],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.getInputValue(nodeData, portId);
  },
  execute: (data, context) => {
    //TODO
  },
});
