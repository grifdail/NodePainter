import { IconXPowerY } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createOperation } from "../../createOperation";

export const PowNode: NodeDefinition = createOperation(
  "Math/Pow",
  (a, b) => Math.pow(a, b),
  "Raise A to the power of B.",
  IconXPowerY,
  (a, b) => `pow(${a}, ${b})`
);
