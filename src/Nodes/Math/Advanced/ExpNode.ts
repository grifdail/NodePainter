import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createFunc } from "../../createFunc";

export const ExpNode: NodeDefinition = createFunc("Math/Advanced/Exp", Math.exp, "Return e to the power of a number.", IconMathFunction, (a) => `exp(${a})`);
