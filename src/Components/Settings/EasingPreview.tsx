import { SettingComponent, SettingProps } from "./SettingsComponents";
import styled from "styled-components";
import { useMemo } from "react";
import { EasingFunctionType, evaluate } from "../../libs/easing";

export const EasingPreviewSetting: SettingComponent = function GradientSetting({ onChange, value, def, node }: SettingProps) {
  const functionName = node.settings[def.target] as EasingFunctionType;

  var fn = useMemo(() => (x: number) => evaluate(functionName, x), [functionName]);

  return (
    <div>
      <FunctionPreview
        fn={fn}
        width={272}
        height={100}
        resolution={100}></FunctionPreview>
    </div>
  );
};
EasingPreviewSetting.getSize = function (value, def): number {
  return 108 + 10;
};

var StyledPreview = styled.svg`
  background-color: white;

  margin-bottom: var(--padding-small);
`;

function FunctionPreview({ fn, resolution, height, width }: { fn: (value: number) => number; resolution: number; height: number; width: number }) {
  var values = useMemo(() => Array.from({ length: resolution }).map((v: any, i: number) => fn(i / (resolution - 1))), [fn, resolution]);

  var max = useMemo(() => Math.max(...values) + 0.1, [values]);
  var min = useMemo(() => Math.min(...values) - 0.1, [values]);

  const path = useMemo(() => calculatePathForFunction(values, width, height, min, max), [height, max, min, values, width]);

  return (
    <StyledPreview
      width={width}
      height={height}>
      <path
        d={path.join("\n")}
        fill="rgba(0,0,0,0.5)"></path>
      <line
        x1={0}
        x2={width}
        y1={invertLerp(min, max, 1) * height}
        y2={invertLerp(min, max, 1) * height}
      />
      <line
        x1={0}
        x2={width}
        y1={invertLerp(min, max, 0) * height}
        y2={invertLerp(min, max, 0) * height}
      />
    </StyledPreview>
  );
}

export function calculatePathForFunction(values: number[], width: number, height: number, max: number, min: number) {
  const path = [`M 0,${height} `];
  for (let i = 0; i < values.length; i++) {
    path.push(`L ${(i / (values.length - 1)) * width}, ${height * invertLerp(min, max, values[i])}`);
  }
  path.push(`L ${width},${height} Z`);
  return path;
}

const invertLerp = (a: number, b: number, v: number) => {
  return (v - a) / (b - a);
};
