import { SettingComponent, SettingComponents, SettingProps } from "./SettingsComponents";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconAdjustments, IconArrowDown, IconArrowUp, IconTrash, IconTriangle } from "@tabler/icons-react";
import { createColor } from "../../Types/vectorDataType";
import { PaletteMenu } from "./PaletteMenu";
import { Button } from "../Generics/Button";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useListManipulator } from "../../Hooks/useListManipulator";
import { ColorInput } from "../Generics/Inputs/ColorInput";
import { SettingDefinition } from "../../Types/SettingDefinition";
import { SettingControl } from "../Graph/SettingControl";
import { boolean } from "mathjs";

const MainDiv = styled.div<{ selected?: boolean }>`
  background: ${(props) => (props.selected ? `var(--color-selected);` : `none`)};
  padding: var(--padding-tiny);
  height: 100%;
  & .header {
    height: 32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  & .content {
    display: flex;
    gap: var(--padding-small);
    flex-direction: column;
  }
`;

const RotatingIcon = styled(IconTriangle)<{ reversed?: boolean }>`
  transition: transform 0.3s;
  transform: rotate(${(props) => (props.reversed ? 0 : 180)}deg);
`;

export const GroupSetting: SettingComponent = function ({ onChange, value, def, node }: SettingProps) {
  const settings = def.settings as SettingDefinition[];
  var open = value._open;

  const toggle = () => onChange({ ...value, _open: !value._open });
  return (
    <MainDiv selected={open}>
      <div
        className="header"
        onClick={() => toggle()}>
        <span>{def.id || def.label}</span> <RotatingIcon reversed={open}></RotatingIcon>{" "}
      </div>
      {value._open && (
        <div className="content">
          {settings.map((subSetting, i) => {
            const subSettingValue = value[subSetting.id] !== undefined ? value[subSetting.id] : subSetting.defaultValue;
            const changeMethod = (v: any) => onChange({ ...value, [subSetting.id]: v });
            var n = (
              <SettingControl
                y={0}
                value={subSettingValue}
                onChange={changeMethod}
                def={subSetting}
                key={i}
                nodeData={node}
                useHTML
              />
            );

            return n;
          })}
        </div>
      )}
    </MainDiv>
  );
};
GroupSetting.getSize = function (value, setting): number {
  if (value._open) {
    return 32 + (setting.settings as SettingDefinition[]).reduce((prev, def) => prev + SettingComponents[def.type].getSize(value[def.id], def) + 4, 0);
  }
  return 32;
};
