import { IconInfoCircle, IconPlus } from "@tabler/icons-react";
import { PortDefinition } from "../../../Types/PortDefinition";
import { PortType } from "../../../Types/PortType";
import { InvisibleButton } from "../../Generics/Button";
import { PortEdit } from "./PortEdit";
import styled from "styled-components";
import { useCallback, useState } from "react";
import { createDefaultValue } from "../../../Utils/createDefaultValue";
import { useListManipulator } from "../../../Hooks/useListManipulator";

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

type PortEditListProps = {
  ports: PortDefinition[];
  label: string;
  tooltip?: string;
  prefix?: string;
  availableTypes: PortType[];
  onChange?: (newList: PortDefinition[]) => void;
};

export const PortEditList = ({ ports, label, prefix, tooltip, onChange, availableTypes }: PortEditListProps) => {
  var [selected, setSelected] = useState<number | null>(null);
  const readOnly = onChange === undefined;

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

  const { change, remove, addNew } = useListManipulator(ports, onChange as any, () => ({
    id: `${prefix}-${ports.length}`,
    type: availableTypes[0],
    defaultValue: createDefaultValue(availableTypes[0]),
  }));

  return (
    <SectionStyled>
      <HeaderStyled>
        <h3>{label}</h3>
        {tooltip && (
          <IconInfoCircle
            data-tooltip-id="tooltip"
            data-tooltip-content={tooltip}></IconInfoCircle>
        )}
        <span></span>
        {!readOnly && (
          <InvisibleButton
            icon={IconPlus}
            onClick={addNew}></InvisibleButton>
        )}
      </HeaderStyled>
      {ports.map((port, i) => (
        <PortEdit
          open={selected === i}
          onOpen={() => toggle(i)}
          key={i}
          port={port}
          index={i}
          availableTypes={availableTypes}
          onChangePort={readOnly ? undefined : change}
          onDeletePort={readOnly ? undefined : remove}
        />
      ))}
    </SectionStyled>
  );
};
