import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createFunc } from "../createFunc";

export const Cos: NodeDefinition = createFunc("Cos", Math.cos, "Return the cosine of a number (in radian).", IconAngle, (a) => `cos(${a})`);
