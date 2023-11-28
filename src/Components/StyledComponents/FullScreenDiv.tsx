import styled from "styled-components";

export const FullScreenDiv = styled.div<{ modal?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.modal ? "rgba(0,0,0,0.2)" : "none")};
`;
