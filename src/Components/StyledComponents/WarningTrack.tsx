import styled from "styled-components";

export const WarningTrack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 20px solid black;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border-color: var(--color-property);
  pointer-events: none;

  & div {
    display: none;
  }
`;
