import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createFunc } from "../createFunc";

export const Acos: NodeDefinition = createFunc("Acos", Math.acos, "Return the inverse cosine (in radian) of a number.", IconAngle, (a) => `acos(${a})`);
