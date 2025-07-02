import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createFunc } from "../../createFunc";

export const Tan: NodeDefinition = createFunc("Math/Trigonometry/Tan", Math.tan, "Return the tangent of a number (in radian).", IconAngle, (a) => `tan(${a})`);
