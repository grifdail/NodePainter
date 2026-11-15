import { memo, useEffect, useRef, useState } from "react";
import { clamp01 } from "../../../Utils/math/clamp01";



export const TrackLine = memo(function ({ cursor, onMoveCursor, onDrag, onAddKeyframe, onSelect, selected, keyframes, name }: {
    cursor: number;
    onMoveCursor: (v: number, reset?: boolean) => void;
    keyframes?: number[],
    selected?: number | null,
    onSelect?: (index: number) => void,
    onDrag?: (index: number, pos: number) => void;
    onAddKeyframe?: (pos: number) => void,
    name: string
}) {

    const boxRef = useRef<HTMLDivElement>(null)
    const mouseDownRef = useRef<boolean>(false);
    const draggingRef = useRef<"none" | number>("none");
    const dragElemRef = useRef<HTMLSpanElement | null>(null)


    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            if (boxRef.current) {
                const box = boxRef.current.getBoundingClientRect()
                const x = clamp01((e.clientX - box.x) / box.width);
                if (mouseDownRef.current) {
                    onMoveCursor(x, !draggingRef.current);
                }
                if (draggingRef.current !== "none" && dragElemRef.current) {
                    dragElemRef.current.style.left = `${x * 100}%`
                }
            }

        }
        const mouseUp = (e: MouseEvent) => {
            mouseDownRef.current = (false);
            if (draggingRef.current !== "none" && onDrag && boxRef.current) {
                e.stopPropagation();
                e.preventDefault();
                const box = boxRef.current.getBoundingClientRect()
                const x = clamp01((e.clientX - box.x) / box.width);
                onDrag(draggingRef.current, x);
            }
            draggingRef.current = "none";
        }
        window.addEventListener("pointermove", mouseMove);
        window.addEventListener("pointerup", mouseUp, true);
        return () => {
            window.removeEventListener("pointermove", mouseMove)
            window.removeEventListener("pointerup", mouseUp, true)
        };
    }, [name, onDrag, onMoveCursor])

    return <div
        ref={boxRef}
        className="tracks-line"
        onDoubleClick={(e) => {
            if (boxRef.current && onAddKeyframe) {
                const box = boxRef.current.getBoundingClientRect()
                const x = clamp01((e.clientX - box.x) / box.width);
                onAddKeyframe(x);
            }
        }}
        onPointerDownCapture={(e) => {
            mouseDownRef.current = (true);
            if (boxRef.current) {
                const box = boxRef.current.getBoundingClientRect()
                const x = clamp01((e.clientX - box.x) / box.width);
                onMoveCursor(x)
            }
        }}

    >
        <span className="cursor" style={{ left: `${cursor * 100}%` }}></span>
        {keyframes && keyframes.map((key, i) => {
            return <span
                key={i}
                className={`keyframe ${selected === i ? "selected" : ""}`}
                style={{ left: `${key * 100}%` }}
                onClick={(e) => {
                    if (onSelect && !dragElemRef.current) {
                        onSelect(i);
                    }
                }}
                onPointerDownCapture={e => {
                    if (onSelect) {
                        onSelect(i);
                    }
                    dragElemRef.current = e.target as HTMLSpanElement
                    draggingRef.current = i
                }}
            ></span>;
        })}
    </div>;
});