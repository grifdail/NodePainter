import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createFunc } from "../createFunc";

export const Ceil: NodeDefinition = createFunc("Ceil", Math.ceil, "Round up a number to the smallest interger larger or equal to itself.", IconMathFunction, (a) => `ceil(${a})`);
