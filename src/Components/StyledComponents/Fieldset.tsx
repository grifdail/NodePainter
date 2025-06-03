import { useId } from "react";
import styled from "styled-components";
import { InputProps } from "../Generics/Inputs/InputProps";

export const FieldsetStyled = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  color: var(--color-text);

  min-width: 100px;

  display: flex;
  align-items: stretch;
  align-content: center;
  justify-content: stretch;
  gap: var(--padding-small);

  & > input {
    width: 50px;
    height: 100%;
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
  className?: string;
  onClickLabel?: () => void;
} & InputProps<any>;

export const Fieldset = ({ label, input: Input, onChange, value, tooltip, disabled, passtrough, className, style, onClickLabel }: FieldsetProps) => {
  var id = useId();
  return (
    <FieldsetStyled
      data-tooltip-id="tooltip"
      data-tooltip-content={tooltip}
      className={className}
      style={style}>
      {label && (
        <FieldsetLabel
          htmlFor={id}
          onClick={onClickLabel}>
          {label}
        </FieldsetLabel>
      )}
      {Input && (
        <Input
          name={id}
          onChange={onChange}
          value={value}
          disabled={disabled}
          {...passtrough}
        />
      )}
    </FieldsetStyled>
  );
};
