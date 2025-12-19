import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import styled from "styled-components";
import { useMemo } from "react";
import { EasingFunctionType, evaluate } from "../../libs/easing";
import { calculateSVGPathForMathFunction } from "../../Utils/ui/calculateSVGPathForMathFunction";
import { invertLerp } from "../../Utils/math/invertLerp";
import { EasingPreviewSettingDefinition } from "../../Types/SettingDefinition";
import { EasingDropdownFieldset } from "../Generics/EasingDropdownFieldset";

export const EasingSetting: SettingComponent<EasingPreviewSettingDefinition> = {
    UI: function GradientSetting({ onChange, value, def, node }: SettingProps<EasingPreviewSettingDefinition>) {
        const functionName = value as EasingFunctionType;

        var fn = useMemo(() => (x: number) => evaluate(functionName, x), [functionName]);

        return (
            <div>
                <FunctionPreview
                    fn={fn}
                    width={272}
                    height={100}
                    resolution={100}></FunctionPreview>

                <EasingDropdownFieldset onChange={onChange} value={value} />
            </div>
        );
    },
    getSize: function (value, def): number {
        return 108 + 32 + 10;
    }
};

var StyledPreview = styled.svg`
  background-color: white;

  margin-bottom: var(--padding-small);
`;

function FunctionPreview({ fn, resolution, height, width }: { fn: (value: number) => number; resolution: number; height: number; width: number }) {
    var values = useMemo(() => Array.from({ length: resolution }).map((v: any, i: number) => fn(i / (resolution - 1))), [fn, resolution]);

    var max = useMemo(() => Math.max(...values, 1) + 0.1, [values]);
    var min = useMemo(() => Math.min(...values, 0) - 0.1, [values]);

    const path = useMemo(() => calculateSVGPathForMathFunction(values, width, height, min, max), [height, max, min, values, width]);

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
