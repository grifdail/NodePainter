import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createFunc } from "../../createFunc";

export const RadianToDegreeNode: NodeDefinition = createFunc(
  "Math/Trigonometry/RadianToDegree",
  (a) => (a / 180) * Math.PI,
  "Convert an angle in radian into degree.",
  IconAngle,
  (a) => `degrees(${a})`
);
