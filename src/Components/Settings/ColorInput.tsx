import { fromHex, invertColor, toHex, validateHex } from "../../Utils/colorUtils";
import Sketch from "@uiw/react-color-sketch";

import { Menu } from "@szhsin/react-menu";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { ReactNode, useMemo } from "react";
import { InputProps } from "./InputProps";
import { Color } from "../../Types/vectorDataType";

import styled from "styled-components";
import { Input } from "../StyledComponents/Input";
import { useSubmitOnBlur } from "../../Hooks/useSubmitOnBlur";

export const ColorButton = styled.button<{ color: string }>`
  background: ${(props) => props.color};
  width: 100px;
  flex-shrink: 0;
  flex-basis: 24;
  display: inline-block;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  cursor: pointer;
  border: none;
`;

export const ColorInputDiv = styled.div<{ color: string; opposite: string }>`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-grow: 1;

  border-bottom: 2px solid var(--color-border-input);
  padding-right: var(--padding-small);

  transition: background-color 0.3s;

  & > input {
    border: none;
    transition: color 0.3s;
    width: 10px;

    &:focus,
    &:hover {
      background: none;
    }
  }

  &:focus-within,
  &:hover {
    background: var(--color-selected);
  }
  &:has(button:hover) {
    background: ${(props) => props.color};

    & input {
      color: ${(props) => props.opposite};
    }
  }
`;

function ColorPicker({ disabled, value, onChange }: { disabled?: boolean; value: Color; toHexFull: (c: Color) => string; onChange: (c: Color) => void }) {
  const palette = usePlayerPref((state) => state.colorPreset);
  var paletteHex = useMemo(() => palette.map((item) => toHex(item)), [palette]);

  return (
    <Menu portal aria-disabled={disabled} menuButton={<ColorButton color={toHex(value, true)} />}>
      <Sketch
        color={toHex(value, true)}
        presetColors={paletteHex}
        onChange={(color) => {
          onChange(fromHex(color.hexa));
        }}
      />
    </Menu>
  );
}

export function ColorInput({ onChange, value, disabled }: InputProps<Color> & { children?: ReactNode; disabled?: boolean }) {
  var toHexFull = (a: Color) => toHex(a, true);
  var hex = toHexFull(value);

  var { rawField, setRawField, onBlur } = useSubmitOnBlur(value || 0, toHexFull, onChange, (newValue: string): undefined | Color => {
    if (validateHex(newValue)) {
      return fromHex(newValue);
    } else {
      return undefined;
    }
  });

  return (
    <ColorInputDiv color={hex} opposite={invertColor(hex, true)}>
      <Input value={rawField} onBlur={(e) => onBlur(e.target.value)} onChange={(e) => setRawField(e.target.value)} disabled={disabled} />
      <ColorPicker onChange={onChange} value={value} disabled={disabled} toHexFull={toHexFull}></ColorPicker>
    </ColorInputDiv>
  );
}
