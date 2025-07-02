import { IconPercentage } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createOperation } from "../createOperation";

export const Modulo: NodeDefinition = createOperation(
  "Math/Modulo",
  (a, b) => ((a % b) + b) % b,
  "Give the remainder of the division of A by B.",
  IconPercentage,
  (a, b) => `mod(mod(${a}, ${b}) + ${b}, ${b})`
);
export const Remainder: NodeDefinition = createOperation(
  "Math/Remainder",
  (a, b) => a % b,
  "Give the remainder of the division of A by B.",
  IconPercentage,
  (a, b) => `mod(${a}, ${b})`
);
