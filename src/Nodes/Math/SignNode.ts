import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createFunc } from "../createFunc";

export const SignNode: NodeDefinition = createFunc("Sign", Math.sign, "Return -1, 0 or 1 depending of the sign of a number.", IconMathFunction, (a) => `sign(${a})`);
