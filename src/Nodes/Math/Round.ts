import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createFunc } from "../createFunc";

export const Round: NodeDefinition = createFunc("Round", Math.round, "Round a number to the closest integer.", IconMathFunction, (a) => `round(${a})`);
