import { IconX } from "@tabler/icons-react";
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

const InputPortDiv = styled.div`
  display: flex;
  gap: var(--padding-small);
  flex-direction: column;
`;

type InputPortEditProps = {
  port: PortDefinition;
  index: number;
  role: PortRole;
  availableTypes: Array<PortType>;
} & Pick<CustomFunctionCreationContextStore, "setPortType" | "setPortId" | "deletePort" | "setPortDefaultValue">;

export function InputPortEdit({ port, setPortId, deletePort, setPortDefaultValue, setPortType, index, role, availableTypes }: InputPortEditProps) {
  const portColor = PortColor[port.type];
  const PortValueEditor = portColor.input;

  const types = availableTypes.map((a) => capitalCase(a));

  return (
    <InputPortDiv>
      <Fieldset label="Id" input={TextInput} onChange={(a) => setPortId(role, index, a)} value={port.id} />
      <Fieldset label="Type" input={TextInput} onChange={(a) => setPortId(role, index, a)} value={port.type} />
      {PortValueEditor && <Fieldset label="Default value" input={TextInput} onChange={(a) => setPortDefaultValue(role, index, a)} value={port.defaultValue} />}

      <ButtonGroup>
        <InvisibleButton onClick={() => deletePort(role, index)}>
          <IconX />
          Delete
        </InvisibleButton>
      </ButtonGroup>
    </InputPortDiv>
  );
}
