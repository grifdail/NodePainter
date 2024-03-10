import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createFunc } from "../createFunc";

export const RadianToDegree: NodeDefinition = createFunc(
  "RadianToDegree",
  (a) => (a / 180) * Math.PI,
  "Convert an angle in radian into degree.",
  IconAngle,
  (a) => `degrees(${a})`
);
