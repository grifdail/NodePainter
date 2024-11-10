import { SettingComponent, SettingProps } from "./SettingsComponents";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconCode } from "@tabler/icons-react";
import { Button } from "../Generics/Button";
import { useCodeBlockModal } from "../../Hooks/useCodeBlockModal";

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-direction: column;
  padding: 0;
  margin: 0;
  & > div.file,
  & img {
    flex-grow: 1;
    display: block flex;
    object-fit: contain;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    max-height: 180px;
    background: var(--gradient-transparent);
  }
  & svg {
    height: 50%;
    width: 50%;
  }
`;

export const CodeBlockSetting: SettingComponent = function ({ onChange, value, def }: SettingProps) {
  return (
    <Body>
      <ButtonGroup hidden={value !== null}>
        <Button
          onClick={() => useCodeBlockModal.getState().open(value, onChange)}
          label="Edit"
          icon={IconCode}
        />
      </ButtonGroup>
    </Body>
  );
};
CodeBlockSetting.getSize = function (value, def): number {
  return 60;
};
