import { JSXElement } from "@babel/types";
import { Icon, IconArrowUpRightCircle, IconNumbers, IconPalette, IconPlayerPlayFilled, IconQuote } from "@tabler/icons-react";
import { useState } from "react";
import * as p5 from "p5";

type InputComponent = ({ onChange, value }: { onChange: (value: any) => void; value: any }) => any;

type PortColorDefinition = {
  color: string;
  icon: Icon;
  input?: InputComponent;
};

function NumberInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  var [rawField, setRawField] = useState(value);

  const onBlur = (newValue: string) => {
    var parsed = parseFloat(rawField);
    if (!Number.isNaN(parsed)) {
      onChange(parsed);
      setRawField(parsed);
    } else {
      setRawField(value);
    }
  };

  return <input value={rawField} onChange={(e) => setRawField(e.target.value)} onBlur={(e) => onBlur(e.target.value)}></input>;
}

function ColorInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  var [rawField, setRawField] = useState(value);

  const onInputChange = (newValue: string) => {
    setRawField(newValue);

    onChange(newValue);
  };

  return <input type="color" value={rawField} onChange={(e) => onInputChange(e.target.value)}></input>;
}

function VectorInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  const onInputChange = (newValue: number, property: "x" | "y") => {
    var newVector = property === "x" ? p5.prototype.createVector(newValue, value.y) : p5.prototype.createVector(value.x, newValue);
    onChange(newVector);
  };
  console.log(value);
  return (
    <div>
      <NumberInput value={value.x} onChange={(e) => onInputChange(e, "x")}></NumberInput>
      <NumberInput value={value.y} onChange={(e) => onInputChange(e, "y")}></NumberInput>;
    </div>
  );
}

export const PortColor: { [key: string]: PortColorDefinition } = {
  execute: {
    color: "#2fb344",
    icon: IconPlayerPlayFilled,
    input: ({ onChange, value }) => {
      return null;
    },
  },
  number: {
    color: "#4299e1",
    icon: IconNumbers,
    input: NumberInput,
  },
  vector2: {
    color: "#ae3ec9",
    icon: IconArrowUpRightCircle,
    input: VectorInput,
  },
  color: {
    color: "#f76707",
    icon: IconPalette,
    input: ColorInput,
  },
  string: {
    color: "#d6336c",
    icon: IconQuote,
  },
};
