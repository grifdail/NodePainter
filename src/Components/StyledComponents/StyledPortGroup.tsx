import styled, { keyframes } from "styled-components";

const scaleLoop = keyframes`
    from {
      transform: scale(1);
    }

    to {
      transform: scale(1.2);
    }
  
`;

export const StyledPortGroup = styled.g`
  & circle {
    stroke: var(--color-property);
    fill: var(--color-background);
    stroke-width: 2px;
    cursor: pointer;
  }

  &[class^="array-"] circle,
  &[class*=" array-"] circle {
    stroke-dasharray: 4 1;
  }

  & svg {
    color: var(--color-property);
  }

  & text {
    font-size: 15px;
    dominant-baseline: central;
    fill: currentColor;
  }

  & circle {
    transform: scale(1);
    transition: transform 0.2s;
    transform-origin: 0 15px;
  }
  &.selected circle {
    //transform: scale(1.2);
    animation: ${scaleLoop} 0.5s ease-in-out infinite alternate;
  }
`;
