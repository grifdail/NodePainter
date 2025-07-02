import { IconMath } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createFunc } from "../createFunc";

export const Sqrt: NodeDefinition = createFunc("Math/Sqrt", Math.sqrt, "Return the square root of a number.", IconMath, (a) => `sqrt(${a})`);
