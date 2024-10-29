import { IconInfoCircle } from "@tabler/icons-react";
import { CustomFunctionCreationContextStore } from "../../../Types/CustomFunctionCreationContextStore";
import { PortDefinition } from "../../../Types/PortDefinition";
import { PortRole } from "../../../Types/PortRole";
import { PortType } from "../../../Types/PortType";
import { Button } from "../../Generics/Button";
import { InputPortEdit } from "./InputPortEdit";
import styled from "styled-components";

const SectionStyled = styled.section``;

const HeaderStyled = styled.header`
  display: flex;
  justify-content: stretch;
  align-items: center;
  gap: var(--padding-small);

  & span {
    flex-grow: 1;
  }
`;

type PortDivProps = {
  ports: PortDefinition[];
  label: string;
  tooltip?: string;
  addPort: () => void;
  role: PortRole;
  availableTypes: PortType[];
} & Pick<CustomFunctionCreationContextStore, "setPortDefaultValue" | "setPortType" | "setPortId" | "deletePort">;

export const PortDiv = ({ ports, label, tooltip, addPort, role, availableTypes, ...context }: PortDivProps) => {
  return (
    <SectionStyled>
      <HeaderStyled>
        <h3>{label}</h3>
        {tooltip && <IconInfoCircle data-tooltip-id="tooltip" data-tooltip-content={tooltip}></IconInfoCircle>}
        <span></span>
        <Button onClick={addPort}>Add</Button>
      </HeaderStyled>
      {ports.map((port, i) => (
        <InputPortEdit key={i} port={port} index={i} role="inputData" availableTypes={availableTypes} setPortDefaultValue={context.setPortDefaultValue} setPortId={context.setPortId} setPortType={context.setPortType} deletePort={context.deletePort} />
      ))}
    </SectionStyled>
  );
};
