import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createFunc } from "../../createFunc";

export const Asin: NodeDefinition = createFunc("Math/Asin", Math.asin, "Return the inverse sine (in radian) of a number.", IconAngle, (a) => `asin(${a})`);
