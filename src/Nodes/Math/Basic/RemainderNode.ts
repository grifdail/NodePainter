import { IconPercentage } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createOperation } from "../../createOperation";

export const RemainderNode: NodeDefinition = createOperation(
  "Math/Basic/Remainder",
  (a, b) => a % b,
  "Give the remainder of the division of A by B.",
  IconPercentage,
  (a, b) => `mod(${a}, ${b})`
);
