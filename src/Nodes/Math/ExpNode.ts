import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createFunc } from "../createFunc";

export const ExpNode: NodeDefinition = createFunc("Exp", Math.exp, "Return e to the power of a number.", IconMathFunction, (a) => `exp(${a})`);
