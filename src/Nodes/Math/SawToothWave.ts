import { IconWaveSawTool } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createFunc } from "../createFunc";

export const SawToothWave: NodeDefinition = createFunc(
  "SawtoothWaver",
  (a) => a % 1,
  "Return the number modulo 0",
  IconWaveSawTool,
  (a) => `mod(${a}, 1.0)`
);
