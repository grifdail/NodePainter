import { ReactNode } from "react";
import styled, { css } from "styled-components";

export const ButtonStyled = styled.button<{ invisible?: boolean; selected?: boolean }>`
  background: var(--color-background-button);
  border: var(--border-size) solid var(--color-border);

  transition: background 0.3s;
  cursor: pointer;
  color: var(--color-text);
  padding: var(--padding-medium);
  border-radius: var(--border-radius-large);
  box-shadow: var(--card-shadow);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--padding-small);

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    &:disabled {
      background: none;
    }
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
    color: #888888;
  }
`;

export const InvisibleButtonStyled = styled(ButtonStyled)`
  background: none;
  border: none;
  box-shadow: none;
`;

export const ToolbarButtonStyled = styled(InvisibleButtonStyled)`
  ${(props) =>
    props.selected
      ? css`
          background: rgba(0, 0, 0, 0.5);
          border-color: color-mix(in rgba, var(--color-text), transparent 50%);
          box-shadow: inset 0 0 2px light-dark(rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 1));
        `
      : ""}
`;

export type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  tooltip?: string;
  disabled?: boolean;
};

export const Button = ({ children, onClick, tooltip, disabled }: ButtonProps) => {
  return (
    <ButtonStyled onClick={onClick} disabled={disabled} data-tooltip-id="tooltip" data-tooltip-content={tooltip} data-icon={!Array.isArray(children) && typeof children !== "string"}>
      {children}
    </ButtonStyled>
  );
};

export const InvisibleButton = ({ children, onClick, tooltip, disabled }: ButtonProps) => {
  return (
    <InvisibleButtonStyled onClick={onClick} disabled={disabled} data-tooltip-id="tooltip" data-tooltip-content={tooltip}>
      {children}
    </InvisibleButtonStyled>
  );
};

export const ToolbarButton = ({ children, onClick, tooltip, disabled, selected }: ButtonProps & { selected?: boolean }) => {
  return (
    <ToolbarButtonStyled selected={selected} onClick={onClick} disabled={disabled} data-tooltip-id="tooltip" data-tooltip-content={tooltip}>
      {children}
    </ToolbarButtonStyled>
  );
};
