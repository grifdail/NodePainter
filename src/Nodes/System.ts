import { IconArrowsMove, IconAssembly, IconColorFilter, IconRotate } from "@tabler/icons-react";
import p5, { BLEND_MODE } from "p5";
import { createVector } from "./Vector";
import { NodeDefinition, PortTypeArray, PortTypeDefaultValue } from "../Data/NodeDefinition";
import { NodeData } from "../Hooks/useTree";
import { createPortConnection } from "../Data/createPortConnection";

export const START_NODE = "Start";
export const CUSTOM_FUNCTION = "CustomFunction";

export const contextMenyCreateAllNode = Object.fromEntries(
  PortTypeArray.map((type) => [
    `Add a ${type} port`,
    (node: NodeData) => {
      var count = Object.entries(node.dataInputs).length;
      node.dataInputs[`type-${count}-in`] = createPortConnection({
        id: `type-${count}-in`,
        type: type,
        defaultValue: PortTypeDefaultValue[type],
      });
      node.dataOutputs[`type-${count}`] = {
        id: `type-${count}`,
        type: type,
        defaultValue: PortTypeDefaultValue[type],
      };
    },
  ])
);

export const SystemNodes: Array<NodeDefinition> = [
  {
    id: START_NODE,
    description: "The start of the program",
    icon: IconAssembly,
    tags: ["Control"],
    dataInputs: [],
    hideInLibrary: true,
    dataOutputs: [],
    executeOutputs: ["execute"],
    settings: [
      { id: "width", type: "number", defaultValue: 400 },
      { id: "height", type: "number", defaultValue: 400 },
    ],
    canBeExecuted: true,
    getData: (portId, nodeData, context) => {},
    execute: (data, context) => {
      if (data.execOutputs.execute) {
        context.execute(data.execOutputs.execute);
      }
    },
    IsUnique: true,
  },
  {
    id: "Then",
    description: "Execute multiple instruction",
    icon: IconAssembly,
    tags: ["Control"],
    dataInputs: [],
    dataOutputs: [],
    executeOutputs: ["0"],
    settings: [],
    canBeExecuted: true,
    getData: (portId, nodeData, getNodeOutput) => {},
    execute: (data, context) => {
      var count = Object.entries(data.execOutputs).length;
      for (var i = 0; i <= count; i++) {
        if (data.execOutputs[i]) {
          context.execute(data.execOutputs[i.toString()] as string);
        }
      }
    },
    contextMenu: {
      "Add port": (node) => {
        var count = Object.entries(node.execOutputs).length;
        node.execOutputs[count] = null;
      },
      "Remove last port": (node) => {
        var count = Object.entries(node.execOutputs).length;
        delete node.execOutputs[count - 1];
      },
    },
  },
  {
    id: "For",
    description: "Execute an instruction multiple time",
    icon: IconAssembly,
    tags: ["Control"],
    dataInputs: [{ id: "count", type: "number", defaultValue: 10 }],
    dataOutputs: [{ id: "index", type: "number", defaultValue: 10 }],
    executeOutputs: ["loop"],
    settings: [],
    canBeExecuted: true,
    getData: (portId, nodeData, context) => {
      return context.blackboard[`${nodeData.id}-index`] || 0;
    },
    execute: (data, context) => {
      var count = context.getInputValue(data, "count") as number;
      for (var i = 0; i < count; i++) {
        context.blackboard[`${data.id}-index`] = i;
        if (data.execOutputs.loop) {
          context.execute(data.execOutputs.loop);
        }
      }
    },
  },
  {
    id: "ForGrid",
    description: "Execute an instruction multiple time for elements of a grid",
    icon: IconAssembly,
    tags: ["Control"],
    dataInputs: [
      { id: "width", type: "number", defaultValue: 10 },
      { id: "height", type: "number", defaultValue: 10 },
    ],
    dataOutputs: [
      { id: "x", type: "number", defaultValue: 10 },
      { id: "y", type: "number", defaultValue: 10 },
    ],
    executeOutputs: ["loop"],
    settings: [],
    canBeExecuted: true,
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
          if (data.execOutputs.loop) {
            context.execute(data.execOutputs.loop);
          }
        }
      }
    },
  },
  {
    id: "ExecuteInOrder",
    description: "Execute the instruction in the order of their input",
    icon: IconAssembly,
    tags: ["Control"],
    dataInputs: [
      { id: "a", type: "number", defaultValue: 10 },
      { id: "b", type: "number", defaultValue: 10 },
    ],
    dataOutputs: [],
    executeOutputs: ["A", "B"],
    settings: [],
    getData: (portId, nodeData, context) => {},
    canBeExecuted: true,
    execute: (data, context) => {
      var a = context.getInputValue(data, "a") as number;
      var b = context.getInputValue(data, "b") as number;
      if (a >= b) {
        if (data.execOutputs.A) {
          context.execute(data.execOutputs.A);
        }
        if (data.execOutputs.B) {
          context.execute(data.execOutputs.B);
        }
      } else {
        if (data.execOutputs.B) {
          context.execute(data.execOutputs.B);
        }
        if (data.execOutputs.A) {
          context.execute(data.execOutputs.A);
        }
      }
    },
  },
  {
    id: "Precompute",
    description: "Precompute the input before executing the rest of the instruction. The random wont change and may help performance",
    icon: IconAssembly,
    tags: ["Control"],
    dataInputs: [],
    dataOutputs: [],
    executeOutputs: ["execute"],
    settings: [],
    canBeExecuted: true,
    getData: (portId, data, context) => {
      const target = context.blackboard[`${data.id}-context`];
      return target[`${portId}-in`];
    },
    execute: (data, context) => {
      const target = Object.fromEntries(Object.entries(data.dataInputs).map(([key, value]) => [key, context.getInputValue(data, key)]));
      context.blackboard[`${data.id}-context`] = target;
      context.execute(data.execOutputs["execute"] as string);
    },
    contextMenu: {
      ...contextMenyCreateAllNode,
      "Remove last port": (node) => {
        var entries = Object.entries(node.dataOutputs);
        if (entries.length > 0) {
          var [key] = entries[entries.length - 1];
          delete node.dataOutputs[key];
          delete node.dataInputs[`${key}-in`];
        }
      },
    },
  },
  {
    id: "With rotation",
    description: "Execute the next instruction as if the canvas was rotated",
    icon: IconRotate,
    tags: ["Transform"],
    dataInputs: [{ id: "angle", type: "number", defaultValue: 0 }],
    dataOutputs: [],
    executeOutputs: ["execute"],
    settings: [],
    canBeExecuted: true,
    getData: (portId, nodeData, context) => {},
    execute: (data, context) => {
      var angle = context.getInputValue(data, "angle") as number;
      context.p5.push();
      context.p5.rotate(angle);
      if (data.execOutputs.execute) {
        context.execute(data.execOutputs.execute);
      }
      context.p5.pop();
    },
  },
  {
    id: "With translation",
    description: "Execute the next instruction as if the canvas was moved",
    icon: IconArrowsMove,
    tags: ["Transform"],
    dataInputs: [{ id: "translation", type: "vector2", defaultValue: createVector() }],
    dataOutputs: [],
    executeOutputs: ["execute"],
    settings: [],
    canBeExecuted: true,
    getData: (portId, nodeData, context) => {},
    execute: (data, context) => {
      var translation = context.getInputValue(data, "translation") as p5.Vector;
      context.p5.push();
      context.p5.translate(translation.x, translation.y);
      if (data.execOutputs.execute) {
        context.execute(data.execOutputs.execute);
      }
      context.p5.pop();
    },
  },
  {
    id: "With scale",
    description: "Execute the next instruction as if the canvas was scaled",
    icon: IconArrowsMove,
    tags: ["Transform"],
    dataInputs: [{ id: "scale", type: "vector2", defaultValue: createVector() }],
    dataOutputs: [],
    executeOutputs: ["execute"],
    settings: [],
    canBeExecuted: true,
    getData: (portId, nodeData, context) => {},
    execute: (data, context) => {
      var scale = context.getInputValue(data, "scale") as p5.Vector;
      context.p5.push();
      context.p5.scale(scale.x, scale.y);
      if (data.execOutputs.execute) {
        context.execute(data.execOutputs.execute);
      }
      context.p5.pop();
    },
  },
  {
    id: "With Mask",
    description: "Execute the draw instruction masked by the mask.",
    icon: IconArrowsMove,
    tags: ["Transform"],
    dataInputs: [{ id: "inverted", type: "bool", defaultValue: false }],
    dataOutputs: [],
    executeOutputs: ["mask", "draw"],
    settings: [],
    canBeExecuted: true,
    getData: (portId, nodeData, context) => {},
    execute: (data, context) => {
      var inverted = context.getInputValue(data, "inverted");
      context.p5.push();
      (context.p5 as any).beginClip({ invert: inverted });
      if (data.execOutputs.mask) {
        context.execute(data.execOutputs.mask);
      }
      (context.p5 as any).endClip();
      if (data.execOutputs.draw) {
        context.execute(data.execOutputs.draw);
      }
      context.p5.pop();
    },
  },
  {
    id: "With Blending",
    description: "Execute the next instruction with a blend mode applied",
    icon: IconColorFilter,
    tags: ["Transform"],
    dataInputs: [],
    dataOutputs: [],
    executeOutputs: ["execute"],
    settings: [{ id: "mode", type: "dropdown", defaultValue: "Blend", options: ["Blend", "Add", "Darkest", "Lightest", "Difference", "Exclusion", "Multiply", "Screen", "Replace", "Remove", "Overlay", "Hard_light", "Soft_light", "Dodge", "Burn"] }],
    canBeExecuted: true,
    getData: (portId, nodeData, context) => {},
    execute: (data, context) => {
      var mode = data.settings.mode as string;

      context.p5.blendMode((context.p5 as any)[mode.toUpperCase()] as BLEND_MODE);
      if (data.execOutputs.execute) {
        context.execute(data.execOutputs.execute);
      }

      context.p5.blendMode(context.p5.BLEND);
    },
  },
  {
    id: CUSTOM_FUNCTION,
    description: "",
    IsUnique: true,
    icon: IconArrowsMove,
    tags: [],
    hideInLibrary: true,
    dataInputs: [],
    dataOutputs: [],
    executeOutputs: [],
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
  },
  {
    id: "CustomFunction-start",
    description: "",
    IsUnique: true,
    icon: IconArrowsMove,
    tags: [],
    hideInLibrary: true,
    dataInputs: [],
    dataOutputs: [],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var contextFn = context.functionStack[context.functionStack.length - 1];
      return contextFn[portId];
    },
    execute: (data, context) => {
      if (data.execOutputs.execute) {
        context.execute(data.execOutputs.execute);
      }
    },
  },
  {
    id: "CustomFunction-end",
    description: "",
    IsUnique: true,
    hideInLibrary: true,
    icon: IconArrowsMove,
    tags: [],
    dataInputs: [],
    dataOutputs: [],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return context.getInputValue(nodeData, portId);
    },
    execute: (data, context) => {
      //TODO
    },
  },
];
