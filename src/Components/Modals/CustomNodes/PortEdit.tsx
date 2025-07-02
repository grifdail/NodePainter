import { IconTriangle, IconX } from "@tabler/icons-react";
import { PortDefinition } from "../../../Types/PortDefinition";
import { PortTypeDefinitions } from "../../../Types/PortTypeDefinitions";
import { capitalCase } from "change-case";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { InvisibleButton } from "../../Generics/Button";
import styled from "styled-components";
import { convertTypeValue } from "../../../Utils/graph/execution/convertTypeValue";
import { TextInput } from "../../Generics/Inputs/TextInput";
import { PortType } from "../../../Types/PortType";
import { PortTypeDropdown } from "./PortTypeDropdown";
import { Constraints } from "../../../Utils/ui/applyConstraints";
import { cp } from "fs";

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
  onChangePort?: (index: number, newValue: PortDefinition) => void;
  onDeletePort?: (index: number) => void;
  availableTypes: Array<PortType>;
  onOpen?: () => void;
  open?: boolean;
};

export function PortEdit({ port, onChangePort, onDeletePort, index, availableTypes, open = true, onOpen }: InputPortEditProps) {
  const portColor = PortTypeDefinitions[port.type];
  const PortValueEditor = portColor.inlineInput;
  const Icon = portColor.icon;
  const canDelete = onDeletePort !== undefined;
  const canEdit = onChangePort !== undefined;

  const setPortId = (value: string) => {
    if (onChangePort) {
      onChangePort(index, { ...port, id: value });
    }
  };

  const setPortType = (value: string) => {
    if (onChangePort) {
      var newNode = { ...port, type: value as PortType, defaultValue: PortTypeDefinitions[value as PortType].createDefaultValue() };
      onChangePort(index, newNode);
    }
  };
  const setPortDefaultValue = (value: any) => {
    if (onChangePort) {
      onChangePort(index, { ...port, defaultValue: value });
    }
  };

  return (
    <InputPortDiv
      className={port.type}
      selected={open}>
      <Header onClick={onOpen}>
        <Icon></Icon>
        {port.id}
        <span></span>
        <RotatingIcon
          reversed={open}
          size={18}
        />
      </Header>
      {open && (
        <FieldsDiv>
          <Fieldset
            label="Id"
            input={TextInput}
            onChange={setPortId}
            value={port.id}
            disabled={!canEdit}
            constrains={[Constraints.NoSpecialChar(), Constraints.NonDigitStart()]}
          />
          <PortTypeDropdown
            onChange={setPortType}
            value={port.type}
            availableTypes={availableTypes}
            disabled={!canEdit}
          />
          {PortValueEditor && (
            <Fieldset
              label="Default value"
              input={PortValueEditor}
              onChange={setPortDefaultValue}
              value={port.defaultValue}
              disabled={!canEdit}
            />
          )}

          {canDelete && (
            <ButtonGroup>
              <InvisibleButton
                icon={IconX}
                label="Delete"
                onClick={() => onDeletePort(index)}></InvisibleButton>
            </ButtonGroup>
          )}
        </FieldsDiv>
      )}
    </InputPortDiv>
  );
}
