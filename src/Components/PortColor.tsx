import { Icon, IconArrowUpRightCircle, IconNumbers, IconPalette, IconPlayerPlayFilled, IconQuote, IconToggleLeft } from "@tabler/icons-react";
import { useState } from "react";
import * as p5 from "p5";
import { fromHex, invertColor, toHex } from "../Nodes/Color";
import Colorful from "@uiw/react-color-colorful";
import { Menu } from "@szhsin/react-menu";
import styled from "styled-components";

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

const ColorButton = styled.button<{ color: string; opositeColor: string }>`
  border: 2px solid black;
  background: ${(props) => props.color};
  color: ${(props) => props.opositeColor};
  width: 100px;
  flex-shrink: 0;
  flex-basis: 100px;
  display: block;
  border-radius: 5px;
`;

function ColorInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  var hex = toHex(value, true);
  return (
    <Menu
      portal
      menuButton={
        <ColorButton color={hex} opositeColor={invertColor(hex, true)}>
          {hex}
        </ColorButton>
      }
    >
      <Colorful
        color={hex}
        onChange={(color) => {
          onChange(fromHex(color.hexa));
        }}
      />
    </Menu>
  );
}

function VectorInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  const onInputChange = (newValue: number, property: "x" | "y") => {
    var newVector = property === "x" ? p5.prototype.createVector(newValue, value.y) : p5.prototype.createVector(value.x, newValue);
    onChange(newVector);
  };
  return (
    <div>
      <NumberInput value={value.x} onChange={(e) => onInputChange(e, "x")}></NumberInput>
      <NumberInput value={value.y} onChange={(e) => onInputChange(e, "y")}></NumberInput>;
    </div>
  );
}

function BoolInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  return (
    <div>
      <input type="checkbox" value={value} onChange={(e) => onChange(!!e.target.value)} />
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
  boolean: {
    color: "#17a2b8",
    icon: IconToggleLeft,
    input: BoolInput,
  },
};
