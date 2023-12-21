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
    //transform: scale(1.2);
    animation: ${scaleLoop} 0.5s ease-in-out infinite alternate;
  }
`;
