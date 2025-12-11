import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import styled from "styled-components";
import { PathSettingDefinition } from "../../Types/SettingDefinition";
import { PathData } from "../../Types/PathData";
import { MouseEvent, useState } from "react";
import { current } from "immer";
import { Fieldset } from "../StyledComponents/Fieldset";
import { BoolInput } from "../Generics/Inputs/BoolInput";
import { generateSVGPath } from "../../Utils/ui/generateSVGPath";

export const PathSetting: SettingComponent<PathSettingDefinition> = function PathSetting({ onChange, value, def }: SettingProps<PathSettingDefinition>) {
  const list = value as PathData;
  const [drawingStart, setDrawingStart] = useState<number | null>(null);
  const [onProgressPath, setOnProgressPath] = useState<PathData>([]);
  const [uniformSpeed, setUniformSpeed] = useState(false);

  function onMouseDown(e: MouseEvent<SVGElement>) {
    setDrawingStart(Date.now());
    setOnProgressPath([]);
  }
  function onMouseUp(e: MouseEvent<SVGElement>) {
    if (drawingStart !== null) {
      onChange(onProgressPath);
      setDrawingStart(null);
    }
    //
  }
  function onMouseMouve(e: MouseEvent<SVGElement>) {
    if (drawingStart !== null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.x) / rect.width;
      const y = (e.clientY - rect.y) / rect.height;
      setOnProgressPath((oldPath) => {
        let t = Date.now() - drawingStart;

        if (uniformSpeed) {
          const previousPoint = oldPath.length >= 3 ? [oldPath[oldPath.length - 3], oldPath[oldPath.length - 2], oldPath[oldPath.length - 1]] : [x, y, 0];
          const dt = Math.sqrt((x - previousPoint[0]) * (x - previousPoint[0]) + (y - previousPoint[1]) * (y - previousPoint[1]));
          t = previousPoint[2] + dt;
        }

        return [...oldPath, x, y, t];
      });
    }
  }
  function onMouseLeave(e: MouseEvent<SVGElement>) {
    setDrawingStart(null);
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
          d={drawingStart ? generateSVGPath(onProgressPath, 3) : generateSVGPath(list, 3)}></path>
      </StyledPreview>
      <Fieldset
        label={"Uniform speed"}
        input={BoolInput}
        onChange={setUniformSpeed}
        value={uniformSpeed}></Fieldset>
    </div>
  );
};
PathSetting.getSize = function (value, def): number {
  return 272 + 50;
};

var StyledPreview = styled.svg`
  background-color: white;
  margin-bottom: var(--padding-small);
`;


