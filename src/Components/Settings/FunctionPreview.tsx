import { useMemo } from "react";
import { invertLerp } from "../../Utils/math/invertLerp";
import { calculateSVGPathForMathFunction } from "../../Utils/ui/calculateSVGPathForMathFunction";
import styled from "styled-components";


var StyledPreview = styled.svg`
  background-color: white;

  margin-bottom: var(--padding-small);
`;



export function FunctionPreview({ fn, resolution, height, width }: { fn: (value: number) => number; resolution: number; height: number; width: number; }) {
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
                y2={invertLerp(min, max, 1) * height} />
            <line
                x1={0}
                x2={width}
                y1={invertLerp(min, max, 0) * height}
                y2={invertLerp(min, max, 0) * height} />
        </StyledPreview>
    );
}
