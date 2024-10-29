import { useState, useEffect, useCallback } from "react";

export const useSubmitOnBlur = function <T>(value: T, toString: (value: T) => string, onChange: (value: T) => void, validate: (value: string) => undefined | T) {
  const stringified = toString(value);
  var [rawField, setRawField] = useState(stringified);

  useEffect(() => {
    setRawField(stringified);
  }, [stringified]);

  const onBlur = useCallback(
    (newValue: string) => {
      var parsedValue = validate(newValue);
      if (parsedValue === undefined) {
        setRawField(stringified);
      } else {
        onChange(parsedValue);
        setRawField(toString(parsedValue));
      }
    },
    [stringified, onChange, validate, setRawField, toString]
  );
  return { onBlur, rawField, setRawField };
};
