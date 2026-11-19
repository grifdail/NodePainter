import { PointsSettingDefinition } from "../../Types/SettingDefinition";
import { MouseEvent } from "react";
import styled from "styled-components";
import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { Button } from "../Generics/Button";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { Vector2 } from "../../Types/vectorDataType";

export const PointsSetting: SettingComponent<PointsSettingDefinition> = {
    UI: function PathSetting({ onChange, value, def }: SettingProps<PointsSettingDefinition>) {
        const list = value as Vector2[];

        function onMouseUp(e: MouseEvent<SVGElement>) {
            const point = getMousePosition(e);
            onChange([...list, point]);
            //
        }


        function clear() {
            onChange([]);
        }
        function close() {
            if (list.length >= 2) {
                onChange([...list, list[0]]);
            }
        }
        function undo() {
            if (list.length >= 1) {
                onChange(list.slice(0, list.length - 1));
            }
        }

        return (
            <div>
                <StyledPreview
                    width={272}
                    height={272}
                    onChange={onChange}
                    viewBox="0 0 1 1"
                    onPointerUp={onMouseUp}>
                    <path
                        fill="none"
                        stroke="black"
                        strokeWidth="0.01"
                        d={generatePath(list)}></path>
                    {list.map(([x, y], i) => {
                        return <circle
                            key={i}
                            fill="black"
                            r="0.02"
                            cx={x}
                            cy={y}></circle>
                    })}
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
    },
    initializeValue(clonedValue, setting) {
        return [];
    },
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

function generatePath(path: Vector2[]): string | undefined {
    if (path.length < 2) {
        return undefined;
    }
    const points = [`M ${path[0][0]} ${path[0][1]}`];
    console.log(path);
    for (let i = 0; i < path.length; i += 1) {
        points.push(`L ${path[i][0]} ${path[i][1]}`);
    }
    console.log(points.join("\n"))
    return points.join("\n");
}
