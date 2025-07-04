import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createFunc } from "../../createFunc";

export const AcosNode: NodeDefinition = createFunc("Math/Trigonometry/Acos", Math.acos, "Return the inverse cosine (in radian) of a number.", IconAngle, (a) => `acos(${a})`);
