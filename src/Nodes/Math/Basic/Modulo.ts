import { IconPercentage } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createOperation } from "../../createOperation";

export const Modulo: NodeDefinition = createOperation(
  "Math/Basic/Modulo",
  (a, b) => ((a % b) + b) % b,
  "Give the remainder of the division of A by B.",
  IconPercentage,
  (a, b) => `mod(mod(${a}, ${b}) + ${b}, ${b})`
);
