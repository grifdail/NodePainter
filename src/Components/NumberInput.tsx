import { useEffect, useState } from "react";
import { create, all } from "mathjs";

const math = create(all);
const limitedEvaluate = math.evaluate;

math.import(
  {
    import: function () {
      throw new Error("Function import is disabled");
    },
    createUnit: function () {
      throw new Error("Function createUnit is disabled");
    },
    evaluate: function () {
      throw new Error("Function evaluate is disabled");
    },
    parse: function () {
      throw new Error("Function parse is disabled");
    },
    simplify: function () {
      throw new Error("Function simplify is disabled");
    },
    derivative: function () {
      throw new Error("Function derivative is disabled");
    },
  },
  { override: true }
);

export function NumberInput({ onChange, value }: { onChange: (value: number) => void; value: number }) {
  var [rawField, setRawField] = useState(value.toString());

  useEffect(() => {
    setRawField(value.toString());
  }, [value]);

  const onBlur = (newValue: string) => {
    try {
      var parsed = limitedEvaluate(rawField);
      if (!Number.isNaN(parsed)) {
        onChange(parsed);
        setRawField(parsed.toString());
      } else {
        setRawField(value.toString());
      }
    } catch (err) {
      console.warn(err);
      setRawField(value.toString());
    }
  };

  return <input value={rawField} onChange={(e) => setRawField(e.target.value)} onBlur={(e) => onBlur(e.target.value)}></input>;
}
