import { IconMathXPlusY } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createOperation } from "../createOperation";

export const PowNode: NodeDefinition = createOperation(
  "Pow",
  (a, b) => a % b,
  "Raise A to the power of B.",
  IconMathXPlusY,
  (a, b) => `pow(${a}, ${b})`
);