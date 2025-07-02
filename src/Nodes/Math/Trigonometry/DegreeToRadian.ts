import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createFunc } from "../../createFunc";

export const DegreeToRadian: NodeDefinition = createFunc(
  "Math/Trigonometry/DegreeToRadian",
  (a) => (a * 180) / Math.PI,
  "Convert an angle in degree into radian.",
  IconAngle,
  (a) => `radians(${a})`
);
