import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createFunc } from "../createFunc";

export const Abs: NodeDefinition = createFunc("Abs", Math.abs, "Return the absolute root of a number.", IconMathFunction, (a) => `abs(${a})`);
