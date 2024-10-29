import { useId } from "react";
import styled from "styled-components";
import { InputProps } from "../Settings/InputProps";

const FieldsetStyled = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  color: var(--color-text);

  min-width: 100px;

  display: flex;
  align-items: center;
  align-content: center;
  justify-content: stretch;
  gap: var(--padding-small);

  & > input {
    width: 50px;
  }
`;

const FieldsetLabel = styled.label`
  display: inline;
  padding-bottom: var(--padding-small);
  flex: 0 0 content;
  align-self: center;
  margin: none;
  padding: 0;
`;

type FieldsetProps = {
  label: string;
  input: React.FC<InputProps<any>>;
  tooltip?: string;
  valid?: boolean;
} & InputProps<any>;

export const Fieldset = ({ label, input: Input, onChange, value, tooltip, disabled }: FieldsetProps) => {
  var id = useId();
  return (
    <FieldsetStyled data-tooltip-id="tooltip" data-tooltip-content={tooltip}>
      <FieldsetLabel htmlFor={id}>{label}</FieldsetLabel>
      <Input name={id} onChange={onChange} value={value} disabled={disabled} />
    </FieldsetStyled>
  );
};
