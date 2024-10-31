import { Menu, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import styled from "styled-components";
import { InputProps } from "./InputProps";
import { IconTriangleFilled, IconTriangleInverted } from "@tabler/icons-react";
import { ReactNode } from "react";
import { InputBackgroundColor } from "../StyledComponents/Input";

const StyledDiv = styled.div``;

const StyledButton = styled.button`
  flex: 1 1 content;
  display: flex;
  justify-content: end;
  gap: var(--padding-small);
  border: none;
  background: transparent;
  border: none;
  background: ${InputBackgroundColor};
  border-radius: 24px;

  transition: background-color 0.3s;
  padding: var(--padding-small);
  align-items: center;

  &:focus,
  &:hover {
    outline: none;
    background: var(--color-selected);
  }
`;

export const DropdownInput = function DropdownInput({ onChange, value, options, template }: InputProps<any> & { options?: string[]; template?: (value: string) => ReactNode }) {
  return (
    <Menu
      portal
      overflow="auto"
      menuButton={
        <StyledButton>
          {value}
          <IconTriangleInverted size={14} />
        </StyledButton>
      }>
      {options?.map((option: string) => {
        return (
          <MenuItem value={option} key={option} onClick={() => onChange(option)}>
            {template ? template(option) : option}
          </MenuItem>
        );
      })}
    </Menu>
  );
};
