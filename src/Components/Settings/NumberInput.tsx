import { useEffect, useState } from "react";
import { create, all } from "mathjs";
import { useDrag, useHover, useMove } from "@use-gesture/react";
import styled from "styled-components";
import { IconHandGrab } from "@tabler/icons-react";

const math = create(all);
const limitedEvaluate = math.evaluate;

const ua = navigator.userAgent.toLowerCase();
const isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

const StyledFieldSet = styled.fieldset`
  border: none;
  flex: 1 1 50px;
  padding: 0;
  margin: 0;
  display: flex;

  & svg {
    touch-action: none;
    cursor: grab;
  }
`;

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

  const bind = useDrag(
    ({ event, active, delta: [x], movement: [vx] }) => {
      if (active && (event.target as HTMLInputElement) === document.activeElement) {
        onChange(Math.round((value + (x * Math.abs(vx)) / 1000) * 10000) / 10000);
      }
    },
    {
      keyboardDisplacement: 0,
    }
  );

  useEffect(() => {
    setRawField(value.toString());
  }, [value]);

  const onBlur = (newValue: string) => {
    try {
      var parsed = limitedEvaluate(rawField);
      if (rawField !== "" && !Number.isNaN(parsed)) {
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

  return <input {...bind()} value={rawField} onContextMenu={(e) => (isAndroid ? e.preventDefault() : null)} onFocus={(e) => e.target.select()} onChange={(e) => setRawField(e.target.value)} onBlur={(e) => onBlur(e.target.value)}></input>;
}
