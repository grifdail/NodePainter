import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createFunc } from "../../createFunc";

export const AsinNode: NodeDefinition = createFunc("Math/Trigonometry/Asin", Math.asin, "Return the inverse sine (in radian) of a number.", IconAngle, (a) => `asin(${a})`);
