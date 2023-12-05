import { useEffect, useState } from "react";

export function TextInput({ onChange, value }: { onChange: (value: string) => void; value: string }) {
  var [rawField, setRawField] = useState(value);

  useEffect(() => {
    setRawField(value.toString());
  }, [value]);

  const onBlur = (newValue: string) => {
    onChange(rawField);
  };

  return <input value={rawField} onChange={(e) => setRawField(e.target.value)} onBlur={(e) => onBlur(e.target.value)}></input>;
}
