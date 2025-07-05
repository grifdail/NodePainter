import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import { Fieldset } from "../StyledComponents/Fieldset";
import { TextInput } from "../Generics/Inputs/TextInput";
import { StringSettingDefinition, TextAreaSettingDefinition } from "../../Types/SettingDefinition";
import { TextAreaInput } from "../Generics/Inputs/TextAreaInput";
import styled from "styled-components";
import { IconAlertHexagon } from "@tabler/icons-react";
import { useMemo } from "react";

const ErrorDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: var(--padding-small);
  border-radius: var(--border-radius-small);
  background: var(--color-background-card);
`;

export const TextAreaSetting: SettingComponent<TextAreaSettingDefinition> = function ({ onChange, value, def, node }: SettingProps<TextAreaSettingDefinition>) {
  const error = useMemo(() => (def.validation && def.validation(value, node)) || null, [value, node, def]);
  return (
    <>
      <Fieldset
        label={def.id}
        input={TextAreaInput}
        value={value}
        onChange={onChange}
        passtrough={{ constrains: def.constrains }}></Fieldset>
      {error && (
        <ErrorDiv
          data-tooltip-id="tooltip"
          data-tooltip-content={error}>
          <IconAlertHexagon></IconAlertHexagon> Error
        </ErrorDiv>
      )}
    </>
  );
};
TextAreaSetting.getSize = function (value, def, node): number {
  const error = (def.validation && node && def.validation(value, node)) || null;
  return 134;
};
