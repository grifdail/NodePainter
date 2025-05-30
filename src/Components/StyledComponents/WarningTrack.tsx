import styled from "styled-components";

export const WarningTrack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 20px solid black;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border-color: var(--color-property, light-dark(#5c5c5c, #a8a8a8));
  pointer-events: none;

  & div {
    display: none;
  }
`;

export const WarningTrackSelection = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 5px dashed black;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border-color: light-dark(#5c5c5c, #a8a8a8);
  pointer-events: none;

  & div {
    display: none;
  }
`;
