import { IconTriangle, IconTriangleInverted, IconX } from "@tabler/icons-react";
import { PortRole } from "../../../Types/PortRole";
import { PortDefinition } from "../../../Types/PortDefinition";
import { PortType } from "../../../Types/PortType";
import { Menu, MenuButton, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { PortColor } from "../../StyledComponents/PortColor";
import { CustomFunctionCreationContextStore } from "../../../Types/CustomFunctionCreationContextStore";
import { capitalCase } from "change-case";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { TextInput } from "../../Settings/TextInput";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { Button, InvisibleButton } from "../../Generics/Button";
import styled from "styled-components";
import { DropdownInput } from "../../Settings/DropdownInput";
import { boolean } from "mathjs";

const InputPortDiv = styled.div<{ selected?: boolean }>`
  display: flex;
  gap: var(--padding-small);
  flex-direction: column;
  padding-top: var(--padding-small);
  padding-bottom: var(--padding-small);
  border-bottom: 2px solid var(--color-property);

  ${(props) => (props.selected ? "&, " : "")}&:hover {
    background: var(--color-selected);
  }
`;

const FieldsDiv = styled.div`
  display: flex;
  gap: var(--padding-small);
  flex-direction: column;

  padding: var(--padding-small);
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: var(--padding-small);
  align-items: center;
  cursor: pointer;

  svg:first-child {
    color: var(--color-property);
  }
`;

const RotatingIcon = styled(IconTriangle)<{ reversed?: boolean }>`
  transition: transform 0.3s;
  transform: rotate(${(props) => (props.reversed ? 0 : 180)}deg);
`;

type InputPortEditProps = {
  port: PortDefinition;
  index: number;
  role: PortRole;
  availableTypes: Array<PortType>;
  onOpen?: () => void;
  open?: boolean;
} & Pick<CustomFunctionCreationContextStore, "setPortType" | "setPortId" | "deletePort" | "setPortDefaultValue">;

export function InputPortEdit({ port, setPortId, deletePort, setPortDefaultValue, setPortType, index, role, availableTypes, open, onOpen }: InputPortEditProps) {
  const portColor = PortColor[port.type];
  const PortValueEditor = portColor.input;
  const Icon = portColor.icon;

  const typeTemplate = (option: string) => {
    const portColor = PortColor[option as PortType];
    const Icon = portColor.icon;
    return (
      <>
        <Icon />
        {capitalCase(option)}
      </>
    );
  };

  return (
    <InputPortDiv className={port.type} selected={open}>
      <Header onClick={onOpen}>
        <Icon></Icon>
        {port.id}
        <span></span>
        <RotatingIcon reversed={open} size={18} />
      </Header>
      {open && (
        <FieldsDiv>
          <Fieldset label="Id" input={TextInput} onChange={(a) => setPortId(role, index, a)} value={port.id} />
          <Fieldset label="Type" input={DropdownInput} onChange={(a) => setPortType(role, index, a)} value={port.type} passtrough={{ options: availableTypes, template: typeTemplate }} />
          {PortValueEditor && <Fieldset label="Default value" input={PortValueEditor} onChange={(a) => setPortDefaultValue(role, index, a)} value={port.defaultValue} />}

          <ButtonGroup>
            <InvisibleButton onClick={() => deletePort(role, index)}>
              <IconX />
              Delete
            </InvisibleButton>
          </ButtonGroup>
        </FieldsDiv>
      )}
    </InputPortDiv>
  );
}
