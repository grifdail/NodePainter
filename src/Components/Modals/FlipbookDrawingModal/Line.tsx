import { forwardRef } from "react";
import { Color } from "../../../Types/vectorDataType";
import { toHex } from "../../../Utils/math/colorUtils";
import { generateSVGPath } from "../../../Utils/ui/generateSVGPath";


export const Line = forwardRef<SVGPathElement, { color: Color; lineWidth: number; points: number[]; }>(({ color, lineWidth, points }, ref) => {
    return <path
        d={generateSVGPath(points)}
        stroke={toHex(color, true)}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={lineWidth}
        fill="none"
        ref={ref}
    ></path>;
});
