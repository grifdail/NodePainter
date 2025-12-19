import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import styled from "styled-components";
import { BezierPathSettingDefinition, PathSettingDefinition } from "../../Types/SettingDefinition";
import { BezierPathData, PathData } from "../../Types/PathData";
import { MouseEvent, useState } from "react";
import { current } from "immer";
import { Fieldset } from "../StyledComponents/Fieldset";
import { BoolInput } from "../Generics/Inputs/BoolInput";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { Button } from "../Generics/Button";

export const BezierPathSetting: SettingComponent<BezierPathSettingDefinition> = {
    UI: function PathSetting({ onChange, value, def }: SettingProps<BezierPathSettingDefinition>) {
        const list = value as BezierPathData;
        const [pointStart, setPointStart] = useState<[number, number] | null>(null);
        const [pointDelta, setPointDelta] = useState<[number, number] | null>(null);

        function onMouseDown(e: MouseEvent<SVGElement>) {
            setPointStart(getMousePosition(e));
            setPointDelta([0, 0]);
        }
        function onMouseUp(e: MouseEvent<SVGElement>) {
            if (pointStart !== null) {
                const [x, y] = getMousePosition(e);
                onChange([...list, ...pointStart, x - pointStart[0], y - pointStart[1]]);
                setPointStart(null);
                setPointDelta(null);
            }
            //
        }
        function onMouseMouve(e: MouseEvent<SVGElement>) {
            if (pointStart !== null) {
                const [x, y] = getMousePosition(e);
                setPointDelta([x - pointStart[0], y - pointStart[1]]);
            }
        }
        function onMouseLeave(e: MouseEvent<SVGElement>) {
            setPointStart(null);
        }
        function clear() {
            onChange([]);
        }
        function close() {
            if (list.length >= 8) {
                onChange([...list, list[0], list[1], list[2], list[3]]);
            }
        }
        function undo() {
            if (list.length >= 4) {
                onChange(list.slice(0, list.length - 4));
            }
        }
        const temp = pointStart !== null && pointDelta !== null ? [...list, ...pointStart, ...pointDelta] : list;
        const pointElements = [];
        for (var i = 0; i < temp.length; i += 4) {
            pointElements.push(
                <BezierPoint
                    x={temp[i + 0]}
                    y={temp[i + 1]}
                    cpX={temp[i + 2]}
                    cpY={temp[i + 3]}></BezierPoint>
            );
        }

        return (
            <div>
                <StyledPreview
                    width={272}
                    height={272}
                    onChange={onChange}
                    viewBox="0 0 1 1"
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMouve}>
                    <path
                        fill="none"
                        stroke="black"
                        strokeWidth="0.01"
                        d={generatePath(temp)}></path>
                    {pointElements}
                </StyledPreview>
                <ButtonGroup>
                    <Button
                        label="Clear"
                        onClick={clear}></Button>
                    <Button
                        label="Close"
                        onClick={close}></Button>
                    <Button
                        label="Undo"
                        onClick={undo}></Button>
                </ButtonGroup>
            </div>
        );
    },
    getSize: function (value, def): number {
        return 272 + 64;
    }
};

var StyledPreview = styled.svg`
  background-color: white;
  margin-bottom: var(--padding-small);
`;

function getMousePosition(e: MouseEvent<SVGElement, globalThis.MouseEvent>): [number, number] {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.x) / rect.width;
    const y = (e.clientY - rect.y) / rect.height;
    return [x, y];
}

function generatePath(path: BezierPathData): string | undefined {
    if (path.length < 8) {
        return undefined;
    }
    const points = [`M ${path[0]} ${path[1]}`];
    for (let i = 0; i < path.length - 4; i += 4) {
        points.push(`C 
      ${path[i + 0] + path[i + 2]} ${path[i + 1] + path[i + 3]} 
      ${path[i + 4] - path[i + 6]} ${path[i + 5] - path[i + 7]}
      ${path[i + 4]} ${path[i + 5]}
      `);
    }
    return points.join("\n");
}

function BezierPoint({ x, y, cpX, cpY }: { x: number; y: number; cpX: number; cpY: number }) {
    return (
        <g>
            <circle
                fill="black"
                r="0.02"
                cx={x}
                cy={y}></circle>{" "}
            <circle
                stroke="black"
                fill="none"
                r="0.01"
                strokeWidth="0.005"
                cx={x + cpX}
                cy={y + cpY}></circle>
            <circle
                stroke="black"
                fill="none"
                r="0.01"
                strokeWidth="0.005"
                cx={x - cpX}
                cy={y - cpY}></circle>
            <line
                stroke="black"
                strokeWidth="0.005"
                strokeDasharray="0.005"
                x1={x - cpX}
                y1={y - cpY}
                x2={x + cpX}
                y2={y + cpY}
            />
        </g>
    );
}
