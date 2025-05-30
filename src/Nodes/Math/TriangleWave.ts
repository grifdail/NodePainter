import { IconWaveSawTool } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createFunc } from "../createFunc";

export const TriangleWave: NodeDefinition = createFunc(
  "TriangleWave",
  (a) => Math.abs((a % 1) - 0.5) * 2,
  "Return a number that alternate between 0 & 1 lineraly in the range [0,1]",
  IconWaveSawTool,
  (a) => `${a} % 1.0 >= 0.5 ? 1.0 - (${a} % 1.0) * 2.0 : (${a} % 1.0) * 2.0)`
);
