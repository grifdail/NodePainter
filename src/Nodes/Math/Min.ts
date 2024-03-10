import { IconMathMin } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createOperation } from "../createOperation";

export const Min: NodeDefinition = createOperation("Min", Math.min, "Returne the smallest of two number.", IconMathMin, (a, b) => `min(${a}, ${b})`);
