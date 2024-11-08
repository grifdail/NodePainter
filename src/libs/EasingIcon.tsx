import { forwardRef } from "react";
import { AllEasing, EasingFunctionType } from "./easing";
import { Icon, TablerIconsProps } from "@tabler/icons-react";
import { calculatePathForFunction } from "../Components/Settings/calculatePathForFunction";

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  strokeLinecap: "round" as "round",
  strokeLinejoin: "round" as "round",
};

export const EasingIcons: { [key in EasingFunctionType]: Icon } = Object.fromEntries(
  Object.entries(AllEasing).map(([key, fn]) => {
    const resolution = 24;
    var values = Array.from({ length: resolution }).map((v: any, i: number) => fn(i / (resolution - 1)));

    var max = Math.max(...values, 1) + 0.05;
    var min = Math.min(...values, 0) - 0.05;

    var path = calculatePathForFunction(values, 24, 24, min, max, false);
    return [
      key as EasingFunctionType,
      forwardRef<SVGSVGElement, TablerIconsProps>(({ color = "currentColor", size = 24, stroke = 2, className, children, ...rest }: TablerIconsProps, ref) => {
        return (
          <svg
            ref={ref}
            width={size}
            height={size}
            {...defaultAttributes}
            stroke={color}
            strokeWidth={stroke}
            {...rest}>
            <path d={path.join("\n")}></path>
          </svg>
        );
      }),
    ];
  })
) as any;

export const EasingIcon = ({ fn, ...rest }: TablerIconsProps & { fn: EasingFunctionType }) => {
  var Icon = EasingIcons[fn];
  return <Icon {...rest} />;
};
