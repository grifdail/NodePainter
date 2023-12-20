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

  & circle {
    transform: scale(1);
    transition: transform 0.2s;
    transform-origin: 0 15px;
  }
  &.selected circle {
    transform: scale(1.2);
  }
`;
