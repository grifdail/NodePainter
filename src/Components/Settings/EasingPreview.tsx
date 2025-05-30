import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import styled from "styled-components";
import { useMemo } from "react";
import { Easing, EasingFunctionType, evaluate } from "../../libs/easing";
import { Fieldset } from "../StyledComponents/Fieldset";
import { EasingIcon } from "../../libs/EasingIcon";
import { calculatePathForFunction, invertLerp } from "./calculatePathForFunction";
import { DropdownInput } from "../Generics/Inputs/DropdownInput";
import { EasingPreviewSettingDefinition } from "../../Types/SettingDefinition";

export const EasingSetting: SettingComponent<EasingPreviewSettingDefinition> = function GradientSetting({ onChange, value, def, node }: SettingProps<EasingPreviewSettingDefinition>) {
  const functionName = value as EasingFunctionType;

  var fn = useMemo(() => (x: number) => evaluate(functionName, x), [functionName]);

  return (
    <div>
      <FunctionPreview
        fn={fn}
        width={272}
        height={100}
        resolution={100}></FunctionPreview>

      <Fieldset
        label="Easing"
        input={DropdownInput}
        onChange={onChange}
        passtrough={{
          options: Object.values(Easing),
          template: (name: EasingFunctionType) => (
            <>
              <EasingIcon fn={name} /> {name}
            </>
          ),
        }}
        value={value}></Fieldset>
    </div>
  );
};
EasingSetting.getSize = function (value, def): number {
  return 108 + 32 + 10;
};

var StyledPreview = styled.svg`
  background-color: white;

  margin-bottom: var(--padding-small);
`;

function FunctionPreview({ fn, resolution, height, width }: { fn: (value: number) => number; resolution: number; height: number; width: number }) {
  var values = useMemo(() => Array.from({ length: resolution }).map((v: any, i: number) => fn(i / (resolution - 1))), [fn, resolution]);

  var max = useMemo(() => Math.max(...values, 1) + 0.1, [values]);
  var min = useMemo(() => Math.min(...values, 0) - 0.1, [values]);

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
