import { useEffect, useState } from "react";
import { Input } from "../../StyledComponents/Input";
import { applyConstraint, ConstrainDeclaration } from "../../../Utils/graph/applyConstraints";

export function TextInput({ onChange, value, disabled = false, constrains }: { onChange: (value: string) => void; value: string; disabled?: boolean; constrains?: ConstrainDeclaration[] }) {
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
    <Input
      disabled={disabled}
      value={rawField}
      onChange={(e) => setRawField(e.target.value)}
      onBlur={(e) => onBlur(e.target.value)}
    />
  );
}
