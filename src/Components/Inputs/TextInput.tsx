import { useEffect, useState } from "react";
import { Input } from "../StyledComponents/Input";

export function TextInput({ onChange, value, disabled = false }: { onChange: (value: string) => void; value: string; disabled?: boolean }) {
  var [rawField, setRawField] = useState(value);

  useEffect(() => {
    setRawField(value && value.toString());
  }, [value]);

  const onBlur = (newValue: string) => {
    onChange(rawField);
  };

  return <Input disabled={disabled} value={rawField} onChange={(e) => setRawField(e.target.value)} onBlur={(e) => onBlur(e.target.value)} />;
}
