import { SettingDefinition } from "../../Types/SettingDefinition";
import { SettingComponent } from "./SettingsComponents";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconX } from "@tabler/icons-react";
import { NumberInput } from "./NumberInput";
import { createDefaultEnvelopeStop, EnvelopeData, EnvelopeEasingType, EnvelopeStop } from "../../Types/EnvelopeData";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

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

export const EnvelopeSetting: SettingComponent = function GradientSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  const list = value as EnvelopeData;

  function onChangeHeight(i: number, value: any): void {
    console.log(i, value);
    onChange([...list.slice(0, i), { ...list[i], height: value }, ...list.slice(i + 1, list.length)]);
  }
  function onChangeLerp(i: number, value: EnvelopeEasingType): void {
    console.log(i, value);
    onChange([...list.slice(0, i), { ...list[i], lerp: value }, ...list.slice(i + 1, list.length)]);
  }
  function onChangePosition(i: number, pos: any): void {
    var newList = [...list.slice(0, i), { ...list[i], pos: Math.min(1, Math.max(pos, 0)) }, ...list.slice(i + 1, list.length)];
    newList.sort((a: EnvelopeStop, b: EnvelopeStop) => a.pos - b.pos);
    onChange(newList);
  }

  function addNewStop(event: any): void {
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
      <EnvelopePreview value={list} width={250} height={100}></EnvelopePreview>
      <ColorList>
        {list.map((stop: EnvelopeStop, i: number) => (
          <li key={i}>
            <NumberInput value={stop.pos} onChange={(v) => onChangePosition(i, v)}></NumberInput>
            <NumberInput value={stop.height} onChange={(v) => onChangeHeight(i, v)}></NumberInput>
            <Menu menuButton={<MenuButton className={"button"}>{stop.lerp}</MenuButton>}>
              {Object.values(EnvelopeEasingType).map((item) => (
                <MenuItem onClick={() => onChangeLerp(i, item)}>{item}</MenuItem>
              ))}
            </Menu>
            <button className="delete" onClick={() => removeStop(i)} disabled={list.length <= 1}>
              <IconX />
            </button>
          </li>
        ))}
      </ColorList>

      <ButtonGroup compact>
        <button onClick={addNewStop}>Add</button>
      </ButtonGroup>
    </div>
  );
};
EnvelopeSetting.getSize = function (value, def): number {
  return 32 * value.length + 70 + 100 + 10;
};

var StyledPreview = styled.svg`
  background-color: white;
`;

function EnvelopePreview({ value, width, height }: { value: EnvelopeData; width: number; height: number }) {
  var path = [`M 0,${height} `];
  var prev = value[0];
  for (let i = 0; i < value.length; i++) {
    let current = value[i];
    if (i === 0 || prev.lerp === "linear") {
      path.push(`L ${current.pos * width}, ${height * (1 - current.height)}`);
    }
    if (prev.lerp === EnvelopeEasingType.Horizontal) {
      path.push(`L ${current.pos * width} ${height * (1 - prev.height)}`);
      path.push(`L ${current.pos * width} ${height * (1 - current.height)}`);
    }
    if (prev.lerp === EnvelopeEasingType.Vertical) {
      path.push(`L ${prev.pos * width}, ${height * (1 - current.height)}`);
      path.push(`L ${current.pos * width}, ${height * (1 - current.height)}`);
    }
    if (prev.lerp === EnvelopeEasingType.Easein) {
      path.push(`Q ${(prev.pos + current.pos) * 0.5 * width}, ${height * (1 - prev.height)}, ${current.pos * width}, ${height * (1 - current.height)}`);
    }
    if (prev.lerp === EnvelopeEasingType.Easeout) {
      path.push(`Q ${(prev.pos + current.pos) * 0.5 * width}, ${height * (1 - current.height)}, ${current.pos * width}, ${height * (1 - current.height)}`);
    }
    if (prev.lerp === EnvelopeEasingType.Easeinout) {
      path.push(`C ${(prev.pos + current.pos) * 0.5 * width}, ${height * (1 - prev.height)}, ${(prev.pos + current.pos) * 0.5 * width}, ${height * (1 - current.height)}, ${current.pos * width}, ${height * (1 - current.height)}`);
    }
    prev = value[i];
  }
  path.push(`L ${width},${height} Z`);

  return (
    <StyledPreview width={width} height={height}>
      <path d={path.join("\n")} fill="rgba(0,0,0,0.5)"></path>
    </StyledPreview>
  );
}
