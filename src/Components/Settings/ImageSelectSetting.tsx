import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import { Fieldset } from "../StyledComponents/Fieldset";
import { DropdownInput } from "../Generics/Inputs/DropdownInput";
import { DropdownSettingDefinition, ImageSelectSettingDefinition } from "../../Types/SettingDefinition";
import styled from "styled-components";

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-direction: column;
  padding: 0;
  margin: 0;
  gap: var(--padding-tiny);

  & > div.file,
  & img {
    flex-grow: 1;
    display: block flex;
    object-fit: contain;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    max-height: 180px;
    height: 180px;
    background: var(--gradient-transparent);
  }
`;

export const ImageSelectSetting: SettingComponent<ImageSelectSettingDefinition> = function ImageSelectSetting({ onChange, value, def }: SettingProps<ImageSelectSettingDefinition>) {
  if (value == null) {
    value = def.options[0];
  }
  return (
    <Body>
      <img
        src={value.url}
        alt="loaded"></img>
      <Fieldset
        input={DropdownInput}
        passtrough={{ options: def.options.map((item) => item.label) }}
        value={value.label}
        onChange={(value) => onChange(def.options.find((item) => item.label === value))}
        label={def.id}
      />
    </Body>
  );
};
ImageSelectSetting.getSize = function (value, def): number {
  return 32 + 180 + 5;
};
