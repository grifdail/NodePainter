import styled from "styled-components";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";

export const StatementDiv = styled.div<{ expand?: boolean }>`
  background: var(--color-background);
  flex: 0 0 content;
  padding: var(--padding-small);
  border-radius: var(--border-radius-small);

  & > div.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & > h4 {
      margin: 0;
    }

    & > ${ButtonGroup} {
      padding: 0;
    }
  }

  & > div.parameters {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: var(--padding-small);
  }
`;
