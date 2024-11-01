import { IconInfoCircle, IconPlus } from "@tabler/icons-react";
import { CustomFunctionCreationContextStore } from "../../../Types/CustomFunctionCreationContextStore";
import { PortDefinition } from "../../../Types/PortDefinition";
import { PortRole } from "../../../Types/PortRole";
import { PortType } from "../../../Types/PortType";
import { InvisibleButton } from "../../Generics/Button";
import { InputPortEdit } from "./InputPortEdit";
import styled from "styled-components";
import { useCallback, useState } from "react";

const SectionStyled = styled.section``;

const HeaderStyled = styled.header`
  display: flex;
  justify-content: stretch;
  align-items: center;
  gap: var(--padding-small);

  & span {
    flex-grow: 1;
  }
  & h3 {
    margin: 0;
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
  var [selected, setSelected] = useState<number | null>(null);

  var toggle = useCallback(
    (id: number) => {
      if (selected === id) {
        setSelected(null);
      } else {
        setSelected(id);
      }
    },
    [selected]
  );

  return (
    <SectionStyled>
      <HeaderStyled>
        <h3>{label}</h3>
        {tooltip && <IconInfoCircle data-tooltip-id="tooltip" data-tooltip-content={tooltip}></IconInfoCircle>}
        <span></span>
        <InvisibleButton icon={IconPlus} onClick={addPort}></InvisibleButton>
      </HeaderStyled>
      {ports.map((port, i) => (
        <InputPortEdit open={selected === i} onOpen={() => toggle(i)} key={i} port={port} index={i} role={role} availableTypes={availableTypes} setPortDefaultValue={context.setPortDefaultValue} setPortId={context.setPortId} setPortType={context.setPortType} deletePort={context.deletePort} />
      ))}
    </SectionStyled>
  );
};
