import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createFunc } from "../createFunc";

export const Floor: NodeDefinition = createFunc("Floor", Math.floor, "Round down a number to the largest interger smaller or equal to itself.", IconMathFunction, (a) => `floor(${a})`);
