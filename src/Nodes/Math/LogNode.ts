import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createFunc } from "../createFunc";

export const LogNode: NodeDefinition = createFunc("Log", Math.log, "Return the natural logarithm of a number (base e).", IconMathFunction, (a) => `log(${a})`);
