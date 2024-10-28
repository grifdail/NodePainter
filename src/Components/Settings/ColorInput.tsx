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
`;

export const ColorInputDiv = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;

  border-bottom: 2px solid var(--color-border);

  & > input {
    border: none;
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

  var { rawField, setRawField, onBlur } = useSubmitOnBlur(value || 0, toHexFull, onChange, (newValue: string): undefined | Color => {
    if (validateHex(newValue)) {
      return fromHex(newValue);
    } else {
      return undefined;
    }
  });

  return (
    <ColorInputDiv>
      <Input value={rawField} onBlur={(e) => onBlur(e.target.value)} onChange={(e) => setRawField(e.target.value)} disabled={disabled} />
      <ColorPicker onChange={onChange} value={value} disabled={disabled} toHexFull={toHexFull}></ColorPicker>
    </ColorInputDiv>
  );
}
