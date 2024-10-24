import styled from "styled-components";

export const ButtonGroup = styled.div<{ vertical?: boolean; compact?: boolean; nested?: boolean }>`
  display: flex;
  justify-content: stretch;
  gap: ${(state) => (state.compact ? "10px" : "50px")};
  padding: ${(state) => (state.nested ? "10px" : 0)};
  flex-direction: ${(state) => (state.vertical ? "column" : "row")};
  align-items: center;

  & button {
    flex: 1 1 100px;
    height: 50px;
    background: light-dark(var(--color-background-button-light), var(--color-background-button-dark));
    border: 2px solid light-dark(var(--color-border-light), var(--color-border-dark));
    border-radius: 5px;
    transition: background 0.3s;
    cursor: pointer;
    color: light-dark(var(--color-text-light), var(--color-text-dark));

    &:hover {
      background: rgba(0, 0, 0, 0.2);
      &:disabled {
        background: rgba(0, 0, 0, 0);
      }
    }
    &:disabled {
      cursor: default;
      background: rgba(0, 0, 0, 0.1);
      border: 2px solid #888888;
      color: #888888;
    }
    &.icon {
      flex: 0 2 50px;
      width: 50px;
    }
  }
`;
