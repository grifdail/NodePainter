import { IconMathXPlusY } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createOperation } from "../createOperation";

export const PowNode: NodeDefinition = createOperation(
  "Pow",
  (a, b) => Math.pow(a, b),
  "Raise A to the power of B.",
  IconMathXPlusY,
  (a, b) => `pow(${a}, ${b})`
);
