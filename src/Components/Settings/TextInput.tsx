import { useEffect, useState } from "react";

export function TextInput({ onChange, value, disabled = false }: { onChange: (value: string) => void; value: string; disabled?: boolean }) {
  var [rawField, setRawField] = useState(value);

  useEffect(() => {
    setRawField(value.toString());
  }, [value]);

  const onBlur = (newValue: string) => {
    onChange(rawField);
  };

  return <input disabled={disabled} value={rawField} onChange={(e) => setRawField(e.target.value)} onBlur={(e) => onBlur(e.target.value)}></input>;
}
