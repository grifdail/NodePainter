import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createFunc } from "../../createFunc";

export const Atan: NodeDefinition = createFunc("Math/Trigonometry/Atan", Math.atan, "Return the inverse tangent (in radian) of a number.", IconAngle, (a) => `atan(${a})`);
