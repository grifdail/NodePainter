import { Menu, MenuItem } from "@szhsin/react-menu";
import styled from "styled-components";
import { InputProps } from "./InputProps";
import { IconTriangleInverted } from "@tabler/icons-react";
import { ReactNode } from "react";
import { InputBackgroundColor } from "../StyledComponents/Input";

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

export const DropdownInput = function DropdownInput({ onChange, value, options, template, templateRaw, useTemplateForField }: InputProps<any> & { options?: string[]; templateRaw?: (value: string, args?: any) => ReactNode; template?: (value: string, args?: any) => ReactNode; useTemplateForField?: boolean }) {
  return (
    <Menu
      portal
      overflow="auto"
      menuButton={
        <StyledButton>
          {useTemplateForField && template ? template(value) : value}
          <IconTriangleInverted size={14} />
        </StyledButton>
      }>
      {options?.map((option: string) => {
        var args = { key: option, onClick: () => onChange(option), value: option };

        if (templateRaw) {
          return templateRaw(option, args);
        } else {
          return (
            <MenuItem
              key={args.key}
              onClick={args.onClick}
              value={args.value}>
              {template ? template(option, args) : option}
            </MenuItem>
          );
        }
      })}
    </Menu>
  );
};
