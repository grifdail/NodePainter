import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createFunc } from "../../createFunc";

export const AbsNode: NodeDefinition = createFunc("Math/Advanced/Abs", Math.abs, "Return the absolute root of a number.", IconMathFunction, (a) => `abs(${a})`);
