import { SettingComponents } from "./SettingsComponents";
import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import styled from "styled-components";
import { IconTriangle } from "@tabler/icons-react";
import { GroupSettingDefinition } from "../../Types/SettingDefinition";
import { SettingControl } from "../Graph/SettingControl";

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

export const GroupSetting: SettingComponent<GroupSettingDefinition> = function ({ onChange, value, def, node }: SettingProps<GroupSettingDefinition>) {
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
          {def.settings.map((subSetting, i) => {
            const subSettingValue = value[subSetting.id] !== undefined ? value[subSetting.id] : "defaultValue" in subSetting ? subSetting.defaultValue : undefined;
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
    return 32 + setting.settings.reduce((prev, def) => prev + SettingComponents[def.type].getSize(value[def.id], def as any) + 4, 0);
  }
  return 32;
};
