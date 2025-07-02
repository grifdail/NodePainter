import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createFunc } from "../../createFunc";

export const Clamp01: NodeDefinition = createFunc(
  "Math/Clamp01",
  (a) => Math.max(Math.min(a, 1), 0),
  "Constrict a number between 0 and 1.",
  IconMathFunction,
  (a) => `clamp(${a}, 0.0, 1.0)`
);
