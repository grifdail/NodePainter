import { useId } from "react";
import styled from "styled-components";
import { InputProps } from "../Settings/InputProps";

export const FieldsetStyled = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  color: var(--color-text);
`;

export const FieldsetLabel = styled.label`
  display: block;
  padding-bottom: var(--padding-small);
`;

type FieldsetProps = {
  label: string;
  input: React.FC<InputProps<any>>;
  tooltip?: string;
} & InputProps<any>;

export const Fieldset = ({ label, input: Input, onChange, value, tooltip }: FieldsetProps) => {
  var id = useId();
  return (
    <FieldsetStyled data-tooltip-id="tooltip" data-tooltip-content={tooltip}>
      <FieldsetLabel htmlFor={id}>{label}</FieldsetLabel>
      <Input name={id} onChange={onChange} value={value} />
    </FieldsetStyled>
  );
};
