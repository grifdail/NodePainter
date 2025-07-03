import { NodeDefinition } from "../Types/NodeDefinition";

import { Nodes3D } from "./3D/3DNodes";
import { ArrayNodes } from "./Array";
import { ColorNodes } from "./Color";
import { createConstant } from "./createConstant";
import { DrawNodes } from "./Draw";
import { EffectNodes } from "./Effects";
import { ImageNodes } from "./Images";
import { InputNodes } from "./Inputs";
import { LogicNodes } from "./Logic";
import { MathNodes } from "./Math";
import { MiscNodes } from "./Misc";
import { ProceduralNodes } from "./Procedural";
import { RandomNodes } from "./Random";
import { ShaderNodes } from "./Shaders";
import { StartNode } from "./StartNode";
import { StateNodes } from "./State";
import { TechnicalNodes } from "./Technical";
import { TextNodes } from "./Text";

export const Nodes: Array<NodeDefinition> = [
  StartNode,

  ...ArrayNodes,
  ...ColorNodes,
  ...DrawNodes,
  ...EffectNodes,
  ...ImageNodes,
  ...InputNodes,
  ...LogicNodes,
  ...MathNodes,
  ...MiscNodes,
  ...ProceduralNodes,
  ...RandomNodes,
  ...ShaderNodes,
  ...StateNodes,
  ...TechnicalNodes,
  ...TextNodes,

  // Constant
  createConstant("Pi", Math.PI),
  createConstant("Tau", Math.PI * 2),
  createConstant("E", Math.E),
  createConstant("Sqrt2", Math.SQRT2),

  ...Nodes3D,
];

console.log(Nodes.length);

export const NodeLibrary = Object.fromEntries(Nodes.map((node) => [node.id, node]));
