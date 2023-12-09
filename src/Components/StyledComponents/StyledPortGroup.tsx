import styled from "styled-components";

export const StyledPortGroup = styled.g`
  & circle {
    stroke: var(--color-property);
    fill: white;
    stroke-width: 2px;
  }

  & svg {
    stroke: var(--color-property);
  }

  & text {
    font-size: 15px;
    dominant-baseline: central;
  }
`;
