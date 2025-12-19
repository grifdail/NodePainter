import { FlipbookLine } from "../../../Types/FlipBook";
import { Line } from "./Line";

export function Frame({ frame, opacity = 1 }: { frame: FlipbookLine[]; opacity?: number; }) {
    return <g opacity={opacity}>
        {frame.map((line, i) => {
            return <Line key={i} color={line.color} lineWidth={line.lineWidth} points={line.points} />;
        })}
    </g>;
}
