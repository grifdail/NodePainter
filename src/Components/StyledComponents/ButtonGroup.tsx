import styled, { css } from "styled-components";

export const ButtonGroup = styled.div<{ vertical?: boolean; nested?: boolean; align?: "start" | "end" | "center" | "stretch"; forceStretch?: boolean }>`
  display: flex;
  gap: var(--padding-small);
  flex-direction: ${(state) => (state.vertical ? "column" : "row")};
  align-items: stretch;
  justify-content: ${(state) => state.align || "end"};
  padding-top: var(--padding-small);
  padding-bottom: var(--padding-small);

  ${(props) =>
    props.align === "stretch"
      ? css`
          & > button:not([data-icon="true"]) {
            flex: 1 1 ${props.forceStretch ? "0" : "auto"};
          }
        `
      : ""}
`;
