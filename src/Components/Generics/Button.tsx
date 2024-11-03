import { Icon } from "@tabler/icons-react";
import { forwardRef } from "react";
import styled, { css } from "styled-components";

export const ButtonStyled = styled.button<{ invisible?: boolean; selected?: boolean; iconOnly?: boolean }>`
  background: var(--color-background-button);
  border: var(--border-size) solid var(--color-border);

  transition: background 0.3s;
  cursor: pointer;
  color: var(--color-text);
  padding: var(--padding-medium);
  border-radius: var(--border-radius-large);
  box-shadow: var(--card-shadow);

  ${(props) =>
    !props.iconOnly
      ? css`
          padding-left: calc(var(--padding-medium) * 3);
          padding-right: calc(var(--padding-medium) * 3);
        `
      : ""}

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
  onClick?: () => void;
  tooltip?: string;
  disabled?: boolean;
  icon?: Icon;
  label?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(({ label, icon: Icon, onClick, tooltip, disabled, ...other }: ButtonProps, ref) => {
  return (
    <ButtonStyled ref={ref as any} onClick={onClick} disabled={disabled} data-tooltip-id="tooltip" data-tooltip-content={tooltip} iconOnly={label === undefined && Icon != null} data-icon={label === undefined && Icon != null} {...other}>
      {Icon !== undefined && <Icon></Icon>}
      {label}
    </ButtonStyled>
  );
});

export const InvisibleButton = forwardRef(({ label, icon: Icon, onClick, tooltip, disabled, ...other }: ButtonProps, ref) => {
  return (
    <InvisibleButtonStyled ref={ref as any} onClick={onClick} disabled={disabled} data-tooltip-id="tooltip" data-tooltip-content={tooltip} iconOnly={label === undefined && Icon != null} {...other}>
      {Icon !== undefined && <Icon></Icon>}
      {label}
    </InvisibleButtonStyled>
  );
});

export const ToolbarButton = forwardRef(({ label, icon: Icon, onClick, tooltip, disabled, selected, ...other }: ButtonProps & { selected?: boolean }, ref) => {
  return (
    <ToolbarButtonStyled ref={ref as any} selected={selected} onClick={onClick} disabled={disabled} data-tooltip-id="tooltip" data-tooltip-content={tooltip} iconOnly={label === undefined && Icon != null} {...other}>
      {Icon !== undefined && <Icon></Icon>}
      {label}
    </ToolbarButtonStyled>
  );
});
