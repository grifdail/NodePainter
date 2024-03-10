import { IconPercentage } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createOperation } from "../createOperation";

export const Modulo: NodeDefinition = createOperation(
  "Modulo",
  (a, b) => a % b,
  "Give the remainder of the division of A by B.",
  IconPercentage,
  (a, b) => `mod(${a}, ${b})`
);
