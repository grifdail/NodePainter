import { useRef, useState, useCallback, MouseEvent, useEffect } from "react";
import { FlipbookLine } from "../../../Types/FlipBook";
import { Color, Vector, Vector2 } from "../../../Types/vectorDataType";
import { toHex } from "../../../Utils/math/colorUtils";
import { Line } from "./Line";
import { generateSVGPath } from "../../../Utils/ui/generateSVGPath";
import { current } from "immer";
import * as simplify from "simplify-path";
import { array } from "prop-types";

export function PainterFrame({ color, lineWidth, addLine, frame }: { frame: number, color: Color; lineWidth: number; editMode: "draw" | "erase"; addLine: (line: FlipbookLine, frameIndex?: number) => void; }) {

    const refPointer = useRef<SVGCircleElement>(null);
    const refRect = useRef<SVGRectElement>(null);
    const refItem = useRef<{ points: number[]; }>({ points: [] });
    const refLine = useRef<SVGPathElement>(null);
    const [started, setStarted] = useState(false);

    const finishLine = useCallback(() => {
        var base = refItem.current.points;
        let optimized = toFlatNumberArray(simplify.default(toArrayOfNumberArray(refItem.current.points), 1 / 400, true));
        console.log(`Optimized ${base.length / 2} point to ${optimized.length / 2} point. That's a ${Math.round((base.length - optimized.length) / base.length * 100)}% optimization`);
        addLine({ color, lineWidth, points: optimized });
    }, [frame, addLine, color, lineWidth])

    const onMouseMove = useCallback((e: MouseEvent<SVGRectElement>) => {
        e.preventDefault()
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.x) / rect.width;
        const y = (e.clientY - rect.y) / rect.height;
        if (refPointer.current) {

            refPointer.current.setAttribute("cx", x.toString());
            refPointer.current.setAttribute("cy", y.toString());
            refPointer.current.setAttribute("visibility", "visible");
        }
        if (started) {
            refItem.current.points.push(x, y);
            refLine.current?.setAttribute("d", generateSVGPath(refItem.current.points) || "")
        }
    }, [started, refItem, refLine]);

    const onMouseDown = useCallback((e: MouseEvent<SVGRectElement>) => {
        e.preventDefault()
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.x) / rect.width;
        const y = (e.clientY - rect.y) / rect.height;
        refItem.current.points = [x, y];
        setStarted(true);
    }, []);

    const onMouseUp = useCallback((e: MouseEvent<SVGRectElement>) => {
        e.preventDefault()
        finishLine();
        setStarted(false);

    }, [color, lineWidth, addLine, setStarted]);


    const onMouseLeave = useCallback((e: MouseEvent<SVGRectElement>) => {
        finishLine();
        if (refPointer.current) {
            refPointer.current.setAttribute("visibility", "hidden");
        }

    }, [color, lineWidth, addLine, setStarted]);


    useEffect(() => {
        if (started) {
            finishLine();
            refItem.current.points = []
        }
    }, [frame])

    return <g>
        <rect
            ref={refRect}
            width={1}
            height={1}
            x={0}
            y={0}
            fill="transparent"
            //onMouseMove={onMouseMove}
            //onMouseDown={onMouseDown}
            //onMouseUp={onMouseUp}
            //onMouseLeave={onMouseLeave}
            onPointerDown={onMouseDown}
            onPointerUp={onMouseUp}
            onPointerLeave={onMouseLeave}
            onPointerMove={onMouseMove}
        />
        <g style={{ pointerEvents: "none" }}>
            <circle
                cx={0.5}
                cy={0.5}
                ref={refPointer}
                fill={toHex(color, true)}
                r={lineWidth / 2}
                visibility="hidden" />
            {started && <Line color={color} lineWidth={lineWidth} points={refItem.current.points} ref={refLine} />}
        </g>
    </g >


}
function toFlatNumberArray(source: [number, number][]): number[] {
    return source.flat()
}

function toArrayOfNumberArray(source: number[]): Vector2[] {
    var res = new Array<Vector2>(source.length / 2)
    for (let i = 0; i < source.length; i += 2) {
        res[i / 2] = [source[i], source[i + 1]]
    }
    return res;
}

