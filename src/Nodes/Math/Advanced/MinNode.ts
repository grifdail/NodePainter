import { IconMathMin } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createOperation } from "../../createOperation";

export const MinNode: NodeDefinition = createOperation("Math/Advanced/Min", Math.min, "Returne the smallest of two number.", IconMathMin, (a, b) => `min(${a}, ${b})`);
