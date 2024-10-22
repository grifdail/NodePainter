import { NodeCollection } from "../Types/NodeCollection";
import { NodeDefinition } from "../Types/NodeDefinition";

export type SketchTemplate = {
  nodes: NodeCollection;
  customNodes: { [key: string]: NodeDefinition };
  editedGraph?: string;
  globalSettings?: { [key: string]: any };
};

export const ShaderTemplate: SketchTemplate = {
  nodes: {
    Start: {
      type: "Start",
      id: "Start",
      dataInputs: {},
      settings: { width: 400, height: 400 },
      dataOutputs: {},
      execOutputs: { execute: "Render3D" },
      positionX: 0,
      positionY: 0,
      selectedType: "unknown",
    },
    "MainShader-start": {
      type: "MainShader-start",
      id: "MainShader-start",
      dataInputs: {},
      settings: {},
      dataOutputs: { uv: { id: "uv", type: "vector2", defaultValue: [0, 0] } },
      execOutputs: {},
      positionX: 0,
      positionY: 0,
      selectedType: "unknown",
      graph: "MainShader",
    },
    "MainShader-end": {
      type: "MainShader-end",
      id: "MainShader-end",
      dataInputs: { color: { id: "color", type: "color", ownValue: [0, 0, 0, 1], hasConnection: true, connectedNode: "MainShader-start", connectedPort: "uv" } },
      settings: {},
      dataOutputs: {},
      execOutputs: {},
      positionX: 600,
      positionY: 0,
      selectedType: "unknown",
      graph: "MainShader",
    },
    Render3D: {
      type: "MainShader",
      id: "Render3D",
      dataInputs: {},
      settings: { width: 400, height: 400, when: "Everytime" },
      dataOutputs: { image: { id: "image", type: "image", defaultValue: null } },
      execOutputs: { execute: "DrawMainImage" },
      positionX: 400,
      positionY: 1.0,
      selectedType: "unknown",
    },
    DrawMainImage: {
      type: "DrawImage",
      id: "DrawMainImage",
      dataInputs: {
        image: { id: "image", type: "image", ownValue: null, hasConnection: true, connectedNode: "Render3D", connectedPort: "image" },
        pos: { id: "pos", type: "vector2", ownValue: [0, 0], hasConnection: false, connectedNode: null, connectedPort: null },
        dim: { id: "dim", type: "vector2", ownValue: [400, 400], hasConnection: false, connectedNode: null, connectedPort: null },
      },
      settings: {},
      dataOutputs: {},
      execOutputs: {},
      positionX: 1000,
      positionY: 0,
      selectedType: "unknown",
    },
  },
  customNodes: {
    MainShader: {
      id: "MainShader",
      hideInLibrary: false,
      IsUnique: false,
      description: "Custom Shader",
      tags: ["Custom"],
      dataInputs: [],
      dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
      executeOutputs: ["execute"],
      settings: [
        { id: "width", type: "number", defaultValue: 400 },
        { id: "height", type: "number", defaultValue: 400 },
        { id: "when", type: "dropdown", defaultValue: "Once", options: ["Once", "Per frame", "Everytime"] },
      ],
      executeAs: "RenderShader",
      canBeExecuted: true,
    },
    "MainShader-start": {
      IsUnique: true,
      hideInLibrary: true,
      description: "",
      id: "MainShader-start",
      tags: [],
      dataInputs: [],
      dataOutputs: [{ id: "uv", type: "vector2", defaultValue: [0, 0] }],
      executeOutputs: [],
      settings: [],
      executeAs: "CustomShader-start",
      canBeExecuted: false,
    },
    "MainShader-end": {
      IsUnique: true,
      description: "",
      hideInLibrary: true,
      id: "MainShader-end",
      tags: [],
      dataInputs: [{ id: "color", type: "color", defaultValue: [0, 0, 0, 1] }],
      dataOutputs: [],
      executeOutputs: [],
      settings: [],
      executeAs: "CustomShader-end",
      canBeExecuted: false,
    },
  },
  editedGraph: "MainShader",
};

export const ThreeDTemplate: SketchTemplate = {
  nodes: {
    Start: {
      type: "Start",
      id: "Start",
      dataInputs: {},
      settings: {
        width: 400,
        height: 400,
      },
      dataOutputs: {},
      execOutputs: {
        execute: "DrawMainImage",
      },
      positionX: 0,
      positionY: 0,
      selectedType: "unknown",
    },
    Render3D: {
      type: "Render3D",
      id: "Render3D",
      dataInputs: {},
      settings: {
        width: 400,
        height: 400,
        when: "Per frame",
      },
      dataOutputs: {
        image: {
          id: "image",
          type: "image",
          defaultValue: null,
        },
      },
      execOutputs: {
        draw: "ThenNode",
      },
      positionX: 0,
      positionY: -400,
      selectedType: "unknown",
    },
    DrawMainImage: {
      type: "DrawImage",
      id: "DrawMainImage",
      dataInputs: {
        image: {
          id: "image",
          type: "image",
          ownValue: null,
          hasConnection: true,
          connectedNode: "Render3D",
          connectedPort: "image",
        },
        pos: {
          id: "pos",
          type: "vector2",
          ownValue: [0, 0],
          hasConnection: false,
          connectedNode: null,
          connectedPort: null,
        },
        dim: {
          id: "dim",
          type: "vector2",
          ownValue: [400, 400],
          hasConnection: false,
          connectedNode: null,
          connectedPort: null,
        },
      },
      settings: {},
      dataOutputs: {},
      execOutputs: {},
      positionX: 400,
      positionY: 0,
      selectedType: "unknown",
    },
    ThenNode: {
      type: "Then",
      id: "ThenNode",
      dataInputs: {},
      settings: {},
      dataOutputs: {},
      execOutputs: {
        "0": "FillBackground",
        "1": null,
      },
      positionX: 400,
      positionY: -400,
      selectedType: "unknown",
    },
    FillBackground: {
      type: "FillBackground",
      id: "FillBackground",
      dataInputs: {
        color: {
          id: "color",
          type: "color",
          ownValue: [1, 1, 1, 1],
          hasConnection: false,
          connectedNode: null,
          connectedPort: null,
        },
      },
      settings: {},
      dataOutputs: {},
      execOutputs: {},
      positionX: 800,
      positionY: -400,
      selectedType: "unknown",
    },
  },
  customNodes: {},
  editedGraph: undefined,
};

export const Templates = {
  Shader: ShaderTemplate,
  "3d": ThreeDTemplate,
};
