import { SettingComponent, SettingProps } from "./SettingsComponents";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconPlus, IconX } from "@tabler/icons-react";
import { NumberInput } from "../Inputs/NumberInput";
import { createDefaultEnvelopeStop, EnvelopeData, AnimationEasingType, AnimationEasingTypeArray, EnvelopeStop } from "../../Types/EnvelopeData";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { Button } from "../Generics/Button";
import { useEffect, useRef, useState } from "react";
import { useDrag } from "@use-gesture/react";
import { moveUpArray } from "../../Utils/moveUpArray";

const ColorList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: stretch;
  justify-content: start;
  padding: 0;
  margin: 0;

  & > li {
    padding: 0;
    margin: 0;
    height: 30px;
    flex: 0 0 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    gap: 2px;

    & > input {
      width: 50px;
      flex: 0 0 50px;
      text-align: center;
    }

    & > button {
      flex: 1 0 50px;
      height: 100%;
    }

    & > button.delete {
      flex: 0 0 30px;
      border: none;
      cursor: pointer;
    }
  }
`;

export const EnvelopeSetting: SettingComponent = function GradientSetting({ onChange, value, def }: SettingProps) {
  const list = value as EnvelopeData;

  function onChangeHeight(i: number, value: any): void {
    console.log(i, value);
    onChange([...list.slice(0, i), { ...list[i], height: value }, ...list.slice(i + 1, list.length)]);
  }
  function onChangeLerp(i: number, value: AnimationEasingType): void {
    console.log(i, value);
    onChange([...list.slice(0, i), { ...list[i], lerp: value }, ...list.slice(i + 1, list.length)]);
  }
  function onChangePosition(i: number, pos: any): void {
    var newList = [...list.slice(0, i), { ...list[i], pos: Math.min(1, Math.max(pos, 0)) }, ...list.slice(i + 1, list.length)];
    newList.sort((a: EnvelopeStop, b: EnvelopeStop) => a.pos - b.pos);
    onChange(newList);
  }

  function addNewStop(): void {
    var newList: EnvelopeData = [...list, createDefaultEnvelopeStop()];
    newList.sort((a: EnvelopeStop, b: EnvelopeStop) => a.pos - b.pos);
    onChange(newList);
  }

  function removeStop(i: number): void {
    if (list.length > 2) {
      onChange([...list.slice(0, i), ...list.slice(i + 1, list.length)]);
    }
  }

  return (
    <div>
      <EnvelopePreview value={list} width={250} height={100} onChange={onChange}></EnvelopePreview>
      <ColorList>
        {list.map((stop: EnvelopeStop, i: number) => (
          <li key={i}>
            <NumberInput value={stop.pos} onChange={(v) => onChangePosition(i, v)}></NumberInput>
            <NumberInput value={stop.height} onChange={(v) => onChangeHeight(i, v)}></NumberInput>
            <Menu menuButton={<MenuButton className={"button"}>{stop.lerp}</MenuButton>}>
              {Object.values(AnimationEasingType).map((item) => (
                <MenuItem onClick={() => onChangeLerp(i, item)}>{item}</MenuItem>
              ))}
            </Menu>
            <button className="delete" onClick={() => removeStop(i)} disabled={list.length <= 1}>
              <IconX />
            </button>
          </li>
        ))}
      </ColorList>

      <ButtonGroup>
        <Button icon={IconPlus} onClick={addNewStop}></Button>
      </ButtonGroup>
    </div>
  );
};
EnvelopeSetting.getSize = function (value, def): number {
  return 32 * value.length + 50 + 100 + 10;
};

var StyledPreview = styled.svg`
  background-color: white;
`;

var Dot = styled.circle`
  fill: var(--color-number);
  cursor: pointer;
`;

function EnvelopePreview({ value, width, height, onChange }: { onChange: (value: any) => void; value: EnvelopeData; width: number; height: number }) {
  var [localCopy, setLocalCopy] = useState(structuredClone(value));
  const bind = useDrag(({ args: [i, item], tap, active, delta: [x, y] }) => {
    if (svgBlock.current) {
      var rect = svgBlock.current.getBoundingClientRect();
      var pos = Math.min(1, Math.max(item.pos + x / rect.width, 0));
      var h = Math.min(1, Math.max(0, item.height - y / rect.height));
      var newItem = { ...localCopy[i], pos: pos, height: h };
      if (tap) {
        newItem.lerp = moveUpArray(AnimationEasingTypeArray, newItem.lerp);
      }
      var newList = [...localCopy.slice(0, i), newItem, ...localCopy.slice(i + 1, localCopy.length)];

      newList.sort((a: EnvelopeStop, b: EnvelopeStop) => a.pos - b.pos);
      setLocalCopy(newList);
      if (!active) {
        onChange(newList);
      }
    }
  });

  useEffect(() => {
    setLocalCopy(structuredClone(value));
  }, [value]);

  var svgBlock = useRef<SVGSVGElement>(null);
  function onDoubleClick(event: any) {
    if (svgBlock.current) {
      var rect = svgBlock.current.getBoundingClientRect();
      var x = (event.clientX - rect.x) / rect.width;
      var y = 1 - (event.clientY - rect.y) / rect.height;

      var newList: EnvelopeData = [
        ...value,
        {
          pos: x,
          height: y,
          lerp: AnimationEasingType.Linear,
        },
      ];
      newList.sort((a: EnvelopeStop, b: EnvelopeStop) => a.pos - b.pos);
      onChange(newList);
    }
  }

  const path = calculatePath(height, localCopy, width);

  return (
    <StyledPreview width={width} height={height} onDoubleClick={onDoubleClick} ref={svgBlock}>
      <path d={path.join("\n")} fill="rgba(0,0,0,0.5)"></path>
      {localCopy.map((item: EnvelopeStop, i: number) => (
        <Dot r="10" {...bind(i, item)} cx={item.pos * width} cy={height * (1 - item.height)}></Dot>
      ))}
    </StyledPreview>
  );
}

function calculatePath(height: number, value: EnvelopeData, width: number) {
  const path = [`M 0,${height} `];
  let prev = value[0];
  for (let i = 0; i < value.length; i++) {
    let current = value[i];
    if (i === 0 || prev.lerp === "linear") {
      path.push(`L ${current.pos * width}, ${height * (1 - current.height)}`);
    }
    if (prev.lerp === AnimationEasingType.Horizontal) {
      path.push(`L ${current.pos * width} ${height * (1 - prev.height)}`);
      path.push(`L ${current.pos * width} ${height * (1 - current.height)}`);
    }
    if (prev.lerp === AnimationEasingType.Vertical) {
      path.push(`L ${prev.pos * width}, ${height * (1 - current.height)}`);
      path.push(`L ${current.pos * width}, ${height * (1 - current.height)}`);
    }
    if (prev.lerp === AnimationEasingType.Easein) {
      path.push(`Q ${(prev.pos + current.pos) * 0.5 * width}, ${height * (1 - prev.height)}, ${current.pos * width}, ${height * (1 - current.height)}`);
    }
    if (prev.lerp === AnimationEasingType.Easeout) {
      path.push(`Q ${(prev.pos + current.pos) * 0.5 * width}, ${height * (1 - current.height)}, ${current.pos * width}, ${height * (1 - current.height)}`);
    }
    if (prev.lerp === AnimationEasingType.Easeinout) {
      path.push(`C ${(prev.pos + current.pos) * 0.5 * width}, ${height * (1 - prev.height)}, ${(prev.pos + current.pos) * 0.5 * width}, ${height * (1 - current.height)}, ${current.pos * width}, ${height * (1 - current.height)}`);
    }
    prev = value[i];
  }
  path.push(`L ${width},${height} Z`);
  return path;
}
