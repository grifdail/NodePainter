import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createFunc } from "../../createFunc";

export const Sin: NodeDefinition = createFunc("Math/Trigonometry/Sin", Math.sin, "Return the sine of a number (in radian).", IconAngle, (a) => `sin(${a})`);
