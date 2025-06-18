import { useEffect, useState } from "react";
import { Input, InputBackgroundColor } from "../../StyledComponents/Input";
import { applyConstraint, ConstrainDeclaration } from "../../../Utils/graph/applyConstraints";
import styled from "styled-components";

const StyledTextare = styled.textarea`
  resize: none;
  background: ${InputBackgroundColor};
  border: none;

  border-radius: var(--padding-small);

  transition: background-color 0.3s;
  text-align: left;

  font-size: var(--size-text);

  padding: var(--padding-small);
  padding-right: 10px;

  &:focus,
  &:hover {
    outline: none;
    background: var(--color-selected);
  }
`;

export function TextAreaInput({ onChange, value, disabled = false, constrains }: { onChange: (value: string) => void; value: string; disabled?: boolean; constrains?: ConstrainDeclaration[] }) {
  var [rawField, setRawField] = useState(value);

  useEffect(() => {
    setRawField(value && value.toString());
  }, [value]);

  const onBlur = (newValue: string) => {
    if (constrains) {
      onChange(applyConstraint(rawField, constrains));
    } else {
      onChange(rawField);
    }
  };

  return (
    <StyledTextare
      disabled={disabled}
      value={rawField}
      onChange={(e) => setRawField(e.target.value)}
      onBlur={(e) => onBlur(e.target.value)}
    />
  );
}
