import { IconFileText } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";

export const TextNode: Array<NodeDefinition> = [
  {
    id: "TextSlice",
    description: "Return a portion of text from start to end",
    icon: IconFileText,
    tags: ["Text"],
    dataInputs: [
      { id: "text", type: "string", defaultValue: "hello" },
      { id: "start", type: "number", defaultValue: 0 },
      { id: "end", type: "number", defaultValue: 1 },
    ],
    dataOutputs: [{ id: "result", type: "string", defaultValue: "" }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      const text = context.getInputValue(nodeData, "text") as string;
      return text.slice(context.getInputValue(nodeData, "start"), context.getInputValue(nodeData, "end"));
    },
    execute: null,
  },
  {
    id: "TextLength",
    description: "Return the lenght of the text",
    icon: IconFileText,
    tags: ["Text"],
    dataInputs: [{ id: "text", type: "string", defaultValue: "hello" }],
    dataOutputs: [{ id: "length", type: "number", defaultValue: 0 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      const text = context.getInputValue(nodeData, "text") as string;
      return text.length;
    },
    execute: null,
  },
  {
    id: "TextConcat",
    description: "concat two string together",
    icon: IconFileText,
    tags: ["Text"],
    dataInputs: [
      { id: "start", type: "string", defaultValue: "hello" },
      { id: "end", type: "string", defaultValue: "world" },
    ],
    dataOutputs: [{ id: "result", type: "string", defaultValue: "" }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return context.getInputValue(nodeData, "start") + context.getInputValue(nodeData, "end");
    },
    execute: null,
  },
  {
    id: "TextLength",
    description: "Return the lenght of the text",
    icon: IconFileText,
    tags: ["Text"],
    dataInputs: [{ id: "text", type: "string", defaultValue: "hello" }],
    dataOutputs: [{ id: "length", type: "number", defaultValue: 0 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      const text = context.getInputValue(nodeData, "text") as string;
      return text.length;
    },
    execute: null,
  },
  {
    id: "NumberToText",
    description: "Convert a number to a text",
    icon: IconFileText,
    tags: ["Text"],
    dataInputs: [{ id: "value", type: "number", defaultValue: 0 }],
    dataOutputs: [{ id: "text", type: "string", defaultValue: "" }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return context.getInputValue(nodeData, "value").toString();
    },
    execute: null,
  },
];
