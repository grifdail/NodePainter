import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createFunc } from "../createFunc";

export const Asin: NodeDefinition = createFunc("Asin", Math.asin, "Return the inverse sine (in radian) of a number.", IconAngle, (a) => `asin(${a})`);
