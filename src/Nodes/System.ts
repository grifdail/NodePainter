import { IconArrowsMove, IconAssembly, IconColorFilter, IconRotate, IconShadow } from "@tabler/icons-react";
import { BLEND_MODE } from "p5";
import { Vector2, createColor, createVector2 } from "./vectorDataType";
import { NodeDefinition, PortTypeArray, createDefaultValue } from "../Data/NodeDefinition";
import { NodeData, PortConnection } from "../Hooks/useTree";
import { createPortConnection } from "../Data/createPortConnection";
import { toHex } from "./colorUtils";

export const START_NODE = "Start";
export const CUSTOM_FUNCTION = "CustomFunction";
export const CUSTOM_SHADER = "RenderShader";

export const contextMenuCreateAllNode = Object.fromEntries(
  PortTypeArray.map((type) => [
    `Add a ${type} port`,
    (node: NodeData) => {
      var count = Object.entries(node.dataInputs).length;
      node.dataInputs[`type-${count}-in`] = createPortConnection({
        id: `type-${count}-in`,
        type: type,
        defaultValue: createDefaultValue(type),
      });
      node.dataOutputs[`type-${count}`] = {
        id: `type-${count}`,
        type: type,
        defaultValue: createDefaultValue(type),
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
      var count = context.getInputValueNumber(data, "count");
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
      var width = context.getInputValueNumber(data, "width");
      var height = context.getInputValueNumber(data, "height");
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
    canBeExecuted: true,
    execute: (data, context) => {
      var a = context.getInputValueNumber(data, "a");
      var b = context.getInputValueNumber(data, "b");
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
      var fn: (args: [key: string, port: PortConnection]) => [string, any] = ([key, value]) => [key, context._getInputValue(data, key, value.type)];
      const target = Object.fromEntries(Object.entries(data.dataInputs).map(fn));
      context.blackboard[`${data.id}-context`] = target;
      context.execute(data.execOutputs["execute"] as string);
    },
    contextMenu: {
      ...contextMenuCreateAllNode,
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
    execute: (data, context) => {
      var angle = context.getInputValueNumber(data, "angle");
      context.target.push();
      context.target.rotate(angle);
      if (data.execOutputs.execute) {
        context.execute(data.execOutputs.execute);
      }
      context.target.pop();
    },
  },
  {
    id: "With Shadow",
    description: "Execute the next instruction with a blurry shadow below it",
    icon: IconShadow,
    tags: ["Transform"],
    dataInputs: [
      { id: "blur", type: "number", defaultValue: 1 },
      { id: "color", type: "color", defaultValue: createColor(0, 0, 0) },
      { id: "offset", type: "vector2", defaultValue: createVector2() },
    ],
    dataOutputs: [],
    executeOutputs: ["execute"],
    settings: [],
    canBeExecuted: true,
    execute: (data, context) => {
      var blur = context.getInputValueNumber(data, "blur");
      var color = context.getInputValueColor(data, "color");
      var offset = context.getInputValueVector(data, "offset") as Vector2;
      var ctx = context.target.drawingContext as CanvasRenderingContext2D;
      context.target.push();

      ctx.shadowBlur = blur;
      ctx.shadowColor = toHex(color);
      ctx.shadowOffsetX = offset[0];
      ctx.shadowOffsetY = offset[1];
      if (data.execOutputs.execute) {
        context.execute(data.execOutputs.execute);
      }
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      context.target.pop();
    },
  },
  {
    id: "With translation",
    description: "Execute the next instruction as if the canvas was moved",
    icon: IconArrowsMove,
    tags: ["Transform"],
    dataInputs: [{ id: "translation", type: "vector2", defaultValue: createVector2() }],
    dataOutputs: [],
    executeOutputs: ["execute"],
    settings: [],
    canBeExecuted: true,
    execute: (data, context) => {
      var translation = context.getInputValueVector(data, "translation") as Vector2;
      context.target.push();
      context.target.translate(translation[0], translation[1]);
      if (data.execOutputs.execute) {
        context.execute(data.execOutputs.execute);
      }
      context.target.pop();
    },
  },
  {
    id: "With scale",
    description: "Execute the next instruction as if the canvas was scaled",
    icon: IconArrowsMove,
    tags: ["Transform"],
    dataInputs: [{ id: "scale", type: "vector2", defaultValue: createVector2() }],
    dataOutputs: [],
    executeOutputs: ["execute"],
    settings: [],
    canBeExecuted: true,
    execute: (data, context) => {
      var scale = context.getInputValueVector(data, "scale") as Vector2;
      context.target.push();
      context.target.scale(scale[0], scale[1]);
      if (data.execOutputs.execute) {
        context.execute(data.execOutputs.execute);
      }
      context.target.pop();
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
    execute: (data, context) => {
      var inverted = context.getInputValueBoolean(data, "inverted");
      context.target.push();
      (context.p5 as any).beginClip({ invert: inverted });
      if (data.execOutputs.mask) {
        context.execute(data.execOutputs.mask);
      }
      (context.p5 as any).endClip();
      if (data.execOutputs.draw) {
        context.execute(data.execOutputs.draw);
      }
      context.target.pop();
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
    execute: (data, context) => {
      var mode = data.settings.mode as string;

      context.target.blendMode((context.p5 as any)[mode.toUpperCase()] as BLEND_MODE);
      if (data.execOutputs.execute) {
        context.execute(data.execOutputs.execute);
      }

      context.target.blendMode(context.p5.BLEND);
    },
  },
  {
    id: "With motion blur",
    description: "Execute the next instruction multiple time to create a motion blur effect",
    icon: IconColorFilter,
    tags: ["Transform"],
    dataInputs: [
      { id: "imageCount", type: "number", defaultValue: 5 },
      { id: "timeFrame", type: "number", defaultValue: 1 / 60 },
      { id: "opacity", type: "number", defaultValue: 0.1 },
    ],
    dataOutputs: [],
    executeOutputs: ["execute"],
    settings: [],
    canBeExecuted: true,
    execute: (node, context) => {
      var graphic = context.blackboard[`${node.id}-canvas-cache`];
      if (!graphic) {
        graphic = context.p5.createGraphics(context.target.width, context.target.height);
        context.blackboard[`${node.id}-canvas-cache`] = graphic;
      }

      var imageCount = Math.floor(context.getInputValueNumber(node, "imageCount"));
      var timeFrame = context.getInputValueNumber(node, "timeFrame");
      var opacity = context.getInputValueNumber(node, "opacity");
      var oldTarget = context.target;
      var oldTime = context.time;
      for (let i = 0; i < imageCount; i++) {
        graphic.clear();
        context.target = graphic;
        context.time = oldTime - (i / imageCount) * timeFrame * 1000;
        if (node.execOutputs.execute) {
          context.execute(node.execOutputs.execute);
        }
        oldTarget.tint(255, opacity * 255);
        oldTarget.image(graphic, 0, 0);
      }
      context.time = oldTime;
      context.target = oldTarget;
      oldTarget.tint(255, 255);
      if (node.execOutputs.execute) {
        context.execute(node.execOutputs.execute);
      }
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
      return context._getInputValue(nodeData, portId, "unknown");
    },
    execute: (data, context) => {
      //TODO
    },
  },
];
